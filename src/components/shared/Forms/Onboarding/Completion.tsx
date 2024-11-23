import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface CompletionProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    yearsOfExperience: string;
    languages: string[];
    specializations: string[];
  };
}

export default function Completion({ formData }: CompletionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
      >
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
      </motion.div>
      <h2 className="text-2xl font-bold text-amber-800 mb-6">
        Onboarding Complete!
      </h2>
      <p className="text-amber-700 mb-4">
        Thank you for joining our Mithila Art Guide community,{" "}
        {formData.name || "Guide"}!
      </p>
      <p className="text-amber-600">
        We&amp;ll review your information and get back to you soon.
      </p>
      <div className="mt-8 text-left">
        <h3 className="text-xl font-semibold text-amber-800 mb-4">
          Your Submission Summary:
        </h3>
        <ul className="space-y-2">
          <li>
            <strong>Name:</strong> {formData.name || "Not provided"}
          </li>
          <li>
            <strong>Email:</strong> {formData.email || "Not provided"}
          </li>
          <li>
            <strong>Phone:</strong> {formData.phone || "Not provided"}
          </li>
          <li>
            <strong>Years of Experience:</strong>{" "}
            {formData.yearsOfExperience || "Not provided"}
          </li>
          <li>
            <strong>Languages:</strong>{" "}
            {formData.languages.length > 0
              ? formData.languages.join(", ")
              : "Not provided"}
          </li>
          <li>
            <strong>Specializations:</strong>{" "}
            {formData.specializations.length > 0
              ? formData.specializations.join(", ")
              : "Not provided"}
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
