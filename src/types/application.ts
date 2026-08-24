import type { PaginatedResult } from "./pagination";

export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "shortlisted"
  | "rejected"
  | "hired";

export interface AdminApplication {
  id: string;
  applicantName: string;
  applicantEmail: string;
  jobTitle: string;
  employerName: string;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
}

export interface AdminApplicationListItem {
  id: string;
  applicantName: string;
  jobTitle: string;
  employerName: string;
  status: ApplicationStatus;
  appliedAt: string;
}

export type ApplicationListResponse = {
  success: boolean;
  message: string;
  data: PaginatedResult<AdminApplicationListItem>;
};
