import React, { InputHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { Text } from "../ui";

import { cn } from "../utils";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  isLoading?: boolean;
  label?: string;
}

function Spinner() {
  return (
    <div className="lds-ring-dark">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export const inputVariants = cva(
  "px-4 focus-visible:border-@sura-primary-900 focus-visible:outline-transparent w-full border-2 border-@sura-primary-200 rounded-md",
  {
    variants: {
      variant: {
        default: "h-16",
        md: "h-14",
        gray: "bg-red-500",
        ui: "bg-transparent border-0 ring-0 outline-none mt-[2px] px-0 pl-[14px] text-@sura-primary-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Input: React.FC<InputProps> = ({
  variant,
  isLoading,
  label,
  ...props
}) => {
  return (
    <div
      className={`relative ${
        variant === "ui"
          ? "bg-[#eaebeb] h-[60px] rounded-md"
          : "bg-transparent"
      }`}
    >
      {variant === "ui" && (
        <Text className="text-xs font-medium text-@sura-primary-900 pt-[10px] pl-[14px]">
          {label}
        </Text>
      )}

      <input
        type="text"
        className={cn(inputVariants({ variant }))}
        {...props}
      />

      <div
        className={`${
          isLoading ? "block" : "hidden"
        } absolute top-1/2 -translate-y-1/2 right-2`}
      >
        <Spinner />
      </div>
    </div>
  );
};

export default Input;
