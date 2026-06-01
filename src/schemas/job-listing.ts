import { z } from "zod";

export const createJobListingSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  employerId: z.string().min(1, "Employer is required"),
  location: z.string().trim().min(1, "Location is required"),
  type: z.string().trim().min(1, "Job type is required"),
  description: z.string().trim().min(1, "Description is required"),
});

export const updateJobListingSchema = createJobListingSchema;

export type CreateJobListingFormData = z.infer<typeof createJobListingSchema>;
export type UpdateJobListingFormData = z.infer<typeof updateJobListingSchema>;
