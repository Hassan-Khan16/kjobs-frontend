import { delay, readStore, writeStore } from "@/helper/local-store";
import type {
  ApplicationUiStatus,
  EmployerJobPayload,
  EmployerPortalJob,
} from "@/types/public-job";

export type { EmployerJobPayload };

const JOBS_KEY = "kjobs.employer-jobs";
const APPS_KEY = "kjobs.employer-applications";

export type EmployerApplication = {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  location: string;
  experience: string;
  status: ApplicationUiStatus;
  appliedAt: string;
  summary: string;
};

const seedJobs: EmployerPortalJob[] = [
  {
    id: "emp-1",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140K – $180K",
    status: "open",
    applicants: 24,
    postedAt: "2026-09-29T10:00:00.000Z",
    description: "Lead frontend delivery for a high-traffic product surface.",
    experienceLevel: "Senior",
  },
  {
    id: "emp-2",
    title: "Product Manager",
    location: "Remote",
    type: "Full-time",
    salary: "$125K – $160K",
    status: "open",
    applicants: 38,
    postedAt: "2026-09-25T10:00:00.000Z",
    description: "Own discovery and delivery for a core hiring workflow.",
    experienceLevel: "Mid",
  },
  {
    id: "emp-3",
    title: "UX Designer",
    location: "New York, NY",
    type: "Hybrid",
    salary: "$110K – $145K",
    status: "closed",
    applicants: 15,
    postedAt: "2026-09-20T10:00:00.000Z",
    description: "Design end-to-end application experiences.",
    experienceLevel: "Mid",
  },
  {
    id: "emp-4",
    title: "Data Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$130K – $160K",
    status: "draft",
    applicants: 0,
    postedAt: "2026-10-05T10:00:00.000Z",
    description: "Build and maintain data pipelines for analytics.",
    experienceLevel: "Mid",
  },
];

const seedApplications: EmployerApplication[] = [
  {
    id: "eapp-1",
    jobId: "emp-1",
    jobTitle: "Senior Frontend Developer",
    applicantName: "Sarah Chen",
    applicantEmail: "sarah.chen@example.com",
    location: "San Francisco, CA",
    experience: "6 years",
    status: "shortlisted",
    appliedAt: "2026-09-30T10:00:00.000Z",
    summary: "Frontend engineer with design-system and React experience.",
  },
  {
    id: "eapp-2",
    jobId: "emp-1",
    jobTitle: "Senior Frontend Developer",
    applicantName: "Daniel Ortiz",
    applicantEmail: "daniel.ortiz@example.com",
    location: "Austin, TX",
    experience: "8 years",
    status: "applied",
    appliedAt: "2026-10-01T10:00:00.000Z",
    summary: "Led a frontend platform team at a mid-size SaaS company.",
  },
  {
    id: "eapp-3",
    jobId: "emp-2",
    jobTitle: "Product Manager",
    applicantName: "Priya Nair",
    applicantEmail: "priya.nair@example.com",
    location: "Remote",
    experience: "7 years",
    status: "reviewing",
    appliedAt: "2026-09-27T10:00:00.000Z",
    summary: "Product lead focused on hiring and marketplace workflows.",
  },
  {
    id: "eapp-4",
    jobId: "emp-3",
    jobTitle: "UX Designer",
    applicantName: "Marcus Reid",
    applicantEmail: "marcus.reid@example.com",
    location: "New York, NY",
    experience: "5 years",
    status: "rejected",
    appliedAt: "2026-09-22T10:00:00.000Z",
    summary: "Product designer with research and systems experience.",
  },
];

function jobsKey(userId?: string) {
  return userId ? `${JOBS_KEY}.${userId}` : JOBS_KEY;
}

function appsKey(userId?: string) {
  return userId ? `${APPS_KEY}.${userId}` : APPS_KEY;
}

function ensureJobs(userId?: string): EmployerPortalJob[] {
  const existing = readStore<EmployerPortalJob[] | null>(jobsKey(userId), null);
  if (existing) return existing;
  writeStore(jobsKey(userId), seedJobs);
  return seedJobs;
}

function ensureApps(userId?: string): EmployerApplication[] {
  const existing = readStore<EmployerApplication[] | null>(appsKey(userId), null);
  if (existing) return existing;
  writeStore(appsKey(userId), seedApplications);
  return seedApplications;
}

export async function listEmployerJobs(userId?: string): Promise<EmployerPortalJob[]> {
  await delay();
  return ensureJobs(userId);
}

export async function getEmployerJob(
  id: string,
  userId?: string,
): Promise<EmployerPortalJob | null> {
  const jobs = await listEmployerJobs(userId);
  return jobs.find((job) => job.id === id) ?? null;
}

export async function createEmployerJob(
  payload: EmployerJobPayload,
  userId?: string,
): Promise<EmployerPortalJob> {
  const jobs = ensureJobs(userId);
  const job: EmployerPortalJob = {
    id: `emp-${Date.now()}`,
    ...payload,
    status: "draft",
    applicants: 0,
    postedAt: new Date().toISOString(),
  };
  writeStore(jobsKey(userId), [job, ...jobs]);
  await delay();
  return job;
}

export async function updateEmployerJob(
  id: string,
  payload: EmployerJobPayload,
  userId?: string,
): Promise<EmployerPortalJob | null> {
  const jobs = ensureJobs(userId);
  const next = jobs.map((job) => (job.id === id ? { ...job, ...payload } : job));
  writeStore(jobsKey(userId), next);
  await delay();
  return next.find((job) => job.id === id) ?? null;
}

export async function listEmployerApplications(
  userId?: string,
  jobId?: string,
): Promise<EmployerApplication[]> {
  await delay();
  const apps = ensureApps(userId);
  return jobId ? apps.filter((app) => app.jobId === jobId) : apps;
}

export async function getEmployerApplication(
  id: string,
  userId?: string,
): Promise<EmployerApplication | null> {
  const apps = await listEmployerApplications(userId);
  return apps.find((app) => app.id === id) ?? null;
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationUiStatus,
  userId?: string,
): Promise<EmployerApplication | null> {
  const apps = ensureApps(userId);
  const next = apps.map((app) => (app.id === id ? { ...app, status } : app));
  writeStore(appsKey(userId), next);
  await delay();
  return next.find((app) => app.id === id) ?? null;
}
