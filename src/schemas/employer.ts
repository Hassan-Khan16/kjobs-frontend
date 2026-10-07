import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const createEmployerSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address")
      .trim(),
    companyName: z.string().trim().min(1, "Company name is required"),
    contactPersonName: z.string().trim().min(1, "Contact person name is required"),
    phone: z.string().optional(),
    companyDescription: z.string().optional(),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    logo: z.string().optional(),
  });

export const updateEmployerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .trim()
    .optional(),
  companyName: z.string().trim().min(1, "Company name is required").optional(),
  contactPersonName: z.string().trim().min(1, "Contact person name is required").optional(),
  phone: z.string().optional(),
  companyDescription: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  logo: z.string().optional(),
});

export const updateEmployerPasswordSchema = z
  .object({
    password: passwordSchema,
    password_confirmation: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type CreateEmployerFormData = z.infer<typeof createEmployerSchema>;
export type UpdateEmployerFormData = z.infer<typeof updateEmployerSchema>;
export type UpdateEmployerPasswordFormData = z.infer<typeof updateEmployerPasswordSchema>;
