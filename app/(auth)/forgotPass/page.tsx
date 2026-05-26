/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/forgotPass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccess(true);
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex items-center w-screen h-screen">
      <div className="container w-[40%] flex justify-center">
        {success ? (
          <div className="flex flex-col gap-6 w-[50%]">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <div>
              <p className="text-2xl font-bold">Check your email</p>
              <p className="text-gray-400 mt-1">
                We sent a password reset link to:
                <span className="text-black font-medium"> {email}</span>
              </p>
            </div>
            <p className="text-sm text-gray-400">
              Didn&apos;t receive it?
              <button
                onClick={() => setSuccess(false)}
                className="text-black underline ml-2 hover:opacity-70"
              >
                Try again
              </button>
            </p>
            <Link
              href="/sign-in"
              className="text-sm text-gray-400 hover:text-black transition-colors"
            >
              ← Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-[50%]">
            <Link
              href="/sign-in"
              className="flex w-8 h-8 border border-stone-200 rounded-md justify-center items-center hover:scale-105 transition-transform"
            >
              <img src="/Vector.svg" alt="back" />
            </Link>

            <div>
              <p className="text-2xl font-bold">Reset your password</p>
              <p className="text-gray-400">
                Enter your email to receive a password reset link.
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-md">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-5">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-stone-300 rounded-md w-full p-2"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white rounded-md p-2 hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>

            <Link
              href="/sign-in"
              className="text-sm text-center text-gray-400 hover:text-black transition-colors"
            >
              ← Back to login
            </Link>
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
