const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyparser = require('body-parser')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const crypto = require('crypto')
const otpStorage = new Map()
const User = require('./models/SchemaRegister')
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

        // Create new user
        const newUser = new User({
            fullName,
            phoneNumber,
            dateOfBirth,
            gender,
            email,
            password
        });

        // Save user to database
        await newUser.save();
        sendWelcomeEmail(email,fullName)
        res.status(201).json({
            message: 'User registered successfully',
            userId: newUser._id
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
app.get('/auth/:userId', async (req, res) => {
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
app.post('/lab-tests/book', async (req, res) => {
  try {
    const { 
      userId, 
      tests, 
      date, 
      time,
      totalAmount
    } = req.body;

    // Fetch user details to automatically include in the lab test booking
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Create new lab test booking
    const newLabTest = new LabTest({
      patient: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email
      },
      tests,
      bookingDate: new Date(date),
      bookingTime: time,
      totalAmount
    });

    // Save lab test booking
    await newLabTest.save();

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

// Get User's Lab Tests Route
app.get('/lab-tests/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all lab tests for the user
    const labTests = await LabTest.find({ 'patient.userId': userId })
      .sort({ bookingDate: -1 }); // Sort by date descending

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

    // Find and update the lab test booking
    const updatedLabTest = await LabTest.findByIdAndUpdate(
      labTestId, 
      { status: 'Cancelled' }, 
      { new: true } // Return the updated document
    );

    // Check if lab test booking exists
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


// Add these routes to your server.js file

// Book Vaccination Route
app.post('/vaccinations/book', async (req, res) => {
  try {
    const { 
      userId, 
      vaccineId, 
      vaccineName, 
      location, 
      appointmentDate, 
      appointmentTime,
      manufacturer,
      price
    } = req.body;

    // Fetch user details to automatically include in the vaccination booking
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Create new vaccination booking
    const newVaccination = new Vaccination({
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
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      price
    });

    // Save vaccination booking
    await newVaccination.save();

    res.status(201).json({
      message: 'Vaccination booked successfully',
      vaccinationId: newVaccination._id
    });

  } catch (error) {
    console.error('Vaccination Booking Error:', error);
    res.status(500).json({
      message: 'Server error during vaccination booking',
      error: error.message
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
    const { 
      userId, 
      items,
      totalAmount
    } = req.body;

    // Fetch user details to automatically include in the pharmacy order
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
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
      totalAmount
    });

    // Save pharmacy order
    await newPharmacyOrder.save();

    res.status(201).json({
      message: 'Pharmacy order placed successfully',
      orderId: newPharmacyOrder._id
    });

  } catch (error) {
    console.error('Pharmacy Order Error:', error);
    res.status(500).json({
      message: 'Server error during pharmacy order',
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
      therapistId, 
      therapistName, 
      therapistSpecialty, 
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

    // Create new mental health appointment
    const newMentalHealthAppointment = new MentalHealth({
      patient: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email
      },
      therapist: {
        id: therapistId,
        name: therapistName,
        specialty: therapistSpecialty
      },
      appointmentDate,
      appointmentTime
    });

    // Save appointment
    await newMentalHealthAppointment.save();

    res.status(201).json({
      message: 'Mental Health Appointment booked successfully',
      appointmentId: newMentalHealthAppointment._id
    });

  } catch (error) {
    console.error('Mental Health Appointment Booking Error:', error);
    res.status(500).json({
      message: 'Server error during mental health appointment booking',
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
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..' , 'index.html'))
})
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})