"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { ICustomer, IPreferences } from "@/interfaces";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  businessName: z.string().min(2, { message: "Business name is required." }),
  businessType: z.string().min(2, { message: "Business type is required." }),
  products: z.string().min(10, {
    message: "Product description must be at least 10 characters.",
  }),
  accountNumber: z
    .string()
    .regex(/^\d+$/, { message: "Invalid account number." }),
  ifscCode: z.string().regex(/^[A-Za-z]{4}\d{7}$/, {
    message: "Invalid IFSC code format.",
  }),
});

const Onboarding = () => {
  // extract user from url search params
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set<number>());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<ICustomer>({
    email: "",
    businessName: "",
    businessType: "",
    products: "",
    accountNumber: "",
    ifscCode: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};
    let isValid = false;

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        break;
      case 2:
        if (!formData.businessName.trim())
          newErrors.businessName = "Business name is required.";
        if (!formData.businessType.trim())
          newErrors.businessType = "Business type is required.";
        break;
      case 3:
        if (!formData.products.trim())
          newErrors.products = "Product description is required.";
        break;
      case 4:
        if (!formData.accountNumber.trim())
          newErrors.accountNumber = "Account number is required.";
        if (!formData.ifscCode.trim())
          newErrors.ifscCode = "IFSC code is required.";
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      console.log("Form Submitted: ", data);
      toast.success("Seller details submitted successfully!");
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Failed to submit seller details.");
    }
  };

  const steps = [
    "Personal Information",
    "Business Details",
    "Product Details",
    "Bank Account Information",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              {steps.map((_, index) => (
                <div key={index} className="flex-1">
                  <div className="flex items-center justify-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        completedSteps.has(index + 1)
                          ? "bg-green-500"
                          : step === index + 1
                          ? "bg-orange-500"
                          : "bg-gray-200"
                      }`}
                    >
                      {completedSteps.has(index + 1) ? (
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      ) : (
                        <span
                          className={`text-sm ${
                            step === index + 1 ? "text-white" : "text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`text-center text-sm mt-2 ${
                      step === index + 1
                        ? "font-bold text-orange-500"
                        : "text-gray-600"
                    }`}
                  >
                    {steps[index]}
                  </div>
                </div>
              ))}
            </div>
            <CardTitle className="text-center mt-4">
              {steps[step - 1]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border rounded"
                />
              </div>
            )}
            {step === 2 && (
              <div>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border rounded"
                />
                <input
                  type="text"
                  name="businessType"
                  placeholder="Business Type (e.g., Retail, Wholesale)"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border rounded"
                />
              </div>
            )}
            {step === 3 && (
              <div>
                <textarea
                  name="products"
                  placeholder="Describe your products"
                  value={formData.products}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border rounded"
                />
              </div>
            )}
            {step === 4 && (
              <div>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Account Number"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border rounded"
                />
                <input
                  type="text"
                  name="ifscCode"
                  placeholder="IFSC Code"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border rounded"
                />
              </div>
            )}
          </CardContent>
        </Card>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Previous
          </button>
          {step < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-orange-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default Onboarding;
