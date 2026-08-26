"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {
  employerRegisterSchema,
  type EmployerRegisterFormData,
} from "@/schemas/auth";
import { registerEmployer } from "@/services/auth-service";
import { handleOpenToast } from "@/helper/toast";
import { authHeroCardClass } from "@/components/login/Login";
import { cn } from "@/lib/utils";
import { appRoutes } from "@/utils/endpoint";

export default function EmployerRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployerRegisterFormData>({
    resolver: zodResolver(employerRegisterSchema),
    defaultValues: {
      companyName: "",
      email: "",
      contactName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: EmployerRegisterFormData) => {
    setLoading(true);
    const res = await registerEmployer({
      company_name: data.companyName,
      email: data.email,
      contact_person_name: data.contactName,
      phone: data.phone || undefined,
      password: data.password,
      password_confirmation: data.confirmPassword,
    });

    if (!res.success) {
      handleOpenToast(res.message || res.error, "error");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("employer-credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!signInRes?.ok) {
      handleOpenToast(
        signInRes?.error ?? "Account created. Please sign in.",
        "error",
      );
      router.push(appRoutes.employerLogin);
      setLoading(false);
      return;
    }

    handleOpenToast("Account created successfully!", "success");
    reset();
    router.push(appRoutes.employerDashboard);
    setLoading(false);
  };

  return (
    <div className={cn(authHeroCardClass, "max-w-[520px]")}>
      <div className="mt-0 lg:mt-5">
        <Heading variant="h4">Register your company</Heading>
        <Text variant="p5" className="mt-1">
          Post jobs and manage applications
        </Text>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mt-[26px] flex flex-col w-full"
      >
        <div className="space-y-1">
          <Label variant="l1" htmlFor="companyName" required>
            Company Name
          </Label>
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="companyName"
                placeholder="Company name"
                variant="whitebg"
                error={!!errors.companyName}
                errorMessage={errors.companyName?.message}
              />
            )}
          />
        </div>

        <div className="space-y-1">
          <Label variant="l1" htmlFor="email" required>
            Company Email
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="contact@company.com"
                variant="whitebg"
                error={!!errors.email}
                errorMessage={errors.email?.message}
              />
            )}
          />
        </div>

        <div className="space-y-1">
          <Label variant="l1" htmlFor="contactName" required>
            Contact Person Name
          </Label>
          <Controller
            name="contactName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="contactName"
                placeholder="Contact person"
                variant="whitebg"
                error={!!errors.contactName}
                errorMessage={errors.contactName?.message}
              />
            )}
          />
        </div>

        <div className="space-y-1">
          <Label variant="l1" htmlFor="phone">
            Phone Number
          </Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="phone"
                type="tel"
                placeholder="Optional"
                variant="whitebg"
                error={!!errors.phone}
                errorMessage={errors.phone?.message}
              />
            )}
          />
        </div>

        <div className="space-y-1">
          <Label variant="l1" htmlFor="password" required>
            Password
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                id="password"
                placeholder="At least 8 characters"
                variant="whitebg"
                error={!!errors.password}
                errorMessage={errors.password?.message}
              />
            )}
          />
        </div>

        <div className="space-y-1">
          <Label variant="l1" htmlFor="confirmPassword" required>
            Confirm Password
          </Label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                id="confirmPassword"
                placeholder="Confirm password"
                variant="whitebg"
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          loading={loading}
          className="w-full"
          variant="gradientCurved"
        >
          Create Account
        </Button>

        <p className="text-sm text-center text-background mt-2">
          Already have an account?{" "}
          <Link
            href={appRoutes.employerLogin}
            className="font-medium underline-offset-4 hover:underline text-background"
          >
            Sign in
          </Link>
        </p>
      </form>
      </div>
    </div>
  );
}
