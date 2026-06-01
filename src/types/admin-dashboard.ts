export interface AdminDashboardStats {
  totalUsers: number;
  totalEmployers: number;
  totalJobs: number;
  totalApplications: number;
}

export interface DashboardRecentJob {
  id: string;
  title: string;
  employerName: string;
  status: string;
  createdAt: string;
}

export interface DashboardRecentApplication {
  id: string;
  applicantName: string;
  jobTitle: string;
  status: string;
  appliedAt: string;
}
