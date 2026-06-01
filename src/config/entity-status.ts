export const entityStatusConfig: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  active: {
    label: "Active",
    bg: "bg-green-20",
    text: "text-green-8",
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
    bg: "bg-yellow-20",
    text: "text-yellow-60",
  },
  reviewed: {
    label: "Reviewed",
    bg: "bg-sky-blue-40",
    text: "text-dark-blue-3",
  },
  shortlisted: {
    label: "Shortlisted",
    bg: "bg-light-purple",
    text: "text-purple-20",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-10",
    text: "text-red-20",
  },
  hired: {
    label: "Hired",
    bg: "bg-green-20",
    text: "text-green-8",
  },
};
