"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Create() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const validateEmail = (value: string) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    setFormData({ ...formData, email: value });
    setIsEmailValid(regex.test(value) || value === "");
  };

  const validatePass = (value: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;

    setFormData({ ...formData, password: value });
    setIsPasswordValid(regex.test(value) || value === "");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/sign-in");
    } else {
      alert(data.error || "Алдаа гарлаа");
    }
  };
  return (
    <div className="flex items-center w-screen h-screen">
      <div className="container w-[40%] flex justify-center">
        <div className="flex flex-col gap-7 w-[50%]">
          <Link
            href={"/"}
            className="flex w-8 h-8 border border-stone-200 rounded-md justify-center items-center hover:scale-105 transition-transform"
          >
            <img src={"./Vector.svg"} alt="" />
          </Link>

          {currentStep === 1 && (
            <>
              <div>
                <p className="text-2xl font-bold">Create your account</p>

                <p className="text-gray-400">
                  Sign up to explore your favorite dishes.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => validateEmail(e.target.value)}
                  className={`border rounded-md w-full p-2 outline-none ${
                    isEmailValid
                      ? "border-stone-300"
                      : "border-red-500 focus:border-red-500"
                  }`}
                />

                {!isEmailValid && (
                  <p className="text-red-500 text-sm">
                    Please enter a valid email.
                  </p>
                )}
              </div>

              <button
                onClick={nextStep}
                disabled={!isEmailValid || formData.email === ""}
                className={`rounded-md p-2 text-white ${
                  !isEmailValid || formData.email === ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:scale-102 cursor-pointer"
                }`}
              >
                Continue
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div>
                <p className="text-2xl font-bold">Create a strong password</p>

                <p className="text-gray-400">
                  Create a strong password with letters, numbers.
                </p>
              </div>
              <div className="space-y-5">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => validatePass(e.target.value)}
                  className={`border rounded-md w-full p-2 ${
                    isPasswordValid ? "border-stone-300" : "border-red-500"
                  }`}
                />
                {!isPasswordValid && (
                  <p className="text-red-500 text-sm">
                    Password must contain: uppercase, lowercase, number, special
                    character, and be 8-20 characters long.
                  </p>
                )}

                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border border-stone-300 rounded-md w-full p-2"
                />
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
                {formData.confirmPassword !== "" &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      Passwords do not match
                    </p>
                  )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="border border-stone-300 rounded-md p-2 w-full hover:scale-102 cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    formData.password === "" ||
                    formData.confirmPassword === "" ||
                    formData.password !== formData.confirmPassword
                  }
                  className={`rounded-md p-2 text-white w-full ${
                    formData.password === "" ||
                    formData.confirmPassword === "" ||
                    formData.password !== formData.confirmPassword
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:scale-102 cursor-pointer"
                  }`}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </>
          )}

          <div className="flex gap-3 justify-center">
            <p>Already have an account?</p>

            <Link href={"../login"} className="text-blue-400 hover:opacity-60">
              Log in
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[60%] h-[90%] p-10">
        <img
          className="rounded-4xl h-full w-full object-cover"
          src={"./food-bike.jpg"}
          alt=""
        />
      </div>
    </div>
  );
}
