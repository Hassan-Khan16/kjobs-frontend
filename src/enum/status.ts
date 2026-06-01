export const entityStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export const jobListingStatus = {
  OPEN: "open",
  CLOSED: "closed",
} as const;

export const applicationStatus = {
  PENDING: "pending",
  REVIEWED: "reviewed",
  SHORTLISTED: "shortlisted",
  REJECTED: "rejected",
  HIRED: "hired",
} as const;
