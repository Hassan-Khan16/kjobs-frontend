"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { Textarea } from "@/components/ui/textarea";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { adminHeaderActionButtonClassName } from "@/components/admin-page-header/AdminHeaderActionButton";
import { cn } from "@/lib/utils";
import {
  jobSeekerPasswordSchema,
  jobSeekerSchema,
  type JobSeekerFormData,
  type JobSeekerPasswordFormData,
} from "@/schemas/job-seeker";
import {
  createJobSeeker,
  updateJobSeeker,
  updateJobSeekerPassword,
} from "@/services/job-seeker-service";
import { handleOpenToast } from "@/helper/toast";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";
import type {
  AdminJobSeeker,
  JobSeekerPayload,
  UpdateJobSeekerPasswordPayload,
} from "@/types/job-seeker";

type Props = {
  mode: "create" | "edit";
  initial?: AdminJobSeeker;
};

export default function AdminJobSeekerFormContainer({ mode, initial }: Props) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const form = useForm<JobSeekerFormData>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: initial?.name ?? "",
      email: initial?.email ?? "",
      phone: initial?.profile?.phone ?? "",
      profilePhoto: initial?.profile?.profilePhoto ?? "",
      headline: initial?.profile?.headline ?? "",
      bio: initial?.profile?.bio ?? "",
      location: initial?.profile?.location ?? "",
      dateOfBirth: initial?.profile?.dateOfBirth ?? "",
      gender: initial?.profile?.gender ?? "",
      resumePath: initial?.profile?.resumePath ?? "",
      linkedinUrl: initial?.profile?.linkedinUrl ?? "",
      githubUrl: initial?.profile?.githubUrl ?? "",
      websiteUrl: initial?.profile?.websiteUrl ?? "",
    },
  });
  const passwordForm = useForm<JobSeekerPasswordFormData>({
    resolver: zodResolver(jobSeekerPasswordSchema),
    defaultValues: { password: "", password_confirmation: "" },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = passwordForm;

  const onSubmit = async (data: JobSeekerFormData) => {
    const payload: JobSeekerPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      profile_photo: data.profilePhoto || null,
      headline: data.headline,
      bio: data.bio || null,
      location: data.location,
      date_of_birth: data.dateOfBirth,
      gender: data.gender,
      resume_path: data.resumePath || null,
      linkedin_url: data.linkedinUrl,
      github_url: data.githubUrl,
      website_url: data.websiteUrl || null,
    };
    const res = isEdit && initial
      ? await updateJobSeeker(initial.id, payload)
      : await createJobSeeker(payload);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    handleOpenToast(isEdit ? "Job seeker updated" : "Job seeker created", "success");
    router.push(isEdit && initial ? `/admin/job-seekers/${initial.id}` : "/admin/job-seekers");
  };

  const onPasswordSubmit = async (data: JobSeekerPasswordFormData) => {
    if (!initial) return;
    const payload: UpdateJobSeekerPasswordPayload = {
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    const res = await updateJobSeekerPassword(initial.id, payload);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    passwordForm.reset();
    handleOpenToast("Job seeker password updated", "success");
  };

  return (
    <div>
      <AdminPageHeader
        title={isEdit ? "Edit Job Seeker" : "Create Job Seeker"}
        subtitle={isEdit ? "Update account and profile details" : "Add a job seeker account and profile"}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-3xl space-y-5 rounded-lg border border-gray-200 bg-background p-4 shadow-sm sm:p-6"
      >
        <div className="space-y-1">
          <Label required>Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
          />
        </div>
        <div className="space-y-1">
          <Label required>Email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                error={!!errors.email}
                errorMessage={errors.email?.message}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Phone</Label>
            <Controller name="phone" control={control} render={({ field }) => (
              <Input {...field} error={!!errors.phone} errorMessage={errors.phone?.message} />
            )} />
          </div>
          <div className="space-y-2">
            <Label>Profile Photo Path</Label>
            <Controller name="profilePhoto" control={control} render={({ field }) => (
              <Input {...field} error={!!errors.profilePhoto} errorMessage={errors.profilePhoto?.message} />
            )} />
          </div>
          <div className="space-y-2">
            <Label required>Headline</Label>
            <Controller name="headline" control={control} render={({ field }) => (
              <Input {...field} error={!!errors.headline} errorMessage={errors.headline?.message} />
            )} />
          </div>
          <div className="space-y-2">
            <Label required>Location</Label>
            <Controller name="location" control={control} render={({ field }) => (
              <Input {...field} error={!!errors.location} errorMessage={errors.location?.message} />
            )} />
          </div>
          <div className="space-y-2">
            <Label required>Date of Birth</Label>
            <Controller name="dateOfBirth" control={control} render={({ field }) => (
              <Input {...field} type="date" error={!!errors.dateOfBirth} errorMessage={errors.dateOfBirth?.message} />
            )} />
          </div>
          <div className="space-y-2">
            <Label required>Gender</Label>
            <Controller name="gender" control={control} render={({ field }) => (
              <Input {...field} error={!!errors.gender} errorMessage={errors.gender?.message} />
            )} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Bio</Label>
            <Controller name="bio" control={control} render={({ field }) => (
              <Textarea {...field} rows={4} error={!!errors.bio} errorMessage={errors.bio?.message} />
            )} />
          </div>
          <div className="space-y-2">
            <Label>Resume Path</Label>
            <Controller name="resumePath" control={control} render={({ field }) => (
              <Input {...field} error={!!errors.resumePath} errorMessage={errors.resumePath?.message} />
            )} />
          </div>
          <div className="space-y-2">
            <Label>Personal Website / Portfolio</Label>
            <Controller name="websiteUrl" control={control} render={({ field }) => (
              <Input {...field} error={!!errors.websiteUrl} errorMessage={errors.websiteUrl?.message} />
            )} />
          </div>
          <div className="space-y-2">
            <Label required>LinkedIn URL</Label>
            <Controller name="linkedinUrl" control={control} render={({ field }) => (
              <Input {...field} error={!!errors.linkedinUrl} errorMessage={errors.linkedinUrl?.message} />
            )} />
          </div>
          <div className="space-y-2">
            <Label required>GitHub URL</Label>
            <Controller name="githubUrl" control={control} render={({ field }) => (
              <Input {...field} error={!!errors.githubUrl} errorMessage={errors.githubUrl?.message} />
            )} />
          </div>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            loading={isSubmitting}
            size="sm"
            className={cn(adminHeaderActionButtonClassName, "w-full sm:w-auto")}
          >
            {isEdit ? "Save Changes" : "Create Job Seeker"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
      {isEdit && initial && (
        <form
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          className="mt-5 max-w-3xl space-y-5 rounded-lg border border-gray-200 bg-background p-4 shadow-sm sm:p-6"
        >
          <div>
            <h2 className="text-base font-semibold">Change Password</h2>
            <p className="mt-1 text-sm text-gray-500">
              Set a new password for this job seeker account.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label required>New Password</Label>
              <Controller name="password" control={passwordControl} render={({ field }) => (
                <PasswordInput {...field} error={!!passwordErrors.password} errorMessage={passwordErrors.password?.message} />
              )} />
            </div>
            <div className="space-y-2">
              <Label required>Confirm New Password</Label>
              <Controller name="password_confirmation" control={passwordControl} render={({ field }) => (
                <PasswordInput {...field} error={!!passwordErrors.password_confirmation} errorMessage={passwordErrors.password_confirmation?.message} />
              )} />
            </div>
          </div>
          <div className="flex justify-end border-t border-gray-200 pt-5">
            <Button type="submit" loading={isPasswordSubmitting} size="sm" className={cn(adminHeaderActionButtonClassName, "w-full sm:w-auto")}>
              Update Password
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
