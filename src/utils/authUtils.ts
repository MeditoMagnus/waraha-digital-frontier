import { z } from "zod";
import { countries } from "@/data/countries";

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
  isStudent: z.boolean(),
  country: z.string().min(1, "Please select your country")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).superRefine((data, ctx) => {
  // Validate email domain based on user type
  const emailDomain = data.email.split('@')[1];
  const consumerDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
  
  if (data.isStudent) {
    if (emailDomain !== 'gmail.com' && !emailDomain.endsWith('.edu')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please use your Gmail or university email address (.edu domain)",
        path: ["email"]
      });
    }
  } else {
    if (consumerDomains.includes(emailDomain)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please use your company email address",
        path: ["email"]
      });
    }
  }

  // Format phone number with country code if provided
  if (data.phoneNumber && data.country) {
    const country = countries.find(c => c.code === data.country);
    if (country) {
      data.phoneNumber = `${country.dialCode}${data.phoneNumber.replace(/^0+/, '')}`;
    }
  }
});
