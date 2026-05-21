"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // 🔥 Session check (important)
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await authClient.getSession();
      if (data?.user) {
        router.push("/"); // already logged in হলে redirect
      }
    };
    checkSession();
  }, [router]);

  // ✅ Register Submit
  const onSubmit = async (formData) => {
    const { password } = formData;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be 6+ characters with uppercase & lowercase"
      );
    }

    try {
      const response = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photo,
        callbackURL: "/login",
      });

      if (response?.error) {
        return toast.error(response.error.message || "Registration failed");
      }

      toast.success("Registration successful!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed!");
    }
  };

  // 🔥 Google Login FIXED
  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // ✅ VERY IMPORTANT
      });

      // NOTE: redirect automatic হবে
    } catch (error) {
      console.error(error);
      toast.error("Google login failed!");
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Create Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <input
              type="text"
              placeholder="Photo URL"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500"
              {...register("photo")}
            />
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 pr-10 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 text-white py-3 rounded-lg"
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-300"></div>
            <span className="text-sm text-slate-500">OR</span>
            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          {/* Google Login */}
          <Button
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            className="w-full flex items-center justify-center gap-2"
          >
            <Icon icon="devicon:google" />
            {loadingGoogle ? "Redirecting..." : "Sign in with Google"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;