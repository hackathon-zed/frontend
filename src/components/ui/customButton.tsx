import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "bg-transparent border border-gray-200 hover:bg-gray-100",
        ghost: "bg-transparent hover:bg-gray-100",
        link: "bg-transparent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
        iconOnly: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, iconLeft, iconRight, children, ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={`${buttonVariants({ variant, size })} ${className}`}
      {...props}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  )
);
CustomButton.displayName = "CustomButton";

export default CustomButton;
