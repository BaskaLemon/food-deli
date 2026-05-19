"use client";
import { useState } from "react";
import EnterEmail from "../components/EnterEmail";

export default function Create() {
  const [currentStep, setCurrentStep] = useState(1);
  return <div>{currentStep === 1 && <EnterEmail />}</div>;
}
