export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Hybrid"
  | "Remote";

export type ApplicationUiStatus =
  | "applied"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "hired";

export type PublicJob = {
  id: string;
  title: string;
  company: string;
  companyId: string;
  location: string;
  type: JobType;
  salary: string;
  posted: string;
  postedAt: string;
  category: string;
  experienceLevel: string;
  initials: string;
  color: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  companyDesc: string;
  companySize: string;
  companyIndustry: string;
};

export type PublicEmployer = {
  id: string;
  name: string;
  industry: string;
  location: string;
  openJobs: number;
  initials: string;
  color: string;
  description: string;
  size: string;
};

export type PublicJobFilters = {
  q?: string;
  location?: string;
  category?: string;
  type?: string;
  page?: number;
  limit?: number;
};

export type UserApplication = {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  status: ApplicationUiStatus;
  appliedAt: string;
  coverLetter?: string;
  resumeName?: string;
};

export type EmployerJobPayload = {
  title: string;
  location: string;
  type: JobType;
  salary: string;
  description: string;
  experienceLevel: string;
};

export type EmployerPortalJob = EmployerJobPayload & {
  id: string;
  status: "draft" | "open" | "closed";
  applicants: number;
  postedAt: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  userType?: string;
  subject?: string;
  message: string;
};
