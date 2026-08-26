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
  userRegisterSchema,
  type UserRegisterFormData,
} from "@/schemas/auth";
import { registerUser } from "@/services/auth-service";
import { handleOpenToast } from "@/helper/toast";
import { authHeroCardClass } from "@/components/login/Login";
import { cn } from "@/lib/utils";
import { appRoutes } from "@/utils/endpoint";

export default function UserRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserRegisterFormData>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: UserRegisterFormData) => {
    setLoading(true);
    const res = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
    });

    if (!res.success) {
      handleOpenToast(res.message || res.error, "error");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("user-credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!signInRes?.ok) {
      handleOpenToast(
        signInRes?.error ?? "Account created. Please sign in.",
        signInRes?.ok ? "success" : "error",
      );
      router.push(appRoutes.userLogin);
      setLoading(false);
      return;
    }

    handleOpenToast("Account created successfully!", "success");
    reset();
    router.push(appRoutes.userDashboard);
    setLoading(false);
  };

  return (
    <div className={cn(authHeroCardClass, "max-w-[520px]")}>
      <div className="mt-0 lg:mt-5">
        <Heading variant="h4">Create your account</Heading>
        <Text variant="p5" className="mt-1">
          Register as a job seeker
        </Text>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mt-[26px] flex flex-col w-full"
      >
        <div className="space-y-1">
          <Label variant="l1" htmlFor="name" required>
            Full Name
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                placeholder="Your full name"
                variant="whitebg"
                error={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
          />
        </div>

        <div className="space-y-1">
          <Label variant="l1" htmlFor="email" required>
            Email
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="you@example.com"
                variant="whitebg"
                error={!!errors.email}
                errorMessage={errors.email?.message}
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
            href={appRoutes.userLogin}
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
