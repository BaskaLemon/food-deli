/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/resetPass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push("/sign-in"), 2000);
    } else {
      setError(data.error);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col gap-4 w-screen h-screen justify-center items-center">
        <p className="text-2xl font-bold">Invalid link</p>
        <p className="text-gray-400">This reset link is invalid or expired.</p>
        <Link href="/forgotPass" className="text-black underline">
          Request a new one
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center w-screen h-screen">
      <div className="container w-[40%] flex justify-center">
        {success ? (
          <div className="flex flex-col gap-6 w-[50%]">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <p className="text-2xl font-bold">Password reset!</p>
            <p className="text-gray-400">Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-[50%]">
            <div>
              <p className="text-2xl font-bold">Set new password</p>
              <p className="text-gray-400">Enter your new password below.</p>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-md">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-stone-300 rounded-md w-full p-2"
                required
                minLength={6}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="border border-stone-300 rounded-md w-full p-2"
                required
                minLength={6}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-gray-500 flex items-center gap-0.5 hover:text-black"
            >
              {showPassword ? (
                <div className="w-4 h-4 border rounded-sm bg-black">
                  <img src={"./check.svg"} alt="" />
                </div>
              ) : (
                <div className="w-4 h-4 border rounded-sm">
                  <img src={"./check.svg"} alt="" />
                </div>
              )}
              Show password
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white rounded-md p-2 hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>
        )}
      </div>

      <div className="w-[60%] h-[90%] p-10">
        <img
          className="rounded-4xl h-full w-full object-cover"
          src="/food-bike.jpg"
          alt="food"
        />
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
