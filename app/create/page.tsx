"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";

export default function Create() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(true);

  const nextStep = () => {
    if (currentStep < 3) {
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
    setIsValid(regex.test(value) || value === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center w-screen h-screen">
      {/* LEFT SIDE */}
      <div className="container w-[40%] flex justify-center">
        <div className="flex flex-col gap-7 w-[50%]">
          <Link
            href={"/"}
            className="flex w-8 h-8 border border-stone-200 rounded-md justify-center items-center hover:scale-105 transition-transform"
          >
            <img src={"./Vector.svg"} alt="" />
          </Link>

          <div>
            <p className="text-2xl font-bold">Create your account</p>

            <p className="text-gray-400">Step {currentStep} of 3</p>
          </div>

          {/* STEP 1 */}
          {currentStep === 1 && (
            <>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => validateEmail(e.target.value)}
                  className={`border rounded-md w-full p-2 outline-none ${
                    isValid
                      ? "border-stone-300"
                      : "border-red-500 focus:border-red-500"
                  }`}
                />

                {!isValid && (
                  <p className="text-red-500 text-sm">
                    Please enter a valid email.
                  </p>
                )}
              </div>

              <button
                onClick={nextStep}
                disabled={!isValid || formData.email === ""}
                className={`rounded-md p-2 text-white ${
                  !isValid || formData.email === ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black"
                }`}
              >
                Continue
              </button>
            </>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="border border-stone-300 rounded-md w-full p-2"
              />

              <div className="flex gap-3">
                <button
                  onClick={prevStep}
                  className="border border-stone-300 rounded-md p-2 w-full"
                >
                  Back
                </button>

                <button
                  onClick={nextStep}
                  disabled={formData.username === ""}
                  className={`rounded-md p-2 text-white w-full ${
                    formData.username === "" ? "bg-gray-400" : "bg-black"
                  }`}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="border border-stone-300 rounded-md w-full p-2"
              />

              <div className="flex gap-3">
                <button
                  onClick={prevStep}
                  className="border border-stone-300 rounded-md p-2 w-full"
                >
                  Back
                </button>

                <button
                  onClick={() => console.log(formData)}
                  disabled={formData.password === ""}
                  className={`rounded-md p-2 text-white w-full ${
                    formData.password === "" ? "bg-gray-400" : "bg-green-600"
                  }`}
                >
                  Submit
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

      {/* RIGHT SIDE */}
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
