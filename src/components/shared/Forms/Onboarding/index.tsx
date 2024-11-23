"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    languages: "",
    specialization: "",
    phone: "",
    email: "",
  });

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};
    let isValid = false;

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = "Name is required";
        } else if (formData.name.length < 2) {
          newErrors.name = "Name must be at least 2 characters";
        }
        break;
      case 2:
        if (!formData.experience.trim()) {
          newErrors.experience = "Experience details are required";
        } else if (formData.experience.length < 50) {
          newErrors.experience =
            "Please provide at least 50 characters of experience";
        }
        break;
      case 3:
        if (!formData.languages.trim()) {
          newErrors.languages = "Languages are required";
        }
        if (!formData.specialization.trim()) {
          newErrors.specialization = "Specialization is required";
        }
        break;
      case 4:
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone.trim())) {
          newErrors.phone = "Please enter a valid 10-digit phone number";
        }
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        break;
    }

    setErrors(newErrors);
    isValid = Object.keys(newErrors).length === 0;

    if (isValid) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
    }

    return isValid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const nextStep = () => {
    if (validateStep(step) && step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const steps = [
    "Basic Information",
    "Professional Background",
    "Expertise Details",
    "Contact Information",
  ];

  const renderError = (field: string) => {
    if (errors[field]) {
      return (
        <Alert
          variant="destructive"
          className="mt-2 flex items-center space-x-2"
        >
          <XCircle className="h-4 w-4" />
          <AlertDescription>{errors[field]}</AlertDescription>
        </Alert>
      );
    }
    return null;
  };

  const renderStepIndicator = (index: number) => {
    const isCompleted = completedSteps.has(index + 1);
    const isActive = step === index + 1;

    return (
      <div className="flex flex-col items-center relative">
        <div
          className={`relative z-10 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-500 ${
            isCompleted
              ? "bg-green-500"
              : isActive
              ? "bg-orange-500"
              : "bg-gray-200"
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-6 w-6 text-white animate-scale" />
          ) : (
            <span
              className={`text-sm ${isActive ? "text-white" : "text-gray-600"}`}
            >
              {index + 1}
            </span>
          )}
        </div>
        <span
          className={`text-xs mt-2 transition-all duration-500 ${
            isActive
              ? "text-orange-500 font-bold scale-110"
              : isCompleted
              ? "text-green-500 font-medium"
              : "text-gray-500"
          }`}
        >
          Step {index + 1}
        </span>
        <span
          className={`text-sm mt-1 text-center transition-all duration-500 ${
            isActive
              ? "text-orange-500 font-bold"
              : isCompleted
              ? "text-green-500 font-medium"
              : "text-gray-500"
          }`}
        >
          {steps[index]}
        </span>
        {index < steps.length - 1 && (
          <div
            className={`absolute z-0 top-4 left-0 w-full h-0.5 transition-all duration-500 ${
              isCompleted
                ? "bg-green-500"
                : step > index + 1
                ? "bg-orange-500"
                : "bg-gray-200"
            }`}
            style={{ width: "100%", transform: "translateX(50%)" }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur">
        <CardHeader>
          <div className="flex justify-between mb-8 relative">
            {steps.map((_, index) => (
              <div key={index} className="flex-1">
                {renderStepIndicator(index)}
              </div>
            ))}
          </div>

          <CardTitle className="text-3xl font-bold text-center text-orange-800 transition-all duration-300">
            {steps[step - 1]}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6">
            <div
              className={`transition-all duration-500 transform ${
                step === 1
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 hidden"
              }`}
            >
              <div className="space-y-4">
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-4 pr-10 border-2 rounded-lg transition-all focus:ring-2 focus:ring-orange-200 ${
                        errors.name
                          ? "border-red-500"
                          : completedSteps.has(1)
                          ? "border-green-500"
                          : "border-orange-200 focus:border-orange-500"
                      }`}
                      placeholder="Full Name"
                    />
                    {completedSteps.has(1) && !errors.name && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {renderError("name")}
                </div>
              </div>
            </div>

            {/* Similar pattern for other steps... */}
            {/* Step 2 */}
            <div
              className={`transition-all duration-500 transform ${
                step === 2
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 hidden"
              }`}
            >
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`w-full p-4 pr-10 border-2 rounded-lg h-32 transition-all focus:ring-2 focus:ring-orange-200 ${
                      errors.experience
                        ? "border-red-500"
                        : completedSteps.has(2)
                        ? "border-green-500"
                        : "border-orange-200 focus:border-orange-500"
                    }`}
                    placeholder="Tell us about your experience as a tour guide..."
                  />
                  {completedSteps.has(2) && !errors.experience && (
                    <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                  )}
                  {renderError("experience")}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className={`transition-all duration-500 transform ${
                step === 3
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 hidden"
              }`}
            >
              <div className="space-y-4">
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      name="languages"
                      value={formData.languages}
                      onChange={handleInputChange}
                      className={`w-full p-4 pr-10 border-2 rounded-lg mb-4 transition-all focus:ring-2 focus:ring-orange-200 ${
                        errors.languages
                          ? "border-red-500"
                          : completedSteps.has(3)
                          ? "border-green-500"
                          : "border-orange-200 focus:border-orange-500"
                      }`}
                      placeholder="Languages you speak (comma separated)"
                    />
                    {completedSteps.has(3) && !errors.languages && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {renderError("languages")}
                  <div className="relative">
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className={`w-full p-4 pr-10 border-2 rounded-lg transition-all focus:ring-2 focus:ring-orange-200 ${
                        errors.specialization
                          ? "border-red-500"
                          : completedSteps.has(3)
                          ? "border-green-500"
                          : "border-orange-200 focus:border-orange-500"
                      }`}
                      placeholder="Your specialization in Mithila art"
                    />
                    {completedSteps.has(3) && !errors.specialization && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {renderError("specialization")}
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div
              className={`transition-all duration-500 transform ${
                step === 4
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 hidden"
              }`}
            >
              <div className="space-y-4">
                <div className="relative">
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-4 pr-10 border-2 rounded-lg mb-4 transition-all focus:ring-2 focus:ring-orange-200 ${
                        errors.phone
                          ? "border-red-500"
                          : completedSteps.has(4)
                          ? "border-green-500"
                          : "border-orange-200 focus:border-orange-500"
                      }`}
                      placeholder="Phone Number"
                    />
                    {completedSteps.has(4) && !errors.phone && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {renderError("phone")}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-4 pr-10 border-2 rounded-lg transition-all focus:ring-2 focus:ring-orange-200 ${
                        errors.email
                          ? "border-red-500"
                          : completedSteps.has(4)
                          ? "border-green-500"
                          : "border-orange-200 focus:border-orange-500"
                      }`}
                      placeholder="Email Address"
                    />
                    {completedSteps.has(4) && !errors.email && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {renderError("email")}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  step === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                }`}
                disabled={step === 1}
              >
                Previous
              </button>
              <button
                onClick={step === 4 ? () => validateStep(4) : nextStep}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  step === 4
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {step === 4 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
