/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      alert("Login successful");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center w-screen h-screen">
      <div className="container w-[40%] flex justify-center">
        <form onSubmit={handleLogin} className="flex flex-col gap-7 w-[50%]">
          <Link
            href="/"
            className="flex w-8 h-8 border border-stone-200 rounded-md justify-center items-center hover:scale-105 transition-transform"
          >
            <img src="/Vector.svg" alt="back" />
          </Link>

          <div>
            <p className="text-2xl font-bold">Log in</p>
            <p className="text-gray-400">
              Log in to enjoy your favorite dishes.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className="border border-stone-300 rounded-md w-full p-2"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-stone-300 rounded-md w-full p-2"
              required
            />

            <p className="underline hover:opacity-60 cursor-pointer">
              Forgot password?
            </p>
          </div>

          <button
            type="submit"
            className="bg-black text-white rounded-md p-2 hover:opacity-90"
          >
            Let&apos;s go
          </button>

          <div className="flex gap-3 justify-center">
            <p>Don’t have an account?</p>

            <Link href="/create" className="text-blue-400 hover:opacity-60">
              Sign up
            </Link>
          </div>
        </form>
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
