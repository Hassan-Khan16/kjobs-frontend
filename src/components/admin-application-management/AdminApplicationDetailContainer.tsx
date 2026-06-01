"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { patchApplicationStatus } from "@/services/application-service";
import type { AdminApplication, ApplicationStatus } from "@/types/application";
import { applicationStatus } from "@/enum/status";
import { handleOpenToast } from "@/helper/toast";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";

export default function AdminApplicationDetailContainer({
  application: initial,
}: {
  application: AdminApplication;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<ApplicationStatus>(initial.status);
  const [loading, setLoading] = useState(false);

  const saveStatus = async () => {
    setLoading(true);
    const res = await patchApplicationStatus(initial.id, status);
    setLoading(false);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    handleOpenToast("Application status updated", "success");
    router.refresh();
  };

  return (
    <div>
      <AdminPageHeader
        title={initial.applicantName}
        subtitle={initial.jobTitle}
      />
      <dl className="mt-6 grid gap-4 max-w-xl rounded-[10px] border border-gray-105 bg-background p-6">
        <div>
          <dt className="text-sm text-gray-116">Email</dt>
          <dd>{initial.applicantEmail}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-116">Employer</dt>
          <dd>{initial.employerName}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-116">Current status</dt>
          <dd className="mt-1">
            <StatusBadge status={initial.status} />
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-116 mb-2">Update status</dt>
          <dd className="flex flex-wrap gap-3 items-center">
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as ApplicationStatus)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(applicationStatus).map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="gradientCurved"
              loading={loading}
              onClick={saveStatus}
            >
              Save
            </Button>
          </dd>
        </div>
      </dl>
    </div>
  );
}
