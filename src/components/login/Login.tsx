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
import { userRole } from "@/enum/role";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import Image from "next/image";

type LoginProps = {
  hideForgotPassword?: boolean;
};

const Login = ({ hideForgotPassword }: LoginProps) => {
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
    const res = await signIn("admin-credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      const session = await getSession();
      const user = session?.user;

      if (user?.role !== userRole.ADMIN && user?.role !== "admin") {
        handleOpenToast("This page is for administrators only.", "error");
        setLoading(false);
        return;
      }

      handleOpenToast("Logged in successfully!", "success");
      router.push("/admin/dashboard");
      reset();
    } else if (res?.error) {
      handleOpenToast(res.error, "error");
    }
    setLoading(false);
  };

  return (
    <>
      <Image
        src="/images/auth-bg.svg"
        alt="background"
        fill
        quality={70}
        className="object-cover absolute top-0 left-0 w-full h-full"
      />
      <div className="max-w-[690px] w-full lg:mb-2 lg:mt-2 mt-[60px] bg-white-100 rounded-[20px] border-[0.2px] border-background py-[35px] lg:py-[25px] px-[30px] sm:px-[38px] lg:px-[71px] backdrop-blur-[145px] shadow-[0px_20px_50px_rgba(0,0,0,0.2)]">
        <div className="mt-0 lg:mt-5">
          <Heading variant="h4">Welcome Back</Heading>
          <Text variant="p5" className="mt-1">
            Sign in to the admin panel
          </Text>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
            className="space-y-4 mt-[26px] flex flex-col items-center w-full"
          >
            <div className="flex flex-col gap-1 w-full">
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
                    placeholder="Enter your email"
                    variant="whitebg"
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-1 w-full mt-1.5">
              <Label htmlFor="password" variant="l1" required>
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
                    variant="whitebg"
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
                  className="text-[12px] lg:text-[14px] font-poppins text-background cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              {!hideForgotPassword && (
                <Link
                  href="/forgot-password"
                  className="text-[12px] lg:text-[14px] font-poppins text-background"
                >
                  Forgot Password?
                </Link>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              className="mt-[9px]"
              variant="gradientCurved"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
