import { forwardRef, ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "../utils";
import { Link } from "react-router-dom";

interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  to?: string;
  icon?: string;
}

export const buttonVariants = cva(
  "font-sans font-medium w-full h-16 rounded-md bg-@sura-primary-900 flex items-center justify-center text-xl focus:ring-2 focus:border-@sura-primary-900 focus:ring-transparent",
  {
    variants: {
      variant: {
        default:
          "text-white bg-@sura-primary-900 border-2 border-@sura-primary-900",
        outline:
          "bg-white text-@sura-primary-900 border-2 border-@sura-primary-200",
        icon: "bg-white text-@sura-primary-900 border-2 border-@sura-primary-200 flex items-center justify-center",
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
  (
    { className, children, to, variant, size, icon, ...props },
    ref
  ) => {
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

    if (icon) {
      return (
        <button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          <img
            src={`/icons/${icon}.svg`}
            alt=""
            className="w-9 h-9 object-contain mr-2"
          />
          {children}
        </button>
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
