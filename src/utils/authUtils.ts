
import { z } from "zod";

// Schema for login form
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Schema for registration with company email validation
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email")
    .refine(email => {
      const consumerDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
      const domain = email.split('@')[1];
      return !consumerDomains.includes(domain);
    }, "Please use your company email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  phoneNumber: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Mock database for demo purposes
export const MOCK_USERS: { email: string; name: string; passwordHash: string; phoneNumber?: string }[] = [];

// Simple mock function to hash a password
export const hashPassword = (password: string) => {
  return `${password}-hashed`;
};

// Mock function to verify a password
export const verifyPassword = (password: string, hash: string) => {
  return hash === hashPassword(password);
};
