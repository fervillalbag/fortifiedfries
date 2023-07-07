import { forwardRef, ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "../utils";
import { Link } from "react-router-dom";

interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  to?: string;
}

export const buttonVariants = cva(
  "font-sans font-medium w-full h-[58px] rounded-md bg-@sura-primary flex items-center justify-center text-lg",
  {
    variants: {
      variant: {
        default: "text-white",
        outline:
          "bg-white text-@sura-primary border-2 border-@sura-primary",
      },
      size: {
        default: "",
        sm: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ className, children, to, variant, size, ...props }, ref) => {
    if (to) {
      return (
        <Link
          to={to}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;