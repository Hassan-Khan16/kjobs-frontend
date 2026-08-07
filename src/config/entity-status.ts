export const entityStatusConfig: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  active: {
    label: "Active",
    bg: "bg-sky-blue-40",
    text: "text-brand-royal",
  },
  inactive: {
    label: "Inactive",
    bg: "bg-gray-102",
    text: "text-dark-gray",
  },
  open: {
    label: "Open",
    bg: "bg-sky-blue-40",
    text: "text-dark-blue-3",
  },
  closed: {
    label: "Closed",
    bg: "bg-gray-102",
    text: "text-dark-gray",
  },
  pending: {
    label: "Pending",
    bg: "bg-sky-blue-20",
    text: "text-dark-blue-5",
  },
  reviewed: {
    label: "Reviewed",
    bg: "bg-sky-blue-40",
    text: "text-dark-blue-3",
  },
  shortlisted: {
    label: "Shortlisted",
    bg: "bg-indigo-10",
    text: "text-indigo-20",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-navy-10",
    text: "text-navy-20",
  },
  hired: {
    label: "Hired",
    bg: "bg-sky-blue-40",
    text: "text-brand-royal",
  },
};
