import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const specializations = [
  "Traditional Mithila Painting",
  "Contemporary Mithila Art",
  "Mithila Art History",
  "Mithila Art Workshops",
  "Mithila Art in Modern Context",
];

interface FormData {
  specializations: string[];
}

export default function Specialization({
  formData,
  onChange,
}: {
  formData: FormData;
  onChange: (field: string, value: string[]) => void;
}) {
  const handleSpecializationChange = (specialization: string) => {
    const updatedSpecializations = formData.specializations.includes(
      specialization
    )
      ? formData.specializations.filter((s: string) => s !== specialization)
      : [...formData.specializations, specialization];
    onChange("specializations", updatedSpecializations);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-amber-800 mb-6">Specialization</h2>
      <div className="space-y-4">
        <Label>Select Your Specializations</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specializations.map((specialization) => (
            <div key={specialization} className="flex items-center space-x-2">
              <Checkbox
                id={specialization}
                checked={formData.specializations.includes(specialization)}
                onCheckedChange={() =>
                  handleSpecializationChange(specialization)
                }
              />
              <label
                htmlFor={specialization}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {specialization}
              </label>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
