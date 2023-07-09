import React, { InputHTMLAttributes } from "react";
import { cva } from "class-variance-authority";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const buttonVariants = cva(
  "font-sans font-medium w-full h-[58px] rounded-md bg-@sura-primary flex items-center justify-center text-lg focus:ring-2 focus:border-@sura-primary focus:ring-transparent",
  {
    variants: {
      variant: {
        default: "text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div>
      <input
        type="text"
        id={label}
        className="px-4 focus-visible:border-@sura-primary border-b-4 focus-visible:outline-transparent w-full border-2 border-@sura-border rounded-md h-16"
        {...props}
      />
    </div>
  );
};

export default Input;
