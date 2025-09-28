"use client";
import { useState } from "react";
import Image from "next/image";

interface Step {
  title: string;
  description: string;
  image?: string;
}

interface OnboardingStepperProps {
  steps: Step[];
  onFinish: () => void;
}

export default function OnboardingStepper({
  steps,
  onFinish,
}: OnboardingStepperProps) {
  const [step, setStep] = useState(0);

  // Ukuran fixed untuk semua gambar
  const IMAGE_WIDTH = 320;
  const IMAGE_HEIGHT = 320;

  return (
    <div className="max-w-md md:max-w-4xl mx-auto p-4 md:p-6 bg-white flex flex-col md:flex-row items-center gap-6">
      {/* Image Column */}
      {steps[step].image && (
        <div className="w-full md:w-1/2 flex justify-center">
          <div
            className="relative"
            style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
          >
            <Image
              src={steps[step].image!}
              alt={`Onboarding step ${step + 1}`}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      )}

      {/* Text & Stepper */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-center md:text-left">
            {steps[step].title}
          </h2>
          <p className="text-gray-700 mb-4 text-center md:text-left">
            {steps[step].description}
          </p>

          {/* Step Indicator */}
          <div className="flex justify-center md:justify-start space-x-2 mb-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === step ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Sebelumnya
            </button>
          )}

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-auto"
            >
              Berikutnya
            </button>
          ) : (
            <button
              onClick={onFinish}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-auto"
            >
              Mulai
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
