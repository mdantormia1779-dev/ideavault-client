"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isShowPassword, setIsShowPassword] = useState(false);

  //  Handle Login
  const onSubmit = async (data) => {
    try {
      console.log("Login Data:", data);

      //  এখানে API / Firebase login logic বসাবে

      toast.success("Login successful!");
      router.push("/"); // redirect
    } catch (error) {
      toast.error("Login failed!");
    }
  };

  // 🔵 Google Login
  const handleGoogleLogin = async () => {
    try {
      //  Google auth logic
      toast.success("Google Login successful!");
      router.push("/");
    } catch (error) {
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
          Login Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600">
              Password
            </label>

            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-10 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              {/* 👁 Show/Hide */}
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <Link href="/forget" className="flex justify-end">
            <span className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </span>
          </Link>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="text-sm text-slate-500">OR</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>

        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          className="w-full rounded-lg flex items-center justify-center gap-2"
          variant="tertiary"
        >
          <Icon icon="devicon:google" />
          Sign in with Google
        </Button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;