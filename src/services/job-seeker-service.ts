import { get, patch, post, put } from "@/fetch/fetch";
import { emptyPaginated, mapPagination } from "@/helper/pagination";
import { apiEndpoint, replacePathParams } from "@/utils/endpoint";
import type { KjobsPaginatedPayload } from "@/types/pagination";
import type {
  AdminJobSeeker,
  AdminJobSeekerListItem,
  JobSeekerListResponse,
  JobSeekerPayload,
  JobSeekerStatus,
  UpdateJobSeekerPasswordPayload,
} from "@/types/job-seeker";

type ApiJobSeeker = {
  id: string | number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  job_seeker: {
    id: string | number;
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
  } | null;
};

function buildQuery(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): string {
  const query = new URLSearchParams();
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 10));
  if (params.search?.trim()) query.set("search", params.search.trim());
  if (params.status && params.status !== "all") query.set("status", params.status);
  return query.toString();
}

function mapJobSeeker(raw: ApiJobSeeker): AdminJobSeeker {
  return {
    id: String(raw.id),
    name: raw.name,
    email: raw.email,
    isActive: raw.is_active,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    profile: raw.job_seeker
      ? {
          id: String(raw.job_seeker.id),
          phone: raw.job_seeker.phone,
          profilePhoto: raw.job_seeker.profile_photo,
          headline: raw.job_seeker.headline,
          bio: raw.job_seeker.bio,
          location: raw.job_seeker.location,
          dateOfBirth: raw.job_seeker.date_of_birth,
          gender: raw.job_seeker.gender,
          resumePath: raw.job_seeker.resume_path,
          linkedinUrl: raw.job_seeker.linkedin_url,
          githubUrl: raw.job_seeker.github_url,
          websiteUrl: raw.job_seeker.website_url,
        }
      : null,
  };
}

function toListItem(jobSeeker: AdminJobSeeker): AdminJobSeekerListItem {
  return {
    id: jobSeeker.id,
    name: jobSeeker.name,
    email: jobSeeker.email,
    headline: jobSeeker.profile?.headline ?? "—",
    location: jobSeeker.profile?.location ?? "—",
    status: jobSeeker.isActive ? "active" : "inactive",
    createdAt: jobSeeker.createdAt,
  };
}

export async function getJobSeekers(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<JobSeekerListResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const res = await get<KjobsPaginatedPayload<ApiJobSeeker>>(
    `${apiEndpoint.adminJobSeekers}?${buildQuery(params)}`,
  );

  if (!res.success) {
    return {
      success: false,
      message: res.message,
      data: emptyPaginated(page, limit),
    };
  }

  return {
    success: true,
    message: res.message,
    data: {
      items: res.data.items.map((item) => toListItem(mapJobSeeker(item))),
      meta: mapPagination(res.data.pagination),
    },
  };
}

export async function getJobSeeker(id: string) {
  const endpoint = replacePathParams(apiEndpoint.adminJobSeekerById, { id });
  const res = await get<ApiJobSeeker>(endpoint);
  if (!res.success) return res;
  return { ...res, data: mapJobSeeker(res.data) };
}

export async function createJobSeeker(payload: JobSeekerPayload) {
  return post<ApiJobSeeker, JobSeekerPayload>(apiEndpoint.adminJobSeekers, payload);
}

export async function updateJobSeeker(id: string, payload: JobSeekerPayload) {
  const endpoint = replacePathParams(apiEndpoint.adminJobSeekerById, { id });
  return put<ApiJobSeeker, JobSeekerPayload>(endpoint, payload);
}

export async function updateJobSeekerPassword(
  id: string,
  payload: UpdateJobSeekerPasswordPayload,
) {
  const endpoint = replacePathParams(apiEndpoint.adminJobSeekerPassword, { id });
  return patch<UpdateJobSeekerPasswordPayload, null>(endpoint, payload);
}

export async function patchJobSeekerStatus(id: string, status: JobSeekerStatus) {
  const endpoint = replacePathParams(apiEndpoint.adminJobSeekerStatus, { id });
  return patch<{ is_active: boolean }, ApiJobSeeker>(endpoint, {
    is_active: status === "active",
  });
}
