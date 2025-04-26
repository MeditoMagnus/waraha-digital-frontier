
import { z } from "zod";

// Login schema for form validation
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

// Updated registration schema with conditional email validation
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  phoneNumber: z.string().optional(),
  designation: z.string().optional(),
  isStudent: z.boolean()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.isStudent) {
    // Allow Gmail or educational institution emails for students
    const emailDomain = data.email.split('@')[1];
    return emailDomain === 'gmail.com' || emailDomain.endsWith('.edu');
  } else {
    // For non-students, require company email (exclude common public email domains)
    const consumerDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
    const domain = data.email.split('@')[1];
    return !consumerDomains.includes(domain);
  }
}, {
  message: (data) => data.isStudent 
    ? "Please use your Gmail or university email address (.edu domain)"
    : "Please use your company email address",
  path: ["email"]
});

