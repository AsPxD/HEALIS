import { z } from 'zod';

export const appointmentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  doctor: z.string().min(3, 'Doctor name must be at least 3 characters'),
  date: z.date(),
  time: z.string(),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  notes: z.string().optional()
});

export const medicationSchema = z.object({
  name: z.string().min(3, 'Medication name must be at least 3 characters'),
  dosage: z.string().min(1, 'Dosage is required'),
  frequency: z.string(),
  times: z.array(z.string()),
  startDate: z.date(),
  endDate: z.date().optional(),
  instructions: z.string().optional()
});

export const userProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  dateOfBirth: z.date(),
  gender: z.enum(['male', 'female', 'other']),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  allergies: z.array(z.string()).optional(),
  chronicConditions: z.array(z.string()).optional()
});

export const donationSchema = z.object({
  amount: z.number().min(100, 'Minimum donation amount is ₹100'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  anonymous: z.boolean(),
  paymentMethod: z.enum(['card', 'upi', 'crypto'])
});