import type { PaginatedResult } from "./pagination";

export type JobSeekerStatus = "active" | "inactive";

export interface JobSeekerProfile {
  id: string;
  phone: string | null;
  profilePhoto: string | null;
  headline: string;
  bio: string | null;
  location: string;
  dateOfBirth: string;
  gender: string;
  resumePath: string | null;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string | null;
}

export interface AdminJobSeeker {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  profile: JobSeekerProfile | null;
}

export interface AdminJobSeekerListItem {
  id: string;
  name: string;
  email: string;
  headline: string;
  location: string;
  status: JobSeekerStatus;
  createdAt: string;
}

export interface JobSeekerPayload {
  name: string;
  email: string;
  phone: string | null;
  profile_photo: string | null;
  headline: string;
  bio: string | null;
  location: string;
  date_of_birth: string;
  gender: string;
  resume_path: string | null;
  linkedin_url: string;
  github_url: string;
  website_url: string | null;
}

export type UpdateJobSeekerPasswordPayload = {
  password: string;
  password_confirmation: string;
};

export type JobSeekerListResponse = {
  success: boolean;
  message: string;
  data: PaginatedResult<AdminJobSeekerListItem>;
};
