import { z } from "zod";

const optionalText = z.string().max(255).optional();

export const jobSeekerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  email: z.string().trim().min(1, "Email is required").email("Invalid email address").max(255),
  phone: optionalText,
  profilePhoto: optionalText,
  headline: z.string().trim().min(1, "Headline is required").max(255),
  bio: z.string().optional(),
  location: z.string().trim().min(1, "Location is required").max(255),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().trim().min(1, "Gender is required").max(255),
  resumePath: optionalText,
  linkedinUrl: z.string().trim().min(1, "LinkedIn URL is required").max(255),
  githubUrl: z.string().trim().min(1, "GitHub URL is required").max(255),
  websiteUrl: optionalText,
});

const passwordSchema = z.string().min(8, "Password must be at least 8 characters");

export const jobSeekerPasswordSchema = z
  .object({
    password: passwordSchema,
    password_confirmation: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type JobSeekerFormData = z.infer<typeof jobSeekerSchema>;
export type JobSeekerPasswordFormData = z.infer<typeof jobSeekerPasswordSchema>;