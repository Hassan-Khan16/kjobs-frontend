"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { getSession, signIn } from "next-auth/react";
import { handleOpenToast } from "@/helper/toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { normalizeRole } from "@/helper/auth";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function AuthHeroBackground() {
  return (
    <Image
      src="/images/auth-bg.svg"
      alt="background"
      fill
      quality={70}
      className="object-cover absolute top-0 left-0 w-full h-full"
    />
  );
}

export const authHeroCardClass =
  "w-full rounded-[20px] border py-[35px] px-[30px] sm:px-[38px] lg:px-[71px] lg:py-[25px] max-w-[690px] lg:mb-2 lg:mt-2 mt-[60px] bg-white-100 border-[0.2px] border-background backdrop-blur-[145px] shadow-[0px_20px_50px_rgba(0,0,0,0.2)]";

export type LoginProps = {
  providerId: "admin-credentials" | "user-credentials" | "employer-credentials";
  allowedRole: string;
  successRedirect: string;
  registerHref?: string;
  registerLabel?: string;
  title?: string;
  subtitle?: string;
  hideForgotPassword?: boolean;
  /** Admin login uses dark hero labels; public portals use standard form labels */
  variant?: "admin" | "public";
};

const Login = ({
  providerId,
  allowedRole,
  successRedirect,
  registerHref,
  registerLabel = "Create an account",
  title = "Welcome Back",
  subtitle = "Sign in to continue",
  hideForgotPassword = false,
  variant = "public",
}: LoginProps) => {
  const isAdmin = variant === "admin";
  const labelVariant = isAdmin ? "l1" : "form";
  const inputVariant = isAdmin ? "whitebg" : "outline3";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const res = await signIn(providerId, {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      const session = await getSession();
      const user = session?.user;

      if (normalizeRole(user?.role) !== normalizeRole(allowedRole)) {
        handleOpenToast("This page is for a different account type.", "error");
        setLoading(false);
        return;
      }

      handleOpenToast("Logged in successfully!", "success");
      router.push(successRedirect);
      reset();
    } else if (res?.error) {
      handleOpenToast(res.error, "error");
    }
    setLoading(false);
  };

  const card = (
    <div
      className={cn(
        isAdmin
          ? authHeroCardClass
          : "w-full rounded-[20px] border py-[35px] px-[30px] sm:px-[38px] lg:px-[71px] lg:py-[25px] max-w-[520px] bg-background border-gray-105 shadow-sm",
      )}
    >
      <div className={isAdmin ? "mt-0 lg:mt-5" : ""}>
        <Heading variant="h4" className={!isAdmin ? "text-foreground" : undefined}>
          {title}
        </Heading>
        <Text
          variant={isAdmin ? "p5" : "p4"}
          className={cn("mt-1", !isAdmin && "text-muted-foreground")}
        >
          {subtitle}
        </Text>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          className="space-y-4 mt-[26px] flex flex-col items-center w-full"
        >
          <div className="flex flex-col gap-1 w-full">
            <Label variant={labelVariant} htmlFor="email" required>
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
                  placeholder="Enter your email"
                  variant={inputVariant}
                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-1 w-full mt-1.5">
            <Label htmlFor="password" variant={labelVariant} required>
              Password
            </Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  id="password"
                  placeholder="Enter password"
                  variant={inputVariant}
                  error={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              )}
            />
          </div>

          <div className="flex justify-between items-center w-full lg:mt-2.5 mt-1">
            <div className="flex items-center gap-2">
              <Checkbox id="rememberMe" />
              <label
                htmlFor="rememberMe"
                className={cn(
                  "text-[12px] lg:text-[14px] font-poppins cursor-pointer",
                  isAdmin ? "text-background" : "text-muted-foreground",
                )}
              >
                Remember me
              </label>
            </div>
            {!hideForgotPassword && (
              <Link
                href="/forgot-password"
                className={cn(
                  "text-[12px] lg:text-[14px] font-poppins",
                  isAdmin ? "text-background" : "text-brand-royal",
                )}
              >
                Forgot Password?
              </Link>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            className="mt-[9px] w-full"
            variant={isAdmin ? "gradientCurved" : "default"}
          >
            Sign In
          </Button>

          {registerHref && (
            <p
              className={cn(
                "text-sm text-center mt-2",
                isAdmin ? "text-background" : "text-muted-foreground",
              )}
            >
              Don&apos;t have an account?{" "}
              <Link
                href={registerHref}
                className={cn(
                  "font-medium underline-offset-4 hover:underline",
                  isAdmin ? "text-background" : "text-brand-royal",
                )}
              >
                {registerLabel}
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );

  if (isAdmin) {
    return (
      <>
        <AuthHeroBackground />
        {card}
      </>
    );
  }

  return card;
};

export default Login;
