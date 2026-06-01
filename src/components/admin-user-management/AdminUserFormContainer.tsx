"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/custom/PasswordInput";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormData,
  type UpdateUserFormData,
} from "@/schemas/auth";
import { createUser, updateUser } from "@/services/user-service";
import { handleOpenToast } from "@/helper/toast";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";
import type { AdminUser } from "@/types/user";
import { userRole } from "@/enum/role";

type Props = {
  mode: "create" | "edit";
  initial?: AdminUser;
};

export default function AdminUserFormContainer({ mode, initial }: Props) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const form = useForm<CreateUserFormData | UpdateUserFormData>({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    defaultValues: isEdit
      ? {
          name: initial?.name ?? "",
          email: initial?.email ?? "",
          role: initial?.role ?? userRole.USER,
          password: "",
        }
      : {
          name: "",
          email: "",
          password: "",
          role: userRole.USER,
        },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: CreateUserFormData | UpdateUserFormData) => {
    if (isEdit && initial) {
      const payload = {
        name: data.name,
        email: data.email,
        role: data.role,
        ...(data.password ? { password: data.password } : {}),
      };
      const res = await updateUser(initial.id, payload);
      if (!res.success) {
        handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
        return;
      }
      handleOpenToast("User updated successfully", "success");
      router.push(`/admin/users/${initial.id}`);
      return;
    }

    const res = await createUser(data as CreateUserFormData);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    handleOpenToast("User created successfully", "success");
    router.push("/admin/users");
  };

  return (
    <div>
      <AdminPageHeader
        title={isEdit ? "Edit User" : "Create User"}
        subtitle={isEdit ? "Update user details" : "Add a new user"}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-xl space-y-4 rounded-[10px] border border-gray-105 bg-background p-6"
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
        <div className="space-y-1">
          <Label required={!isEdit}>
            Password{isEdit ? " (leave blank to keep)" : ""}
          </Label>
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
          <Label required>Role</Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={userRole.USER}>User</SelectItem>
                  <SelectItem value={userRole.EMPLOYER}>Employer</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" loading={isSubmitting} variant="gradientCurved">
            {isEdit ? "Save Changes" : "Create User"}
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
    </div>
  );
}
