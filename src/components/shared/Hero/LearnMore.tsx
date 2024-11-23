import { FC } from "react";
import { FaChevronDown } from "react-icons/fa";

interface LearnMoreProps {
  label?: string;
  className?: string;
}

const LearnMore: FC<LearnMoreProps> = ({
  label = "Explore More",
  className,
}) => {
  return (
    <div
      className={`flex flex-col items-center mt-10 select-none animate-bounceSlow ${className}`}
    >
      <span className="text-lg font-medium">{label}</span>
      <FaChevronDown className="mt-2 w-6 h-6 animate-bounceSlow" />
    </div>
  );
};

export default LearnMore;
