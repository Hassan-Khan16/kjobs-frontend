import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .trim(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const userRegisterSchema = z
  .object({
    name: z.string().trim().min(1, "Full name is required").max(255),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address")
      .trim(),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserRegisterFormData = z.infer<typeof userRegisterSchema>;

export const employerRegisterSchema = z
  .object({
    companyName: z.string().trim().min(1, "Company name is required").max(255),
    email: z
      .string()
      .min(1, "Company email is required")
      .email("Invalid email address")
      .trim(),
    contactName: z
      .string()
      .trim()
      .min(1, "Contact person name is required")
      .max(255),
    phone: z.string().trim().max(50).optional().or(z.literal("")),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type EmployerRegisterFormData = z.infer<typeof employerRegisterSchema>;

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .trim(),
  password: passwordSchema,
  role: z.string().min(1, "Role is required"),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .trim(),
  role: z.string().min(1, "Role is required"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || passwordSchema.safeParse(val).success, {
      message: "Password must be at least 8 characters",
    }),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
