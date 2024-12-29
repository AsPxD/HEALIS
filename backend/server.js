const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyparser = require('body-parser')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const crypto = require('crypto')
const fs = require('fs')
const multer = require('multer')
const otpStorage = new Map()

// Add these to your existing server.js file
const DoctorAppointment = require('./models/DoctorAppointmentSchema'); // Adjust path as needed
  // Add this at the top of your server.js with other requires
  const LabTest = require('./models/LabTestsSchema'); // Adjust path as needed
  // Add this at the top of your server.js with other requires
  // Add this at the top with other requires
const PharmacyOrder = require('./models/PharmacySchema');
const Vaccination = require('./models/VaccinationSchema'); // Adjust path as needed
// Add at the top with other requires
const MentalHealth = require('./models/MentalHealthSchema');

// Add these routes to your server.js file
// Add this with other requires at the top
const HealthCheckup = require('./models/HealthCheckupSchema');

// Book Health Checkup Route
const Reminder = require('./models/ReminderSchema');

// Add these routes to your server.js file
// At the top of server.js, add this require
const Medication = require('./models/MedicationSchema');
// Add at the top with other requires
const NutritionistBooking = require('./models/NutritionistBookingSchema');
const Contact = require('./models/ContactSchema')
const { User, generatePatientId } = require('./models/SchemaRegister');
// Book Nutritionist Appointment Route
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: true }))
// Modify static file serving to point to correct directory
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(cors())

mongoose.connect(`mongodb+srv://dhruvmehta2004:0Tb9LfHuX0jTPQsW@cluster0.bmpyuvt.mongodb.net/HEALIS`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDB successfully connected")
    })
    .catch((error) => {
        console.log("MongoDB is not successfully connected", error)
        process.exit(1)
    })

    app.post('/auth', async (req, res) => {
      try {
          const {
              fullName,
              phoneNumber,
              dateOfBirth,
              gender,
              email,
              password
          } = req.body;
  
          // Check if user already exists
          const existingUser = await User.findOne({
              $or: [{ email }, { phoneNumber }]
          });
  
          if (existingUser) {
              return res.status(400).json({
                  message: 'User with this email or phone number already exists'
              });
          }
  
          // Generate unique patient ID
          const patientId = await generatePatientId();
  
          // Create new user with patient ID
          const newUser = new User({
              patientId,
              fullName,
              phoneNumber,
              dateOfBirth,
              gender,
              email,
              password
          });
  
          // Save user to database
          await newUser.save();
          sendWelcomeEmail(email, fullName);
          
          res.status(201).json({
              message: 'User registered successfully',
              userId: newUser._id,
              patientId: newUser.patientId
          });
  
      } catch (error) {
          console.error('Registration Error:', error);
          res.status(500).json({
              message: 'Server error during registration',
              error: error.message
          });
      }
  });
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // Login successful
        res.status(200).json({
            message: 'Login successful',
            userId: user._id,
            fullName: user.fullName
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            message: 'Server error during login',
            error: error.message
        });
    }
});
// Add this route to server.js

app.get('/auth/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // Find user by patientId instead of _id
    const user = await User.findOne({ patientId }).select('fullName email');

    if (!user) {
      return res.status(404).json({
        message: 'Patient not found'
      });
    }

    // Return user profile information
    res.status(200).json({
      fullName: user.fullName,
      email: user.email
    });

  } catch (error) {
    console.error('Fetch Patient Profile Error:', error);
    res.status(500).json({
      message: 'Server error fetching patient profile',
      error: error.message
    });
  }
});

// Appointment Booking Route
app.post('/appointments/book', async (req, res) => {
  try {
    const { 
      userId, 
      doctorId, 
      doctorName, 
      doctorSpecialty, 
      appointmentDate, 
      appointmentTime 
    } = req.body;

    // Fetch user details to automatically include in the appointment
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Create new appointment
    const newAppointment = new DoctorAppointment({
      patient: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email
      },
      doctor: {
        id: doctorId,
        name: doctorName,
        specialty: doctorSpecialty
      },
      appointmentDate,
      appointmentTime
    });

    // Save appointment
    await newAppointment.save();
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: user.email,
      subject: 'Appointment Confirmed - HEALIS Healthcare',
      html: createAppointmentConfirmationTemplate(newAppointment)
    });
    res.status(201).json({
      message: 'Appointment booked successfully',
      appointmentId: newAppointment._id
    });

  } catch (error) {
    console.error('Appointment Booking Error:', error);
    res.status(500).json({
      message: 'Server error during appointment booking',
      error: error.message
    });
  }
});

// Get User's Appointments Route
app.get('/appointments/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all appointments for the user
    const appointments = await DoctorAppointment.find({ 'patient.userId': userId })
      .sort({ appointmentDate: 1 }); // Sort by date ascending

    res.status(200).json({
      appointments
    });

  } catch (error) {
    console.error('Fetch Appointments Error:', error);
    res.status(500).json({
      message: 'Server error fetching appointments',
      error: error.message
    });
  }
});
// Cancel Appointment Route
app.patch('/appointments/:appointmentId/cancel', async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId;
  
      // Find and update the appointment
      const updatedAppointment = await DoctorAppointment.findByIdAndUpdate(
        appointmentId, 
        { status: 'Cancelled' }, 
        { new: true } // Return the updated document
      );
  
      // Check if appointment exists
      if (!updatedAppointment) {
        return res.status(404).json({
          message: 'Appointment not found'
        });
      }
  
      res.status(200).json({
        message: 'Appointment cancelled successfully',
        appointment: updatedAppointment
      });
  
    } catch (error) {
      console.error('Appointment Cancellation Error:', error);
      res.status(500).json({
        message: 'Server error during appointment cancellation',
        error: error.message
      });
    }
  });

// Add these routes to your server.js file

// Book Lab Tests Route
// Email template function remains the same as before
app.get('api/auth/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by ID
    const user = await User.findById(userId).select('fullName email');

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Return user profile information
    res.status(200).json({
      fullName: user.fullName,
      email: user.email
    });

  } catch (error) {
    console.error('Fetch User Profile Error:', error);
    res.status(500).json({
      message: 'Server error fetching user profile',
      error: error.message
    });
  }
});
// Lab Tests Booking Route with Email Confirmation
app.post('/lab-tests/book', async (req, res) => {
  try {
    const { 
      userId,
      tests, 
      date, 
      time,
      totalAmount
    } = req.body;

    // Fetch user details including patientId
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Create new lab test booking with both userId and patientId
    const newLabTest = new LabTest({
      userId: userId,  // Add userId
      patient: {
        patientId: user.patientId,
        fullName: user.fullName,
        email: user.email
      },
      tests,
      bookingDate: new Date(date),
      bookingTime: time,
      totalAmount
    });

    await newLabTest.save();

    // Rest of the email sending code remains the same
    const bookingData = {
      _id: newLabTest._id,
      patientName: user.fullName,
      date: newLabTest.bookingDate,
      time: newLabTest.bookingTime,
      tests: tests,
      totalAmount: totalAmount
    };

    try {
      await transporter.sendMail({
        from: '"HEALIS Healthcare" <care.healis@gmail.com>',
        to: user.email,
        subject: 'Lab Tests Booking Confirmation',
        html: createLabTestConfirmationTemplate(bookingData)
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      message: 'Lab tests booked successfully',
      labTestId: newLabTest._id
    });

  } catch (error) {
    console.error('Lab Tests Booking Error:', error);
    res.status(500).json({
      message: 'Server error during lab tests booking',
      error: error.message
    });
  }
});

// Updated Get User's Lab Tests Route - now using userId directly
app.get('/lab-tests/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all lab tests for the user using userId
    const labTests = await LabTest.find({ userId })
      .sort({ bookingDate: -1 });

    res.status(200).json({
      labTests
    });

  } catch (error) {
    console.error('Fetch Lab Tests Error:', error);
    res.status(500).json({
      message: 'Server error fetching lab tests',
      error: error.message
    });
  }
});

// Cancel Lab Test Booking Route
app.patch('/lab-tests/:labTestId/cancel', async (req, res) => {
  try {
    const labTestId = req.params.labTestId;

    const updatedLabTest = await LabTest.findByIdAndUpdate(
      labTestId, 
      { status: 'Cancelled' }, 
      { new: true }
    );

    if (!updatedLabTest) {
      return res.status(404).json({
        message: 'Lab test booking not found'
      });
    }

    res.status(200).json({
      message: 'Lab test booking cancelled successfully',
      labTest: updatedLabTest
    });

  } catch (error) {
    console.error('Lab Test Booking Cancellation Error:', error);
    res.status(500).json({
      message: 'Server error during lab test booking cancellation',
      error: error.message
    });
  }
});

// Updated Get User's Lab Tests Route using patientId
app.get('/lab-tests/patient/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // Find all lab tests for the patient using patientId directly
    const labTests = await LabTest.find({ 'patient.patientId': patientId })
      .sort({ bookingDate: -1 });

    res.status(200).json({
      labTests
    });

  } catch (error) {
    console.error('Fetch Lab Tests Error:', error);
    res.status(500).json({
      message: 'Server error fetching lab tests',
      error: error.message
    });
  }
});


// Add these routes to your server.js file



// Vaccination Email Confirmation Template
function createVaccinationConfirmationTemplate(vaccination) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(to right, #8A4FFF, #5D3FD3);
        color: white;
        text-align: center;
        padding: 20px;
        border-radius: 10px 10px 0 0;
      }
      .content {
        padding: 20px;
      }
      .vaccination-details {
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 15px;
        margin: 20px 0;
      }
      .cta-button {
        display: block;
        width: 200px;
        margin: 20px auto;
        padding: 12px;
        background: linear-gradient(to right, #8A4FFF, #5D3FD3);
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Vaccination Booking Confirmed</h1>
      </div>
      <div class="content">
        <h2>Hello ${vaccination.patient.fullName},</h2>
        
        <p>Your vaccination has been successfully booked with HEALIS Healthcare. Here are the details:</p>
        
        <div class="vaccination-details">
          <h3>Vaccination Details</h3>
          <p><strong>Vaccine:</strong> ${vaccination.vaccine.name}</p>
          <p><strong>Manufacturer:</strong> ${vaccination.vaccine.manufacturer}</p>
          <p><strong>Location:</strong> ${vaccination.location}</p>
          <p><strong>Date:</strong> ${new Date(vaccination.appointmentDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${vaccination.appointmentTime}</p>
          <p><strong>Price:</strong> ₹${vaccination.price}</p>
          <p><strong>Booking ID:</strong> ${vaccination._id}</p>
        </div>
        
        <p>Please arrive 15 minutes before your scheduled time. Bring this confirmation and any necessary identification.</p>
        
        <a href="http://localhost:5173/vaccinations" class="cta-button">View Booking</a>
        
        <p>If you need to reschedule or have any questions, please contact our support team.</p>
        
        <p>Thank you for choosing HEALIS Healthcare. We're committed to your health and well-being.</p>
        
        <p>Best regards,<br>The HEALIS Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Vaccination OTP Generation Route
app.post('/vaccinations/generate-otp', async (req, res) => {
  try {
    const { email, userId } = req.body;

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration (5 minutes)
    otpStorage.set(email, {
      otp,
      userId,
      createdAt: Date.now()
    });

    // Send OTP via email
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: email,
      subject: 'OTP for Vaccination Booking',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <h2>Your OTP for Vaccination Booking</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="letter-spacing: 10px; text-align: center;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `
    });

    res.status(200).json({
      message: 'OTP sent successfully',
      success: true
    });

  } catch (error) {
    console.error('Vaccination OTP Generation Error:', error);
    res.status(500).json({
      message: 'Error generating OTP',
      success: false
    });
  }
});

// Vaccination OTP Verification Route
app.post('/vaccinations/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOtp = otpStorage.get(email);

    // Check if OTP exists and is valid
    if (!storedOtp || storedOtp.otp !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP',
        success: false
      });
    }

    // Check OTP expiration (5 minutes)
    const currentTime = Date.now();
    if (currentTime - storedOtp.createdAt > 5 * 60 * 1000) {
      otpStorage.delete(email);
      return res.status(400).json({
        message: 'OTP has expired',
        success: false
      });
    }

    // Clear OTP after successful verification
    otpStorage.delete(email);

    res.status(200).json({
      message: 'OTP verified successfully',
      success: true,
      userId: storedOtp.userId
    });

  } catch (error) {
    console.error('Vaccination OTP Verification Error:', error);
    res.status(500).json({
      message: 'Error verifying OTP',
      success: false
    });
  }
});

// Vaccination Booking Route
app.post('/vaccinations/book', async (req, res) => {
  try {
    const { 
      userId, 
      vaccineId, 
      vaccineName, 
      manufacturer, 
      location, 
      appointmentDate, 
      appointmentTime, 
      price 
    } = req.body;

    // Find user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false
      });
    }

    // Create vaccination booking
    const vaccination = new Vaccination({
      patient: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email
      },
      vaccine: {
        id: vaccineId,
        name: vaccineName,
        manufacturer: manufacturer
      },
      location,
      appointmentDate,
      appointmentTime,
      price
    });

    await vaccination.save();

    // Send confirmation email
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: user.email,
      subject: 'Vaccination Booking Confirmation',
      html: createVaccinationConfirmationTemplate(vaccination)
    });

    res.status(201).json({
      message: 'Vaccination booked successfully',
      success: true,
      booking: vaccination
    });

  } catch (error) {
    console.error('Vaccination Booking Error:', error);
    res.status(500).json({
      message: 'Error booking vaccination',
      success: false
    });
  }
});

// Get User's Vaccinations Route
app.get('/vaccinations/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all vaccinations for the user
    const vaccinations = await Vaccination.find({ 'patient.userId': userId })
      .sort({ appointmentDate: -1 }); // Sort by date descending

    res.status(200).json({
      vaccinations
    });

  } catch (error) {
    console.error('Fetch Vaccinations Error:', error);
    res.status(500).json({
      message: 'Server error fetching vaccinations',
      error: error.message
    });
  }
});

// Cancel Vaccination Booking Route
app.patch('/vaccinations/:vaccinationId/cancel', async (req, res) => {
  try {
    const vaccinationId = req.params.vaccinationId;

    // Find and update the vaccination booking
    const updatedVaccination = await Vaccination.findByIdAndUpdate(
      vaccinationId, 
      { status: 'Cancelled' }, 
      { new: true } // Return the updated document
    );

    // Check if vaccination booking exists
    if (!updatedVaccination) {
      return res.status(404).json({
        message: 'Vaccination booking not found'
      });
    }

    res.status(200).json({
      message: 'Vaccination booking cancelled successfully',
      vaccination: updatedVaccination
    });

  } catch (error) {
    console.error('Vaccination Booking Cancellation Error:', error);
    res.status(500).json({
      message: 'Server error during vaccination booking cancellation',
      error: error.message
    });
  }
});


// Add these routes to your server.js file
// Book Pharmacy Order Route
app.post('/pharmacy/order', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    // Fetch user details
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create new pharmacy order
    const newPharmacyOrder = new PharmacyOrder({
      patient: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email
      },
      items: items.map(item => ({
        medicineId: item.id,
        name: item.name,
        brand: item.brand,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount,
      status: 'Pending'
    });

    // Save pharmacy order
    const savedOrder = await newPharmacyOrder.save();

    // Send confirmation email
    await transporter.sendMail({
      from: '"HEALIS Pharmacy" <care.healis@gmail.com>',
      to: user.email,
      subject: 'Your HEALIS Pharmacy Order Confirmation',
      html: createPharmacyOrderConfirmationTemplate(savedOrder)
    });

    res.status(201).json({
      success: true,
      message: 'Pharmacy order placed successfully',
      orderId: savedOrder._id
    });

  } catch (error) {
    console.error('Pharmacy Order Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating pharmacy order',
      error: error.message
    });
  }
});

// Get User's Pharmacy Orders Route
app.get('/pharmacy/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all pharmacy orders for the user
    const pharmacyOrders = await PharmacyOrder.find({ 'patient.userId': userId })
      .sort({ createdAt: -1 }); // Sort by date descending

    res.status(200).json({
      pharmacyOrders
    });

  } catch (error) {
    console.error('Fetch Pharmacy Orders Error:', error);
    res.status(500).json({
      message: 'Server error fetching pharmacy orders',
      error: error.message
    });
  }
});


// Book Mental Health Appointment Route
app.post('/mental-health/book', async (req, res) => {
  try {
    const { 
      userId, 
      doctorId,
      doctorName, 
      doctorSpecialty, 
      appointmentDate, 
      appointmentTime,
      email 
    } = req.body;

    // Fetch user details
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(appointmentTime)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time format. Please use HH:MM format'
      });
    }

    // Create new mental health appointment matching schema exactly
    const newMentalHealthAppointment = new MentalHealth({
      patient: {
        userId: user._id,
        fullName: user.fullName,
        email: email || user.email
      },
      therapist: {  // Match schema exactly
        id: parseInt(doctorId), // Convert to Number as per schema
        name: doctorName,
        specialty: doctorSpecialty
      },
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: 'Scheduled' // Use exact enum value from schema
    });

    // Validate against schema
    const validationError = newMentalHealthAppointment.validateSync();
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: validationError.message
      });
    }

    // Save appointment
    const savedAppointment = await newMentalHealthAppointment.save();
    
    // Send email confirmation
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: email || user.email,
      subject: 'Mental Health Appointment Confirmed - HEALIS Healthcare',
      html: createMentalHealthAppointmentTemplate(savedAppointment)
    });

    return res.status(201).json({
      success: true,
      message: 'Mental Health Appointment booked successfully',
      appointmentId: savedAppointment._id
    });

  } catch (error) {
    console.error('Mental Health Appointment Booking Error:', error);
    return res.status(500).json({
      success: false,
      message: error.name === 'ValidationError' ? error.message : 'Failed to book appointment',
      error: error.message
    });
  }
});

// Get User's Mental Health Appointments Route
app.get('/mental-health/appointments/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all mental health appointments for the user
    const mentalHealthAppointments = await MentalHealth.find({ 'patient.userId': userId })
      .sort({ appointmentDate: 1 }); // Sort by date ascending

    res.status(200).json({
      mentalHealthAppointments
    });

  } catch (error) {
    console.error('Fetch Mental Health Appointments Error:', error);
    res.status(500).json({
      message: 'Server error fetching mental health appointments',
      error: error.message
    });
  }
});

// Cancel Mental Health Appointment Route
app.patch('/mental-health/appointments/:appointmentId/cancel', async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;

    // Find and update the mental health appointment
    const updatedAppointment = await MentalHealth.findByIdAndUpdate(
      appointmentId, 
      { status: 'Cancelled' }, 
      { new: true } // Return the updated document
    );

    // Check if appointment exists
    if (!updatedAppointment) {
      return res.status(404).json({
        message: 'Mental Health Appointment not found'
      });
    }

    res.status(200).json({
      message: 'Mental Health Appointment cancelled successfully',
      appointment: updatedAppointment
    });

  } catch (error) {
    console.error('Mental Health Appointment Cancellation Error:', error);
    res.status(500).json({
      message: 'Server error during mental health appointment cancellation',
      error: error.message
    });
  }
});
app.post('/health-checkup/book', async (req, res) => {
  try {
    const { 
      userId, 
      packageId, 
      packageName, 
      packageDescription,
      location,
      tests,
      bookingDate,
      totalPrice
    } = req.body;

    // Fetch user details
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Create new health checkup booking
    const newHealthCheckup = new HealthCheckup({
      patient: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email
      },
      package: {
        id: packageId,
        name: packageName,
        description: packageDescription
      },
      location,
      tests,
      bookingDate: new Date(bookingDate),
      totalPrice
    });

    // Save health checkup booking
    await newHealthCheckup.save();
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: user.email,
      subject: 'Health Checkup Booking Confirmed - HEALIS Healthcare',
      html: createHealthCheckupConfirmationTemplate(newHealthCheckup)
    });
    res.status(201).json({
      message: 'Health Checkup booked successfully',
      healthCheckupId: newHealthCheckup._id
    });

  } catch (error) {
    console.error('Health Checkup Booking Error:', error);
    res.status(500).json({
      message: 'Server error during health checkup booking',
      error: error.message
    });
  }
});

// Get User's Health Checkup Bookings Route
app.get('/health-checkup/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all health checkup bookings for the user
    const healthCheckups = await HealthCheckup.find({ 'patient.userId': userId })
      .sort({ bookingDate: -1 }); // Sort by date descending

    res.status(200).json({
      healthCheckups
    });

  } catch (error) {
    console.error('Fetch Health Checkup Bookings Error:', error);
    res.status(500).json({
      message: 'Server error fetching health checkup bookings',
      error: error.message
    });
  }
});

// Cancel Health Checkup Booking Route
app.patch('/health-checkup/:healthCheckupId/cancel', async (req, res) => {
  try {
    const healthCheckupId = req.params.healthCheckupId;

    // Find and update the health checkup booking
    const updatedHealthCheckup = await HealthCheckup.findByIdAndUpdate(
      healthCheckupId, 
      { status: 'Cancelled' }, 
      { new: true }
    );

    // Check if booking exists
    if (!updatedHealthCheckup) {
      return res.status(404).json({
        message: 'Health Checkup booking not found'
      });
    }

    res.status(200).json({
      message: 'Health Checkup booking cancelled successfully',
      healthCheckup: updatedHealthCheckup
    });

  } catch (error) {
    console.error('Health Checkup Booking Cancellation Error:', error);
    res.status(500).json({
      message: 'Server error during health checkup booking cancellation',
      error: error.message
    });
  }
});


// Add Reminder Route
// Add Reminder Route (already in your server.js)
// In server.js
app.post('/reminders/add', async (req, res) => {
  try {
    const { 
      userId, // This should be sent from the frontend
      title, 
      doctor, 
      date, 
      time, 
      location, 
      notes, 
      color 
    } = req.body;

    // Fetch user details to automatically include in the reminder
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Create new reminder with patient details
    const newReminder = new Reminder({
      patient: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber
      },
      title,
      doctor,
      date: new Date(date),
      time,
      location,
      notes,
      color
    });

    // Save reminder
    await newReminder.save();

    res.status(201).json({
      message: 'Reminder added successfully',
      reminderId: newReminder._id
    });

  } catch (error) {
    console.error('Reminder Adding Error:', error);
    res.status(500).json({
      message: 'Server error during reminder creation',
      error: error.message
    });
  }
});

// Get User's Reminders Route
app.get('/reminders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all reminders for the specific user
    const reminders = await Reminder.find({ 'patient.userId': userId })
      .sort({ date: 1 }); // Sort by date ascending

    res.status(200).json({
      reminders
    });

  } catch (error) {
    console.error('Fetch Reminders Error:', error);
    res.status(500).json({
      message: 'Server error fetching reminders',
      error: error.message
    });
  }
});
// Cancel Reminder Route
app.patch('/reminders/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the reminder and update its status
    const updatedReminder = await Reminder.findByIdAndUpdate(
      id, 
      { 
        status: 'Cancelled',
        cancelledAt: new Date()
      }, 
      { 
        new: true,  // Return the updated document
        runValidators: true  // Run model validation
      }
    );

    // Check if reminder exists
    if (!updatedReminder) {
      return res.status(404).json({
        message: 'Reminder not found',
        success: false
      });
    }

    // Send successful response
    res.status(200).json({
      message: 'Reminder cancelled successfully',
      reminder: updatedReminder,
      success: true
    });

  } catch (error) {
    console.error('Cancel Reminder Error:', error);
    res.status(500).json({
      message: 'Server error while cancelling reminder',
      error: error.message,
      success: false
    });
  }
});
// Delete Reminder Route
app.delete('/reminders/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the reminder
    const deletedReminder = await Reminder.findByIdAndDelete(id);

    // Check if reminder exists
    if (!deletedReminder) {
      return res.status(404).json({
        message: 'Reminder not found',
        success: false
      });
    }

    // Send successful response
    res.status(200).json({
      message: 'Reminder deleted successfully',
      success: true
    });

  } catch (error) {
    console.error('Delete Reminder Error:', error);
    res.status(500).json({
      message: 'Server error while deleting reminder',
      error: error.message,
      success: false
    });
  }
});

// Add Medication Route
app.post('/medications/add', async (req, res) => {
  try {
    const { 
      userId, 
      name, 
      dosage, 
      frequency, 
      times, 
      startDate, 
      endDate, 
      instructions, 
      color 
    } = req.body;

    // Fetch user details to automatically include in the medication
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Create new medication with patient details
    const newMedication = new Medication({
      patient: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email
      },
      name,
      dosage,
      frequency,
      times,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      instructions: instructions || '',
      color
    });

    // Save medication
    await newMedication.save();

    res.status(201).json({
      message: 'Medication added successfully',
      medicationId: newMedication._id
    });

  } catch (error) {
    console.error('Medication Adding Error:', error);
    res.status(500).json({
      message: 'Server error during medication creation',
      error: error.message
    });
  }
});

app.patch('/reminders/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { completedAt } = req.body;

    const updatedReminder = await Reminder.findByIdAndUpdate(
      id, 
      { 
        status: 'Completed',
        completedAt
      }, 
      { new: true, runValidators: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({
        message: 'Reminder not found',
        success: false
      });
    }

    res.status(200).json({
      message: 'Reminder marked as completed',
      reminder: updatedReminder,
      success: true
    });

  } catch (error) {
    console.error('Complete Reminder Error:', error);
    res.status(500).json({
      message: 'Server error while completing reminder',
      error: error.message,
      success: false
    });
  }
});

app.patch('/medications/:id/complete',  async (req, res) => {
  try {
    const { id } = req.params;
    const { completedAt } = req.body;

    // Validate medication ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid medication ID format'
      });
    }

    // Find and update the medication
    const medication = await Medication.findById(id);

    if (!medication) {
      return res.status(404).json({
        success: false,
        message: 'Medication not found'
      });
    }

    // Verify user owns this medication
    if (medication.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to complete this medication'
      });
    }

    // Update medication status and completion time
    medication.status = 'Completed';
    medication.completedAt = completedAt || new Date();
    
    // Save the updated medication
    await medication.save();

    // Return success response
    res.json({
      success: true,
      message: 'Medication marked as completed',
      data: {
        medicationId: medication._id,
        status: medication.status,
        completedAt: medication.completedAt
      }
    });

  } catch (error) {
    console.error('Error completing medication:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete medication',
      error: error.message
    });
  }
});


// Get User's Medications Route
app.get('/medications/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all medications for the specific user
    const medications = await Medication.find({ 'patient.userId': userId })
      .sort({ startDate: 1 }); // Sort by start date ascending

    res.status(200).json({
      medications
    });

  } catch (error) {
    console.error('Fetch Medications Error:', error);
    res.status(500).json({
      message: 'Server error fetching medications',
      error: error.message
    });
  }
});

// Discontinue Medication Route
app.patch('/medications/:id/discontinue', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the medication and update its status
    const updatedMedication = await Medication.findByIdAndUpdate(
      id, 
      { 
        status: 'Discontinued',
        endDate: new Date()
      }, 
      { 
        new: true,  // Return the updated document
        runValidators: true  // Run model validation
      }
    );

    // Check if medication exists
    if (!updatedMedication) {
      return res.status(404).json({
        message: 'Medication not found',
        success: false
      });
    }

    // Send successful response
    res.status(200).json({
      message: 'Medication discontinued successfully',
      medication: updatedMedication,
      success: true
    });

  } catch (error) {
    console.error('Discontinue Medication Error:', error);
    res.status(500).json({
      message: 'Server error while discontinuing medication',
      error: error.message,
      success: false
    });
  }
});

// Delete Medication Route
app.delete('/medications/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the medication
    const deletedMedication = await Medication.findByIdAndDelete(id);

    // Check if medication exists
    if (!deletedMedication) {
      return res.status(404).json({
        message: 'Medication not found',
        success: false
      });
    }

    // Send successful response
    res.status(200).json({
      message: 'Medication deleted successfully',
      success: true
    });

  } catch (error) {
    console.error('Delete Medication Error:', error);
    res.status(500).json({
      message: 'Server error while deleting medication',
      error: error.message,
      success: false
    });
  }
});
// Complete Reminder Route
app.patch('/reminders/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { completedAt } = req.body;

    // Find and update the reminder
    const updatedReminder = await Reminder.findByIdAndUpdate(
      id, 
      { 
        status: 'Completed',
        completedAt: completedAt || new Date()
      }, 
      { 
        new: true,
        runValidators: true 
      }
    );

    // Check if reminder exists
    if (!updatedReminder) {
      return res.status(404).json({
        success: false,
        message: 'Reminder not found'
      });
    }

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Reminder marked as completed',
      reminder: updatedReminder
    });

  } catch (error) {
    console.error('Complete Reminder Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while completing reminder',
      error: error.message
    });
  }
});

// Complete Medication Route
app.patch('/medications/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { completedAt } = req.body;

    // Find and update the medication
    const updatedMedication = await Medication.findByIdAndUpdate(
      id, 
      { 
        status: 'Completed',
        completedAt: completedAt || new Date()
      }, 
      { 
        new: true,
        runValidators: true 
      }
    );

    // Check if medication exists
    if (!updatedMedication) {
      return res.status(404).json({
        success: false,
        message: 'Medication not found'
      });
    }

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Medication marked as completed',
      medication: updatedMedication
    });

  } catch (error) {
    console.error('Complete Medication Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while completing medication',
      error: error.message
    });
  }
});
app.post('/nutritionist/book', async (req, res) => {
  try {
    const { 
      userId, 
      nutritionistId, 
      nutritionistName, 
      nutritionistSpecialty,
      bookingDate, 
      bookingTime,
      totalPrice
    } = req.body;

    // Fetch user details
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Create new nutritionist booking
    const newNutritionistBooking = new NutritionistBooking({
      patient: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email
      },
      nutritionist: {
        id: nutritionistId,
        name: nutritionistName,
        specialization: nutritionistSpecialty
      },
      bookingDate: new Date(bookingDate),
      bookingTime,
      totalPrice
    });

    // Save booking
    await newNutritionistBooking.save();

    // Send confirmation email
    try {
      await transporter.sendMail({
        from: '"HEALIS Healthcare" <care.healis@gmail.com>',
        to: user.email,
        subject: 'Nutritionist Appointment Confirmation - HEALIS Healthcare',
        html: createNutritionistConfirmationTemplate(newNutritionistBooking)
      });
    } catch (emailError) {
      console.error('Nutritionist Booking Confirmation Email Error:', emailError);
    }

    res.status(201).json({
      message: 'Nutritionist Booking successful',
      bookingId: newNutritionistBooking._id
    });

  } catch (error) {
    console.error('Nutritionist Booking Error:', error);
    res.status(500).json({
      message: 'Server error during nutritionist booking',
      error: error.message
    });
  }
});
// Get User's Nutritionist Bookings Route
app.get('/nutritionist/bookings/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all nutritionist bookings for the user
    const nutritionistBookings = await NutritionistBooking.find({ 'patient.userId': userId })
      .sort({ bookingDate: -1 }); // Sort by date descending

    res.status(200).json({
      nutritionistBookings
    });

  } catch (error) {
    console.error('Fetch Nutritionist Bookings Error:', error);
    res.status(500).json({
      message: 'Server error fetching nutritionist bookings',
      error: error.message
    });
  }
});

// Cancel Nutritionist Booking Route
app.patch('/nutritionist/bookings/:bookingId/cancel', async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    // Find and update the nutritionist booking
    const updatedBooking = await NutritionistBooking.findByIdAndUpdate(
      bookingId, 
      { status: 'Cancelled' }, 
      { new: true }
    );

    // Check if booking exists
    if (!updatedBooking) {
      return res.status(404).json({
        message: 'Nutritionist Booking not found'
      });
    }

    res.status(200).json({
      message: 'Nutritionist Booking cancelled successfully',
      booking: updatedBooking
    });

  } catch (error) {
    console.error('Nutritionist Booking Cancellation Error:', error);
    res.status(500).json({
      message: 'Server error during nutritionist booking cancellation',
      error: error.message
    });
  }
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'care.healis@gmail.com', // Replace with your email
    pass: 'mmij azgt thds pxya' // Replace with your app password
  }
});

// Email template function
function createWelcomeEmailTemplate(fullName) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to HEALIS</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
          }
          .container {
              background-color: white;
              border-radius: 10px;
              padding: 30px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
              background: linear-gradient(to right, #4299E1, #48BB78);
              color: white;
              text-align: center;
              padding: 20px;
              border-radius: 10px 10px 0 0;
          }
          .content {
              padding: 20px;
          }
          .cta-button {
              display: block;
              width: 200px;
              margin: 20px auto;
              padding: 12px;
              background: linear-gradient(to right, #4299E1, #48BB78);
              color: white;
              text-align: center;
              text-decoration: none;
              border-radius: 5px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Welcome to HEALIS</h1>
              <p>Your Personalized Healthcare Companion</p>
          </div>
          <div class="content">
              <h2>Hello ${fullName},</h2>
              
              <p>Congratulations! You've just taken the first step towards a healthier, more connected healthcare experience with HEALIS.</p>
              
              <p>Our platform is designed to make your healthcare journey smooth, personalized, and empowering. From booking appointments to tracking your medications, HEALIS is here to support you every step of the way.</p>
              
              <a href="http://localhost:5173/dashboard" class="cta-button">Explore Your Dashboard</a>
              
              <p>Some exciting features waiting for you:</p>
              <ul>
                  <li>Book doctor appointments with ease</li>
                  <li>Track and manage your medications</li>
                  <li>Schedule lab tests and vaccinations</li>
                  <li>Set personalized health reminders</li>
              </ul>
              
              <p>Welcome aboard! We're thrilled to be your healthcare partner.</p>
              
              <p>Best regards,<br>The HEALIS Team</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

// Function to send welcome email
async function sendWelcomeEmail(email, fullName) {
  try {
    // Send email
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>', // Replace with your email
      to: email,
      subject: 'Welcome to HEALIS - Your Healthcare Companion',
      html: createWelcomeEmailTemplate(fullName)
    });

    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}
app.post('/appointments/generate-otp', async (req, res) => {
  try {
    const { email } = req.body;

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration (5 minutes)
    otpStorage.set(email, {
      otp,
      createdAt: Date.now()
    });

    // Send OTP via email
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: email,
      subject: 'OTP for Appointment Booking',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <h2>Your OTP for Appointment Booking</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="letter-spacing: 10px; text-align: center;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `
    });

    res.status(200).json({
      message: 'OTP sent successfully',
      success: true
    });

  } catch (error) {
    console.error('OTP Generation Error:', error);
    res.status(500).json({
      message: 'Error generating OTP',
      success: false
    });
  }
});

// Verify OTP Route
app.post('/appointments/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOtp = otpStorage.get(email);

    // Check if OTP exists and is valid
    if (!storedOtp || storedOtp.otp !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP',
        success: false
      });
    }

    // Check OTP expiration (5 minutes)
    const currentTime = Date.now();
    if (currentTime - storedOtp.createdAt > 5 * 60 * 1000) {
      otpStorage.delete(email);
      return res.status(400).json({
        message: 'OTP has expired',
        success: false
      });
    }

    // Clear OTP after successful verification
    otpStorage.delete(email);

    res.status(200).json({
      message: 'OTP verified successfully',
      success: true
    });

  } catch (error) {
    console.error('OTP Verification Error:', error);
    res.status(500).json({
      message: 'Error verifying OTP',
      success: false
    });
  }
});
function createAppointmentConfirmationTemplate(appointment) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(to right, #4299E1, #48BB78);
        color: white;
        text-align: center;
        padding: 20px;
        border-radius: 10px 10px 0 0;
      }
      .content {
        padding: 20px;
      }
      .appointment-details {
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 15px;
        margin: 20px 0;
      }
      .cta-button {
        display: block;
        width: 200px;
        margin: 20px auto;
        padding: 12px;
        background: linear-gradient(to right, #4299E1, #48BB78);
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Appointment Confirmed</h1>
      </div>
      <div class="content">
        <h2>Hello ${appointment.patient.fullName},</h2>
        
        <p>Your appointment has been successfully booked with HEALIS Healthcare. Here are the details:</p>
        
        <div class="appointment-details">
          <h3>Appointment Details</h3>
          <p><strong>Doctor:</strong> ${appointment.doctor.name}</p>
          <p><strong>Specialty:</strong> ${appointment.doctor.specialty}</p>
          <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
          <p><strong>Appointment ID:</strong> ${appointment._id}</p>
        </div>
        
        <p>Please arrive 15 minutes before your scheduled time. If you need to reschedule or cancel, please contact our support team.</p>
        
        <a href="http://localhost:5173/appointments" class="cta-button">View Appointment</a>
        
        <p>Thank you for choosing HEALIS Healthcare. We're committed to providing you with the best medical care.</p>
        
        <p>Best regards,<br>The HEALIS Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
}



// Add this function to your server.js file, similar to createAppointmentConfirmationTemplate

function createHealthCheckupConfirmationTemplate(healthCheckup) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(to right, #4299E1, #48BB78);
        color: white;
        text-align: center;
        padding: 20px;
        border-radius: 10px 10px 0 0;
      }
      .content {
        padding: 20px;
      }
      .health-checkup-details {
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 15px;
        margin: 20px 0;
      }
      .cta-button {
        display: block;
        width: 200px;
        margin: 20px auto;
        padding: 12px;
        background: linear-gradient(to right, #4299E1, #48BB78);
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Health Checkup Confirmed</h1>
      </div>
      <div class="content">
        <h2>Hello ${healthCheckup.patient.fullName},</h2>
        
        <p>Your health checkup has been successfully booked with HEALIS Healthcare. Here are the details:</p>
        
        <div class="health-checkup-details">
          <h3>Health Checkup Details</h3>
          <p><strong>Package:</strong> ${healthCheckup.package.name}</p>
          <p><strong>Location:</strong> ${healthCheckup.location}</p>
          <p><strong>Booking Date:</strong> ${new Date(healthCheckup.bookingDate).toLocaleDateString()}</p>
          <p><strong>Total Price:</strong> ₹${healthCheckup.totalPrice}</p>
          <p><strong>Booking ID:</strong> ${healthCheckup._id}</p>
          
          <h4>Included Tests:</h4>
          <ul>
            ${healthCheckup.tests.map(test => `<li>${test}</li>`).join('')}
          </ul>
        </div>
        
        <p>Please arrive 15 minutes before your scheduled time. Bring this confirmation and any necessary identification.</p>
        
        <a href="http://localhost:5173/health-checkups" class="cta-button">View Booking</a>
        
        <p>If you need to reschedule or have any questions, please contact our support team.</p>
        
        <p>Thank you for choosing HEALIS Healthcare. We're committed to your health and well-being.</p>
        
        <p>Best regards,<br>The HEALIS Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
// Health Checkup OTP Generation Route
app.post('/health-checkup/generate-otp', async (req, res) => {
  try {
    const { email } = req.body;

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration (5 minutes)
    otpStorage.set(email, {
      otp,
      createdAt: Date.now()
    });

    // Send OTP via email
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: email,
      subject: 'OTP for Health Checkup Booking',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <h2>Your OTP for Health Checkup Booking</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="letter-spacing: 10px; text-align: center;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `
    });

    res.status(200).json({
      message: 'OTP sent successfully',
      success: true
    });

  } catch (error) {
    console.error('Health Checkup OTP Generation Error:', error);
    res.status(500).json({
      message: 'Error generating OTP',
      success: false
    });
  }
});

// Health Checkup OTP Verification Route
app.post('/health-checkup/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOtp = otpStorage.get(email);

    // Check if OTP exists and is valid
    if (!storedOtp || storedOtp.otp !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP',
        success: false
      });
    }

    // Check OTP expiration (5 minutes)
    const currentTime = Date.now();
    if (currentTime - storedOtp.createdAt > 5 * 60 * 1000) {
      otpStorage.delete(email);
      return res.status(400).json({
        message: 'OTP has expired',
        success: false
      });
    }

    // Clear OTP after successful verification
    otpStorage.delete(email);

    res.status(200).json({
      message: 'OTP verified successfully',
      success: true
    });

  } catch (error) {
    console.error('Health Checkup OTP Verification Error:', error);
    res.status(500).json({
      message: 'Error verifying OTP',
      success: false
    });
  }
});
// Email template for lab test booking confirmation
function createLabTestConfirmationTemplate(labBooking) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(to right, #8B5CF6, #6D28D9);
        color: white;
        text-align: center;
        padding: 20px;
        border-radius: 10px 10px 0 0;
      }
      .content {
        padding: 20px;
      }
      .lab-test-details {
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 15px;
        margin: 20px 0;
      }
      .cta-button {
        display: block;
        width: 200px;
        margin: 20px auto;
        padding: 12px;
        background: linear-gradient(to right, #8B5CF6, #6D28D9);
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Lab Tests Booking Confirmed</h1>
      </div>
      <div class="content">
        <h2>Hello ${labBooking.patientName},</h2>
        
        <p>Your lab tests have been successfully booked with HEALIS Healthcare. Here are your booking details:</p>
        
        <div class="lab-test-details">
          <h3>Booking Details</h3>
          <p><strong>Appointment Date:</strong> ${new Date(labBooking.date).toLocaleDateString()}</p>
          <p><strong>Time Slot:</strong> ${labBooking.time}</p>
          <p><strong>Booking ID:</strong> ${labBooking._id}</p>
          <p><strong>Total Amount:</strong> ₹${labBooking.totalAmount}</p>
          
          <h4>Booked Tests:</h4>
          <ul>
            ${labBooking.tests.map(test => `
              <li>
                <strong>${test.name}</strong> - ₹${test.price}
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div class="instructions">
          <h4>Important Instructions:</h4>
          <ul>
            <li>Please arrive 15 minutes before your scheduled time</li>
            <li>Bring a valid photo ID for verification</li>
            <li>Fasting for 8-12 hours is recommended for most blood tests</li>
            <li>Bring your booking confirmation</li>
          </ul>
        </div>
        
        <a href="http://localhost:5173/lab-tests" class="cta-button">View Booking</a>
        
        <p>Need to reschedule or have questions? Contact our support team at care.healis@gmail.com</p>
        
        <p>Thank you for choosing HEALIS Healthcare for your diagnostic needs.</p>
        
        <p>Best regards,<br>The HEALIS Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Lab Tests OTP Generation Route
app.post('/lab-tests/generate-otp', async (req, res) => {
  try {
    const { email, userId } = req.body;

    if (!email || !userId) {
      return res.status(400).json({
        message: 'Email and user ID are required',
        success: false
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration (5 minutes)
    otpStorage.set(email, {
      otp,
      userId,
      createdAt: Date.now()
    });

    // Send OTP via email
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: email,
      subject: 'OTP for Lab Tests Booking',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #8B5CF6, #6D28D9); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0;">Lab Tests Booking OTP</h2>
          </div>
          <div style="background: white; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p>Your One-Time Password (OTP) for lab tests booking is:</p>
            <h1 style="letter-spacing: 10px; text-align: center; color: #6D28D9;">${otp}</h1>
            <p style="color: #666; font-size: 14px;">This OTP will expire in 5 minutes.</p>
            <p style="color: #666; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
          </div>
        </div>
      `
    });

    res.status(200).json({
      message: 'OTP sent successfully',
      success: true
    });

  } catch (error) {
    console.error('Lab Tests OTP Generation Error:', error);
    res.status(500).json({
      message: 'Error generating OTP',
      success: false
    });
  }
});

// Lab Tests OTP Verification Route
app.post('/lab-tests/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: 'Email and OTP are required',
        success: false
      });
    }

    const storedData = otpStorage.get(email);

    // Check if OTP exists and is valid
    if (!storedData || storedData.otp !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP',
        success: false
      });
    }

    // Check OTP expiration (5 minutes)
    const currentTime = Date.now();
    if (currentTime - storedData.createdAt > 5 * 60 * 1000) {
      otpStorage.delete(email);
      return res.status(400).json({
        message: 'OTP has expired',
        success: false
      });
    }

    // Clear OTP after successful verification
    otpStorage.delete(email);

    res.status(200).json({
      message: 'OTP verified successfully',
      success: true,
      userId: storedData.userId
    });

  } catch (error) {
    console.error('Lab Tests OTP Verification Error:', error);
    res.status(500).json({
      message: 'Error verifying OTP',
      success: false
    });
  }
});
function createMentalHealthAppointmentTemplate(appointment) {
  // Format date to locale string
  const formattedDate = new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format time to 12-hour format
  const formattedTime = appointment.appointmentTime;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(to right, #8B5CF6, #6D28D9);
        color: white;
        text-align: center;
        padding: 20px;
        border-radius: 10px 10px 0 0;
      }
      .content {
        padding: 20px;
      }
      .appointment-details {
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 15px;
        margin: 20px 0;
      }
      .cta-button {
        display: block;
        width: 200px;
        margin: 20px auto;
        padding: 12px;
        background: linear-gradient(to right, #8B5CF6, #6D28D9);
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
      }
      .doctor-info {
        display: flex;
        align-items: center;
        gap: 15px;
        margin: 15px 0;
        padding: 15px;
        background-color: #f9f9f9;
        border-radius: 5px;
      }
      .doctor-photo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Mental Health Appointment Confirmed</h1>
      </div>
      <div class="content">
        <h2>Hello ${appointment.patient.fullName},</h2>
        
        <p>Your mental health appointment has been successfully scheduled with HEALIS Healthcare.</p>
        
        <div class="doctor-info">
          <img src="/api/placeholder/80/80" alt="Therapist's photo" class="doctor-photo">
          <div>
            <h3 style="margin: 0;">${appointment.therapist.name}</h3>
            <p style="margin: 5px 0; color: #6D28D9;">${appointment.therapist.specialty}</p>
          </div>
        </div>
        
        <div class="appointment-details">
          <h3>Appointment Details</h3>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${formattedTime}</p>
          <p><strong>Status:</strong> ${appointment.status}</p>
          <p><strong>Booking ID:</strong> ${appointment._id}</p>
        </div>
        
        <div class="instructions">
          <h4>Important Instructions:</h4>
          <ul>
            <li>Please arrive 10 minutes before your scheduled time</li>
            <li>Bring any relevant medical records or previous mental health documentation</li>
            <li>Have a list of current medications ready, if any</li>
            <li>Ensure you're in a quiet, private space if this is a virtual consultation</li>
            <li>Feel free to bring a family member or friend for support if you wish</li>
          </ul>
        </div>
        
        <a href="http://localhost:5173/mental-health" class="cta-button">View Appointment</a>
        
        <p>Need to reschedule or have questions? Contact our mental health support team at care.healis@gmail.com</p>
        
        <p>We're committed to providing you with compassionate and professional mental health care.</p>
        
        <p>Best regards,<br>The HEALIS Healthcare Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Mental Health Appointment OTP Generation Route
app.post('/mental-health/generate-otp', async (req, res) => {
  try {
    const { email, userId } = req.body;

    if (!email || !userId) {
      return res.status(400).json({
        message: 'Email and user ID are required',
        success: false
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration (5 minutes)
    otpStorage.set(email, {
      otp,
      userId,
      createdAt: Date.now()
    });

    // Send OTP via email
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: email,
      subject: 'OTP for Mental Health Appointment',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #8B5CF6, #6D28D9); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0;">Mental Health Appointment OTP</h2>
          </div>
          <div style="background: white; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p>Your One-Time Password (OTP) for mental health appointment booking is:</p>
            <h1 style="letter-spacing: 10px; text-align: center; color: #6D28D9;">${otp}</h1>
            <p style="color: #666; font-size: 14px;">This OTP will expire in 5 minutes.</p>
            <p style="color: #666; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
            <p style="color: #666; font-size: 14px;">Your privacy and security are important to us.</p>
          </div>
        </div>
      `
    });

    res.status(200).json({
      message: 'OTP sent successfully',
      success: true
    });

  } catch (error) {
    console.error('Mental Health OTP Generation Error:', error);
    res.status(500).json({
      message: 'Error generating OTP',
      success: false
    });
  }
});

// Mental Health Appointment OTP Verification Route
app.post('/mental-health/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: 'Email and OTP are required',
        success: false
      });
    }

    const storedData = otpStorage.get(email);

    // Check if OTP exists and is valid
    if (!storedData || storedData.otp !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP',
        success: false
      });
    }

    // Check OTP expiration (5 minutes)
    const currentTime = Date.now();
    if (currentTime - storedData.createdAt > 5 * 60 * 1000) {
      otpStorage.delete(email);
      return res.status(400).json({
        message: 'OTP has expired',
        success: false
      });
    }

    // Clear OTP after successful verification
    otpStorage.delete(email);

    res.status(200).json({
      message: 'OTP verified successfully',
      success: true,
      userId: storedData.userId
    });

  } catch (error) {
    console.error('Mental Health OTP Verification Error:', error);
    res.status(500).json({
      message: 'Error verifying OTP',
      success: false
    });
  }
});
function createPharmacyOrderConfirmationTemplate(order) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(to right, #8B5CF6, #6D28D9);
        color: white;
        text-align: center;
        padding: 20px;
        border-radius: 10px 10px 0 0;
      }
      .content {
        padding: 20px;
      }
      .order-details {
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 15px;
        margin: 20px 0;
      }
      .medicine-list {
        margin: 15px 0;
        border-top: 1px solid #eee;
        padding-top: 15px;
      }
      .medicine-item {
        display: flex;
        justify-content: space-between;
        margin: 8px 0;
      }
      .cta-button {
        display: block;
        width: 200px;
        margin: 20px auto;
        padding: 12px;
        background: linear-gradient(to right, #8B5CF6, #6D28D9);
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Order Confirmation</h1>
      </div>
      <div class="content">
        <h2>Hello,</h2>
        
        <p>Your order has been successfully placed with HEALIS Pharmacy. Here are your order details:</p>
        
        <div class="order-details">
          <h3>Order Summary</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Delivery Expected:</strong> Within 2-3 hours</p>
          
          <div class="medicine-list">
            <h4>Ordered Items:</h4>
            ${order.items.map(item => `
              <div class="medicine-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
              </div>
            `).join('')}
            
            <div class="medicine-item" style="margin-top: 15px; font-weight: bold;">
              <span>Total Amount</span>
              <span>₹${order.totalAmount}</span>
            </div>
          </div>
        </div>
        
        <p>Your medicines will be delivered to your registered address. Our delivery partner will contact you shortly.</p>
        
        <a href="http://localhost:5173/pharmacy" class="cta-button">Track Order</a>
        
        <p>If you have any questions about your order, please contact our support team.</p>
        
        <p>Thank you for choosing HEALIS Pharmacy. We're committed to your health and well-being.</p>
        
        <p>Best regards,<br>The HEALIS Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Pharmacy OTP Generation Route
app.post('/pharmacy/generate-otp', async (req, res) => {
  try {
    const { email, userId } = req.body;

    if (!email || !userId) {
      return res.status(400).json({
        message: 'Email and user ID are required',
        success: false
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration (5 minutes)
    otpStorage.set(email, {
      otp,
      userId,
      createdAt: Date.now()
    });

    // Send OTP via email
    await transporter.sendMail({
      from: '"HEALIS Pharmacy" <care.healis@gmail.com>',
      to: email,
      subject: 'OTP for Pharmacy Order',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <h2 style="color: #6D28D9;">Your OTP for Pharmacy Order</h2>
          <p>Please use the following One-Time Password (OTP) to confirm your order:</p>
          <h1 style="letter-spacing: 10px; text-align: center; color: #6D28D9;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
          <p style="color: #666; font-size: 0.9em;">For security reasons, please do not share this OTP with anyone.</p>
        </div>
      `
    });

    res.status(200).json({
      message: 'OTP sent successfully',
      success: true
    });

  } catch (error) {
    console.error('Pharmacy OTP Generation Error:', error);
    res.status(500).json({
      message: 'Error generating OTP',
      success: false
    });
  }
});

// Pharmacy OTP Verification Route
app.post('/pharmacy/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedData = otpStorage.get(email);

    // Check if OTP exists and is valid
    if (!storedData || storedData.otp !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP',
        success: false
      });
    }

    // Check OTP expiration (5 minutes)
    const currentTime = Date.now();
    if (currentTime - storedData.createdAt > 5 * 60 * 1000) {
      otpStorage.delete(email);
      return res.status(400).json({
        message: 'OTP has expired',
        success: false
      });
    }

    // Clear OTP after successful verification
    otpStorage.delete(email);

    res.status(200).json({
      message: 'OTP verified successfully',
      success: true
    });

  } catch (error) {
    console.error('Pharmacy OTP Verification Error:', error);
    res.status(500).json({
      message: 'Error verifying OTP',
      success: false
    });
  }
});
const createNutritionistConfirmationTemplate = (booking) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(to right, #4299E1, #48BB78);
        color: white;
        text-align: center;
        padding: 20px;
        border-radius: 10px 10px 0 0;
      }
      .content {
        padding: 20px;
      }
      .booking-details {
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 15px;
        margin: 20px 0;
      }
      .cta-button {
        display: block;
        width: 200px;
        margin: 20px auto;
        padding: 12px;
        background: linear-gradient(to right, #4299E1, #48BB78);
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Nutritionist Appointment Confirmed</h1>
      </div>
      <div class="content">
        <h2>Hello ${booking.patient.fullName},</h2>
        
        <p>Your appointment with our nutritionist has been successfully booked. Here are the details:</p>
        
        <div class="booking-details">
          <h3>Appointment Details</h3>
          <p><strong>Nutritionist:</strong> ${booking.nutritionist.name}</p>
          <p><strong>Specialization:</strong> ${booking.nutritionist.specialization}</p>
          <p><strong>Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.bookingTime}</p>
          <p><strong>Total Price:</strong> ₹${booking.totalPrice}</p>
          <p><strong>Booking ID:</strong> ${booking._id}</p>
        </div>
        
        <p>Please arrive 10 minutes before your scheduled appointment. Don't forget to bring any relevant medical records or diet plans.</p>
        
        <a href="http://localhost:5173/bookings" class="cta-button">View Booking</a>
        
        <p>Need to reschedule or have questions? Contact our support team for assistance.</p>
        
        <p>Thank you for choosing HEALIS Healthcare for your nutritional consultation.</p>
        
        <p>Best regards,<br>The HEALIS Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

// Nutritionist Booking OTP Generation Route
app.post('/nutritionist/generate-otp', async (req, res) => {
  try {
    const { email } = req.body;

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration (5 minutes)
    otpStorage.set(email, {
      otp,
      createdAt: Date.now()
    });

    // Send OTP via email
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: email,
      subject: 'OTP for Nutritionist Appointment Booking',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <h2>Your OTP for Nutritionist Appointment</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="letter-spacing: 10px; text-align: center;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
          <p>Please do not share this OTP with anyone.</p>
        </div>
      `
    });

    res.status(200).json({
      message: 'OTP sent successfully',
      success: true
    });

  } catch (error) {
    console.error('Nutritionist Booking OTP Generation Error:', error);
    res.status(500).json({
      message: 'Error generating OTP',
      success: false
    });
  }
});

// Nutritionist Booking OTP Verification Route
app.post('/nutritionist/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOtp = otpStorage.get(email);

    // Check if OTP exists and is valid
    if (!storedOtp || storedOtp.otp !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP',
        success: false
      });
    }

    // Check OTP expiration (5 minutes)
    const currentTime = Date.now();
    if (currentTime - storedOtp.createdAt > 5 * 60 * 1000) {
      otpStorage.delete(email);
      return res.status(400).json({
        message: 'OTP has expired',
        success: false
      });
    }

    // Clear OTP after successful verification
    otpStorage.delete(email);

    res.status(200).json({
      message: 'OTP verified successfully',
      success: true
    });

  } catch (error) {
    console.error('Nutritionist Booking OTP Verification Error:', error);
    res.status(500).json({
      message: 'Error verifying OTP',
      success: false
    });
  }
});

// Vaccination Email Confirmation Template
function createVaccinationConfirmationTemplate(vaccination) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(to right, #8A4FFF, #5D3FD3);
        color: white;
        text-align: center;
        padding: 20px;
        border-radius: 10px 10px 0 0;
      }
      .content {
        padding: 20px;
      }
      .vaccination-details {
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 15px;
        margin: 20px 0;
      }
      .cta-button {
        display: block;
        width: 200px;
        margin: 20px auto;
        padding: 12px;
        background: linear-gradient(to right, #8A4FFF, #5D3FD3);
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Vaccination Booking Confirmed</h1>
      </div>
      <div class="content">
        <h2>Hello ${vaccination.patient.fullName},</h2>
        
        <p>Your vaccination has been successfully booked with HEALIS Healthcare. Here are the details:</p>
        
        <div class="vaccination-details">
          <h3>Vaccination Details</h3>
          <p><strong>Vaccine:</strong> ${vaccination.vaccine.name}</p>
          <p><strong>Manufacturer:</strong> ${vaccination.vaccine.manufacturer}</p>
          <p><strong>Location:</strong> ${vaccination.location}</p>
          <p><strong>Date:</strong> ${new Date(vaccination.appointmentDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${vaccination.appointmentTime}</p>
          <p><strong>Price:</strong> ₹${vaccination.price}</p>
          <p><strong>Booking ID:</strong> ${vaccination._id}</p>
        </div>
        
        <p>Please arrive 15 minutes before your scheduled time. Bring this confirmation and any necessary identification.</p>
        
        <a href="http://localhost:5173/vaccinations" class="cta-button">View Booking</a>
        
        <p>If you need to reschedule or have any questions, please contact our support team.</p>
        
        <p>Thank you for choosing HEALIS Healthcare. We're committed to your health and well-being.</p>
        
        <p>Best regards,<br>The HEALIS Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Vaccination OTP Generation Route
app.post('/vaccinations/generate-otp', async (req, res) => {
  try {
    const { email, userId } = req.body;

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration (5 minutes)
    otpStorage.set(email, {
      otp,
      userId,
      createdAt: Date.now()
    });

    // Send OTP via email
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: email,
      subject: 'OTP for Vaccination Booking',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <h2>Your OTP for Vaccination Booking</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="letter-spacing: 10px; text-align: center;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `
    });

    res.status(200).json({
      message: 'OTP sent successfully',
      success: true
    });

  } catch (error) {
    console.error('Vaccination OTP Generation Error:', error);
    res.status(500).json({
      message: 'Error generating OTP',
      success: false
    });
  }
});

// Vaccination OTP Verification Route
app.post('/vaccinations/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOtp = otpStorage.get(email);

    // Check if OTP exists and is valid
    if (!storedOtp || storedOtp.otp !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP',
        success: false
      });
    }

    // Check OTP expiration (5 minutes)
    const currentTime = Date.now();
    if (currentTime - storedOtp.createdAt > 5 * 60 * 1000) {
      otpStorage.delete(email);
      return res.status(400).json({
        message: 'OTP has expired',
        success: false
      });
    }

    // Clear OTP after successful verification
    otpStorage.delete(email);

    res.status(200).json({
      message: 'OTP verified successfully',
      success: true,
      userId: storedOtp.userId
    });

  } catch (error) {
    console.error('Vaccination OTP Verification Error:', error);
    res.status(500).json({
      message: 'Error verifying OTP',
      success: false
    });
  }
});

/*app.get('/api/patient-appointments/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all appointments for the user
    const appointments = await DoctorAppointment.find({ 'patient.userId': userId })
      .sort({ appointmentDate: -1 }); // Sort by most recent first

    res.status(200).json({
      appointments
    });
  } catch (error) {
    console.error('Fetch Patient Appointments Error:', error);
    res.status(500).json({
      message: 'Server error fetching patient appointments',
      error: error.message
    });
  }
});*/
// Add this route to server.js for doctor-specific appointments
app.get('/api/doctor-appointments/:doctorId', async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    // Validate doctorId
    if (!doctorId) {
      return res.status(400).json({
        message: 'Doctor ID is required',
        success: false
      });
    }

    // Find all appointments for the specific doctor
    const appointments = await DoctorAppointment.find({ 'doctor.id': doctorId })
      .sort({ appointmentDate: -1 }); // Sort by most recent first

    // Check if any appointments exist
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({
        message: 'No appointments found for this doctor',
        appointments: []
      });
    }

    res.status(200).json({
      appointments
    });
  } catch (error) {
    console.error('Fetch Doctor Appointments Error:', error);
    res.status(500).json({
      message: 'Server error fetching doctor appointments',
      error: error.message,
      success: false
    });
  }
});
// Contact Email Confirmation Template
function createContactConfirmationTemplate(contactMessage) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(to right, #4CAF50, #45a049);
        color: white;
        text-align: center;
        padding: 20px;
        border-radius: 10px 10px 0 0;
      }
      .content {
        padding: 20px;
      }
      .contact-details {
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 15px;
        margin: 20px 0;
      }
      .cta-button {
        display: block;
        width: 200px;
        margin: 20px auto;
        padding: 12px;
        background: linear-gradient(to right, #4CAF50, #45a049);
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Contact Form Submission Received</h1>
      </div>
      <div class="content">
        <h2>Hello ${contactMessage.name},</h2>
        
        <p>Thank you for reaching out to HEALIS Healthcare. We have received your message and will get back to you soon.</p>
        
        <div class="contact-details">
          <h3>Submission Details</h3>
          <p><strong>Name:</strong> ${contactMessage.name}</p>
          <p><strong>Email:</strong> ${contactMessage.email}</p>
          <p><strong>Phone:</strong> ${contactMessage.phoneNumber}</p>
          <p><strong>Message:</strong> ${contactMessage.message}</p>
          <p><strong>Submission ID:</strong> ${contactMessage._id}</p>
        </div>
        
        <p>Our support team will review your message and respond within 1-2 business days.</p>
        
        <a href="http://localhost:5173/contact" class="cta-button">View Submission</a>
        
        <p>If you have any urgent concerns, please contact our support hotline.</p>
        
        <p>Best regards,<br>The HEALIS Support Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Contact Form Submission API Route
// Contact Form Submission API Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;

    // Create new contact submission
    const contactSubmission = new Contact({
      name,
      email,
      phoneNumber,
      message
    });

    // Save to database
    await contactSubmission.save();

    // Send confirmation email to user
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: email,
      subject: 'Contact Form Submission Confirmation',
      html: createContactConfirmationTemplate(contactSubmission)
    });

    res.status(201).json({
      message: 'Contact form submitted successfully',
      success: true,
      submissionId: contactSubmission._id
    });

  } catch (error) {
    console.error('Contact Form Submission Error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Invalid form data',
        errors: Object.values(error.errors).map(err => err.message),
        success: false
      });
    }

    res.status(500).json({
      message: 'Error submitting contact form',
      success: false
    });
  }
});

// Get Contact Submissions (Admin Route)
/*app.get('/api/contact/submissions', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = status ? { status } : {};

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const submissions = await Contact.paginate(query, options);

    res.status(200).json({
      message: 'Contact submissions retrieved',
      success: true,
      ...submissions
    });

  } catch (error) {
    console.error('Retrieve Contact Submissions Error:', error);
    res.status(500).json({
      message: 'Error retrieving contact submissions',
      success: false
    });
  }
});

// Update Contact Submission Status (Admin Route)
app.patch('/api/contact/submissions/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo } = req.body;

    const updatedSubmission = await Contact.findByIdAndUpdate(
      id, 
      { status, assignedTo }, 
      { new: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({
        message: 'Contact submission not found',
        success: false
      });
    }

    res.status(200).json({
      message: 'Contact submission updated',
      success: true,
      submission: updatedSubmission
    });

  } catch (error) {
    console.error('Update Contact Submission Error:', error);
    res.status(500).json({
      message: 'Error updating contact submission',
      success: false
    });
  }
});*/
const otpStore = new Map()
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with 5-minute expiry
    otpStore.set(email, {
      otp,
      expiry: Date.now() + 5 * 60 * 1000 // 5 minutes
    });
    
    // Send OTP email
    await transporter.sendMail({
      from: '"HEALIS Healthcare" <care.healis@gmail.com>',
      to: email,
      subject: 'Verify Patient Access',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Patient Record Access Verification</h2>
          <p>A doctor has requested to view your medical records. Use the following code to verify access:</p>
          <h1 style="color: #2563eb; font-size: 32px;">${otp}</h1>
          <p>This code will expire in 5 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `
    });
    
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP endpoint
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  
  const storedData = otpStore.get(email);
  
  if (!storedData) {
    return res.status(400).json({ message: 'No OTP found for this email' });
  }
  
  if (Date.now() > storedData.expiry) {
    otpStore.delete(email);
    return res.status(400).json({ message: 'OTP has expired' });
  }
  
  if (storedData.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
  
  // Clear OTP after successful verification
  otpStore.delete(email);
  
  res.json({ message: 'OTP verified successfully' });
});
const medicalRecordSchema = new mongoose.Schema({
  recordType: {
    type: String,
    required: true,
    enum: ['prescription', 'lab-report', 'imaging', 'vaccination']
  },
  dateOfRecord: {
    type: Date,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = `${Date.now()}${fileExt}`;
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and PDF files are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

app.post('/digilocker/form', upload.single('file'), async (req, res) => {
  try {
    const { recordType, dateOfRecord, doctorName } = req.body;
    
    // Validate required fields
    if (!recordType || !dateOfRecord || !doctorName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File is required'
      });
    }

    // Create file URL using the static path
    const fileUrl = `/uploads/${req.file.filename}`;

    // Create new medical record without userId requirement
    const medicalRecord = new MedicalRecord({
      recordType,
      dateOfRecord: new Date(dateOfRecord),
      doctorName,
      fileName: req.file.originalname,
      fileUrl: fileUrl,
      fileType: req.file.mimetype,
      fileSize: req.file.size
      // userId is now optional
    });

    await medicalRecord.save();

    res.status(201).json({
      success: true,
      data: medicalRecord,
      message: 'Medical record saved successfully'
    });

  } catch (error) {
    console.error('Error saving medical record:', error);
    
    // Remove uploaded file if database save fails
    if (req.file) {
      const filePath = path.join(uploadDir, req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error saving medical record',
      error: error.message,
      details: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : null
    });
  }
});

// GET route to fetch medical records
app.get('/digilocker/records', async (req, res) => {
  try {
    const { recordType, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * parseInt(limit);

    // Build query
    const query = {};
    if (recordType) {
      query.recordType = recordType;
    }

    // Get total count for pagination
    const total = await MedicalRecord.countDocuments(query);

    // Get paginated records
    const records = await MedicalRecord
      .find(query)
      .sort({ uploadDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        records,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });

  } catch (error) {
    console.error('Error fetching medical records:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching medical records',
      error: error.message
    });
  }
});

// DELETE route to remove a medical record
app.delete('/digilocker/records/:id', async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found'
      });
    }

    // Delete file from uploads directory
    const filePath = path.join(uploadDir, path.basename(record.filePath));
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    // Delete record from database
    await MedicalRecord.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Record deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting record',
      error: error.message
    });
  }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..' , 'index.html'))
})
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})