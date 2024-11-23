import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const languages = ["English", "Hindi", "Maithili", "Bengali", "Other"];

interface ExperienceProps {
  formData: {
    yearsOfExperience: string;
    languages: string[];
  };
  onChange: (field: string, value: string | string[]) => void;
}

export default function Experience({ formData, onChange }: ExperienceProps) {
  const handleLanguageChange = (language: string) => {
    const updatedLanguages = formData.languages.includes(language)
      ? formData.languages.filter((l: string) => l !== language)
      : [...formData.languages, language];
    onChange("languages", updatedLanguages);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-amber-800 mb-6">Experience</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Input
            id="yearsOfExperience"
            type="number"
            value={formData.yearsOfExperience}
            onChange={(e) => onChange("yearsOfExperience", e.target.value)}
            className="w-full p-2 border border-amber-300 rounded-md"
          />
        </div>
        <div>
          <Label>Languages Spoken</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {languages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={formData.languages.includes(language)}
                  onCheckedChange={() => handleLanguageChange(language)}
                />
                <label
                  htmlFor={language}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {language}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
