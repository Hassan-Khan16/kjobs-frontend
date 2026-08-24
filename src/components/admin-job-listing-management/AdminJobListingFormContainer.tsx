"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { adminHeaderActionButtonClassName } from "@/components/admin-page-header/AdminHeaderActionButton";
import { cn } from "@/lib/utils";
import {
  createJobListingSchema,
  type CreateJobListingFormData,
} from "@/schemas/job-listing";
import {
  createJobListing,
  updateJobListing,
} from "@/services/job-listing-service";
import { handleOpenToast } from "@/helper/toast";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";
import type { AdminJobListing } from "@/types/job-listing";

type Props = { mode: "create" | "edit"; initial?: AdminJobListing };

export default function AdminJobListingFormContainer({ mode, initial }: Props) {
  const router = useRouter();
  const isEdit = mode === "edit";
  const form = useForm<CreateJobListingFormData>({
    resolver: zodResolver(createJobListingSchema),
    defaultValues: {
      title: initial?.title ?? "",
      employerId: "",
      location: initial?.location ?? "",
      type: initial?.type ?? "",
      description: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: CreateJobListingFormData) => {
    if (isEdit && initial) {
      const res = await updateJobListing(initial.id, data);
      if (!res.success) {
        handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
        return;
      }
      router.push(`/admin/job-listings/${initial.id}`);
      return;
    }
    const res = await createJobListing(data);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    handleOpenToast("Job created", "success");
    router.push("/admin/job-listings");
  };

  return (
    <div>
      <AdminPageHeader
        title={isEdit ? "Edit Job" : "Create Job"}
        subtitle="Job listing details"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-xl space-y-4 rounded-[10px] border border-gray-105 bg-background p-6"
      >
        {(
          [
            ["title", "Title"],
            ["employerId", "Employer ID"],
            ["location", "Location"],
            ["type", "Type"],
          ] as const
        ).map(([name, label]) => (
          <div key={name} className="space-y-1">
            <Label required>{label}</Label>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!errors[name]}
                  errorMessage={errors[name]?.message}
                />
              )}
            />
          </div>
        ))}
        <div className="space-y-1">
          <Label required>Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                rows={5}
                className={errors.description ? "border-red-500" : ""}
              />
            )}
          />
        </div>
        <div className="flex gap-3">
          <Button
            type="submit"
            loading={isSubmitting}
            size="sm"
            className={cn(adminHeaderActionButtonClassName, "w-auto")}
          >
            {isEdit ? "Save Changes" : "Create Job"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
