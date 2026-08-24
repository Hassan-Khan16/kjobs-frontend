import type { PaginatedResult } from "./pagination";

export type JobListingStatus = "open" | "closed";

export interface AdminJobListing {
  id: string;
  title: string;
  employerName: string;
  location: string;
  type: string;
  status: JobListingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AdminJobListingListItem {
  id: string;
  title: string;
  employerName: string;
  location: string;
  status: JobListingStatus;
  createdAt: string;
}

export interface CreateJobListingPayload {
  title: string;
  employerId: string;
  location: string;
  type: string;
  description: string;
}

export type UpdateJobListingPayload = CreateJobListingPayload;

export type JobListingListResponse = {
  success: boolean;
  message: string;
  data: PaginatedResult<AdminJobListingListItem>;
};
