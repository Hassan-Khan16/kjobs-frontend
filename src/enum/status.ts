export const entityStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export const jobListingStatus = {
  DRAFT: "draft",
  OPEN: "open",
  CLOSED: "closed",
} as const;

export const applicationStatus = {
  APPLIED: "applied",
  REVIEWING: "reviewing",
  SHORTLISTED: "shortlisted",
  REJECTED: "rejected",
  HIRED: "hired",
} as const;
