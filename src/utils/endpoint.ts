export const apiEndpoint = {
  prefix: "/api",
  userRegister: "/auth/user/register",
  userLogin: "/auth/user/login",
  employerRegister: "/auth/employer/register",
  employerLogin: "/auth/employer/login",
  authMe: "/auth/me",
  authLogout: "/auth/logout",
  adminLogin: "/admin/login",
  adminLogout: "/admin/logout",
  adminMe: "/admin/me",
  adminUsers: "/admin/users",
  adminUserById: "/admin/users/:id",
  adminUserStatus: "/admin/users/:id/status",
  adminEmployers: "/admin/employers",
  adminEmployerById: "/admin/employers/:id",
  adminEmployerStatus: "/admin/employers/:id/status",
  adminJobListings: "/admin/job-listings",
  adminJobListingById: "/admin/job-listings/:id",
  adminJobListingStatus: "/admin/job-listings/:id/status",
  adminApplications: "/admin/applications",
  adminApplicationById: "/admin/applications/:id",
  adminApplicationStatus: "/admin/applications/:id/status",
  adminDashboardStats: "/admin/dashboard/stats",
  adminDashboardRecentJobs: "/admin/dashboard/recent-jobs",
  adminDashboardRecentApplications: "/admin/dashboard/recent-applications",
};

export const appRoutes = {
  home: "/",
  adminLogin: "/admin/login",
  adminDashboard: "/admin/dashboard",
  adminUsers: "/admin/users",
  adminEmployers: "/admin/employers",
  adminJobListings: "/admin/job-listings",
  adminApplications: "/admin/applications",
  userLogin: "/user/login",
  userRegister: "/user/register",
  userDashboard: "/user/dashboard",
  employerLogin: "/employer/login",
  employerRegister: "/employer/register",
  employerDashboard: "/employer/dashboard",
};

export function replacePathParams(
  path: string,
  params: Record<string, string>,
): string {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, encodeURIComponent(value)),
    path,
  );
}
