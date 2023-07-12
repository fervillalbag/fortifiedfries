import React, { InputHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const inputVariants = cva(
  "px-4 focus-visible:border-@sura-primary-900 focus-visible:outline-transparent w-full border-2 border-@sura-primary-200 rounded-md h-16",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Input: React.FC<InputProps> = ({ variant, ...props }) => {
  return (
    <input
      type="text"
      className={cn(inputVariants({ variant }))}
      {...props}
    />
  );
};

export default Input;
