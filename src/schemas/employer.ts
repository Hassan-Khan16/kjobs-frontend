import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const createEmployerSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  contactName: z.string().trim().min(1, "Contact name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .trim(),
  phone: z.string().optional(),
  password: passwordSchema,
});

export const updateEmployerSchema = createEmployerSchema
  .omit({ password: true })
  .extend({
    password: z
      .string()
      .optional()
      .refine((val) => !val || passwordSchema.safeParse(val).success, {
        message: "Password must be at least 8 characters",
      }),
  });

export type CreateEmployerFormData = z.infer<typeof createEmployerSchema>;
export type UpdateEmployerFormData = z.infer<typeof updateEmployerSchema>;
