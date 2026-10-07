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
  createEmployerSchema,
  updateEmployerSchema,
  type CreateEmployerFormData,
  type UpdateEmployerFormData,
} from "@/schemas/employer";
import { createEmployer, updateEmployer } from "@/services/employer-service";
import { handleOpenToast } from "@/helper/toast";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";
import type { AdminEmployer } from "@/types/employer";

type Props = { mode: "create" | "edit"; initial?: AdminEmployer };

export default function AdminEmployerFormContainer({ mode, initial }: Props) {
  const router = useRouter();
  const isEdit = mode === "edit";
  const form = useForm<CreateEmployerFormData | UpdateEmployerFormData>({
    resolver: zodResolver(isEdit ? updateEmployerSchema : createEmployerSchema),
    defaultValues: isEdit
      ? {
          email: initial?.user.email ?? "",
          password: "",
          password_confirmation: "",
          companyName: initial?.companyName ?? "",
          contactPersonName: initial?.contactPersonName ?? "",
          phone: initial?.phone ?? "",
          companyDescription: initial?.companyDescription ?? "",
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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (
    data: CreateEmployerFormData | UpdateEmployerFormData,
  ) => {
    if (isEdit && initial) {
      const payload: any = {
        companyName: data.companyName,
        contactPersonName: data.contactPersonName,
        phone: data.phone,
        companyDescription: data.companyDescription,
        website: data.website,
        logo: data.logo,
      };
      if (data.email) payload.email = data.email;
      if (data.password) {
        payload.password = data.password;
        payload.password_confirmation = data.password_confirmation;
      }

      const res = await updateEmployer(initial.id, payload);
      if (!res.success) {
        handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
        return;
      }
      handleOpenToast("Employer updated", "success");
      router.push(`/admin/employers/${initial.id}`);
      return;
    }
    const res = await createEmployer(data as CreateEmployerFormData);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    handleOpenToast("Employer created", "success");
    router.push("/admin/employers");
  };

  return (
    <div>
      <AdminPageHeader
        title={isEdit ? "Edit Employer" : "Create Employer"}
        subtitle={isEdit ? "Update employer account details" : "Add a new employer account"}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-2xl space-y-4 rounded-[10px] border border-gray-105 bg-background p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
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
          <div className="space-y-1">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  errorMessage={errors.email?.message as string}
                />
              )}
            />
          </div>
          <div className="space-y-1">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label required>Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    error={!!errors.password}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-1">
              <Label required>Confirm Password</Label>
              <Controller
                name="password_confirmation"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    error={!!errors.password_confirmation}
                    errorMessage={errors.password_confirmation?.message}
                  />
                )}
              />
            </div>
          </div>
        )}

        {isEdit && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Password {isEdit && "(leave blank to keep current)"}</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    error={!!errors.password}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-1">
              <Label>Confirm Password</Label>
              <Controller
                name="password_confirmation"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    error={!!errors.password_confirmation}
                    errorMessage={errors.password_confirmation?.message}
                  />
                )}
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
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
          <div className="space-y-1">
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

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            loading={isSubmitting}
            size="sm"
            className={cn(adminHeaderActionButtonClassName, "w-auto")}
          >
            {isEdit ? "Save Changes" : "Create Employer"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
