"use client";

import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import type { AdminJobSeeker } from "@/types/job-seeker";

export default function AdminJobSeekerDetailContainer({ jobSeeker }: { jobSeeker: AdminJobSeeker }) {
  return (
    <div>
      <AdminPageHeader
        title={jobSeeker.name}
        subtitle={jobSeeker.email}
        action={
          <AdminHeaderActionButton href={`/admin/job-seekers/${jobSeeker.id}/edit`}>
            Edit Job Seeker
          </AdminHeaderActionButton>
        }
      />
      <dl className="grid max-w-3xl grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-background p-4 shadow-sm sm:grid-cols-2 sm:p-6">
        <div>
          <dt className="text-sm text-gray-116">Status</dt>
          <dd className="mt-1">
            <StatusBadge status={jobSeeker.isActive ? "active" : "inactive"} />
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-116">Created</dt>
          <dd className="font-medium">{jobSeeker.createdAt || "—"}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm text-gray-116">Updated</dt>
          <dd className="font-medium">{jobSeeker.updatedAt || "—"}</dd>
        </div>
      </dl>
      {jobSeeker.profile && (
        <dl className="mt-5 grid max-w-3xl grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-background p-4 shadow-sm sm:grid-cols-2 sm:p-6">
          <div>
            <dt className="text-sm text-gray-116">Headline</dt>
            <dd className="font-medium">{jobSeeker.profile.headline}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-116">Location</dt>
            <dd className="font-medium">{jobSeeker.profile.location}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-116">Phone</dt>
            <dd className="font-medium">{jobSeeker.profile.phone || "—"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-116">Date of Birth</dt>
            <dd className="font-medium">{jobSeeker.profile.dateOfBirth}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-116">Gender</dt>
            <dd className="font-medium">{jobSeeker.profile.gender}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-gray-116">Bio</dt>
            <dd className="whitespace-pre-wrap font-medium">{jobSeeker.profile.bio || "—"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-116">LinkedIn</dt>
            <dd className="break-all font-medium">
              <a href={jobSeeker.profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {jobSeeker.profile.linkedinUrl}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-116">GitHub</dt>
            <dd className="break-all font-medium">
              <a href={jobSeeker.profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {jobSeeker.profile.githubUrl}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-116">Website / Portfolio</dt>
            <dd className="break-all font-medium">
              {jobSeeker.profile.websiteUrl ? (
                <a href={jobSeeker.profile.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {jobSeeker.profile.websiteUrl}
                </a>
              ) : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-116">Resume</dt>
            <dd className="break-all font-medium">{jobSeeker.profile.resumePath || "—"}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}
