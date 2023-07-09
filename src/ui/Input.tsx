import React, { InputHTMLAttributes } from "react";
import { textVariants } from "./";
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
      <label
        htmlFor={label}
        className={textVariants({
          className: "text-sm block mb-2",
        })}
      >
        <span className="underline underline-offset-2">
          {label.charAt(0)}
        </span>
        {label.slice(1, label.length)}
      </label>
      <input
        type="text"
        id={label}
        className="px-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-@sura-border focus-visible:outline-transparent w-full border-2 border-@sura-border-light rounded-md h-[54px]"
        {...props}
      />
    </div>
  );
};

export default Input;
