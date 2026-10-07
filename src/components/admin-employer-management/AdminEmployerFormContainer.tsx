"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { Textarea } from "@/components/ui/textarea";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { adminHeaderActionButtonClassName } from "@/components/admin-page-header/AdminHeaderActionButton";
import { cn } from "@/lib/utils";
import {
  createEmployerSchema,
  updateEmployerSchema,
  updateEmployerPasswordSchema,
  type CreateEmployerFormData,
  type UpdateEmployerFormData,
  type UpdateEmployerPasswordFormData,
} from "@/schemas/employer";
import {
  createEmployer,
  updateEmployer,
  updateEmployerPassword,
} from "@/services/employer-service";
import { handleOpenToast } from "@/helper/toast";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";
import type { AdminEmployer } from "@/types/employer";
import type {
  CreateEmployerPayload,
  UpdateEmployerPayload,
  UpdateEmployerPasswordPayload,
} from "@/types/employer";

type Props = { mode: "create" | "edit"; initial?: AdminEmployer };

export default function AdminEmployerFormContainer({ mode, initial }: Props) {
  const router = useRouter();
  const isEdit = mode === "edit";
  const form = useForm<CreateEmployerFormData | UpdateEmployerFormData>({
    resolver: zodResolver(isEdit ? updateEmployerSchema : createEmployerSchema),
    defaultValues: isEdit
      ? {
          email: initial?.user.email ?? "",
          companyName: initial?.company_name ?? "",
          contactPersonName: initial?.contact_person_name ?? "",
          phone: initial?.phone ?? "",
          companyDescription: initial?.company_description ?? "",
          website: initial?.website ?? "",
          logo: initial?.logo ?? "",
        }
      : {
          email: "",
          password: "",
          password_confirmation: "",
          companyName: "",
          contactPersonName: "",
          phone: "",
          companyDescription: "",
          website: "",
          logo: "",
        },
  });
  const passwordForm = useForm<UpdateEmployerPasswordFormData>({
    resolver: zodResolver(updateEmployerPasswordSchema),
    defaultValues: { password: "", password_confirmation: "" },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  const createErrors = errors as FieldErrors<CreateEmployerFormData>;
  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = passwordForm;

  const onSubmit = async (
    data: CreateEmployerFormData | UpdateEmployerFormData,
  ) => {
    if (isEdit && initial) {
      const payload: UpdateEmployerPayload = {
        company_name: data.companyName,
        contact_person_name: data.contactPersonName,
        phone: data.phone,
        company_description: data.companyDescription,
        website: data.website,
        logo: data.logo,
      };
      if (data.email) payload.email = data.email;

      const res = await updateEmployer(initial.id, payload);
      if (!res.success) {
        handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
        return;
      }
      handleOpenToast("Employer updated", "success");
      router.push(`/admin/employers/${initial.id}`);
      return;
    }
    const createData = data as CreateEmployerFormData;
    const payload: CreateEmployerPayload = {
      email: createData.email,
      password: createData.password,
      password_confirmation: createData.password_confirmation,
      company_name: createData.companyName,
      contact_person_name: createData.contactPersonName,
      phone: createData.phone,
      company_description: createData.companyDescription,
      website: createData.website,
      logo: createData.logo,
    };
    const res = await createEmployer(payload);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    handleOpenToast("Employer created", "success");
    router.push("/admin/employers");
  };

  const onPasswordSubmit = async (data: UpdateEmployerPasswordFormData) => {
    if (!initial) return;
    const payload: UpdateEmployerPasswordPayload = {
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    const res = await updateEmployerPassword(initial.id, payload);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    passwordForm.reset();
    handleOpenToast("Employer password updated", "success");
  };

  return (
    <div className="p-4 lg:p-6">
      <AdminPageHeader
        title={isEdit ? "Edit Employer" : "Create Employer"}
        subtitle={isEdit ? "Update employer account details" : "Add a new employer account"}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-3xl space-y-6 rounded-lg border border-gray-200 bg-background p-4 shadow-sm sm:p-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label required>Company Name</Label>
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!errors.companyName}
                  errorMessage={errors.companyName?.message as string}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label required>Contact Person Name</Label>
            <Controller
              name="contactPersonName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!errors.contactPersonName}
                  errorMessage={errors.contactPersonName?.message as string}
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label required>Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  error={!!errors.email}
                  errorMessage={errors.email?.message as string}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="tel"
                  error={!!errors.phone}
                  errorMessage={errors.phone?.message as string}
                />
              )}
            />
          </div>
        </div>

        {!isEdit && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label required>Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    error={!!createErrors.password}
                    errorMessage={createErrors.password?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label required>Confirm Password</Label>
              <Controller
                name="password_confirmation"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    error={!!createErrors.password_confirmation}
                    errorMessage={createErrors.password_confirmation?.message}
                  />
                )}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Company Description</Label>
          <Controller
            name="companyDescription"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                rows={4}
                error={!!errors.companyDescription}
                errorMessage={errors.companyDescription?.message as string}
                placeholder="Enter company description..."
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Website</Label>
            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="url"
                  placeholder="https://example.com"
                  error={!!errors.website}
                  errorMessage={errors.website?.message as string}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label>Logo URL</Label>
            <Controller
              name="logo"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="url"
                  placeholder="https://example.com/logo.png"
                  error={!!errors.logo}
                  errorMessage={errors.logo?.message as string}
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            loading={isSubmitting}
            size="sm"
            className={cn(adminHeaderActionButtonClassName, "w-full sm:w-auto")}
          >
            {isEdit ? "Save Changes" : "Create Employer"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
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
              Set a new password for this employer account.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label required>New Password</Label>
              <Controller
                name="password"
                control={passwordControl}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    error={!!passwordErrors.password}
                    errorMessage={passwordErrors.password?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label required>Confirm New Password</Label>
              <Controller
                name="password_confirmation"
                control={passwordControl}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    error={!!passwordErrors.password_confirmation}
                    errorMessage={passwordErrors.password_confirmation?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-end border-t border-gray-200 pt-5">
            <Button
              type="submit"
              loading={isPasswordSubmitting}
              size="sm"
              className={cn(adminHeaderActionButtonClassName, "w-full sm:w-auto")}
            >
              Update Password
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
