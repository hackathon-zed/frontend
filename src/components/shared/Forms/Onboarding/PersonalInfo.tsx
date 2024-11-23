import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function PersonalInfo({
  formData,
  onChange,
}: PersonalInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-amber-800 mb-6">
        Personal Information
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full p-2 border border-amber-300 rounded-md"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full p-2 border border-amber-300 rounded-md"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full p-2 border border-amber-300 rounded-md"
          />
        </div>
      </div>
    </motion.div>
  );
}
