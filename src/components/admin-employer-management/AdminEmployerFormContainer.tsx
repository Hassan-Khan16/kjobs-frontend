"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/custom/PasswordInput";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
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
          companyName: initial?.companyName ?? "",
          contactName: initial?.contactName ?? "",
          email: initial?.email ?? "",
          phone: initial?.phone ?? "",
          password: "",
        }
      : {
          companyName: "",
          contactName: "",
          email: "",
          phone: "",
          password: "",
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
      const res = await updateEmployer(initial.id, {
        companyName: data.companyName,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        ...(data.password ? { password: data.password } : {}),
      });
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
        subtitle="Employer account details"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-xl space-y-4 rounded-[10px] border border-gray-105 bg-background p-6"
      >
        {(
          [
            ["companyName", "Company Name", false],
            ["contactName", "Contact Name", false],
            ["email", "Email", false],
            ["phone", "Phone", false],
          ] as const
        ).map(([name, label]) => (
          <div key={name} className="space-y-1">
            <Label required={name !== "phone"}>{label}</Label>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={name === "email" ? "email" : "text"}
                  error={!!errors[name]}
                  errorMessage={errors[name]?.message as string}
                />
              )}
            />
          </div>
        ))}
        <div className="space-y-1">
          <Label required={!isEdit}>Password</Label>
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
        <div className="flex gap-3">
          <Button type="submit" loading={isSubmitting} variant="gradientCurved">
            Save
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
