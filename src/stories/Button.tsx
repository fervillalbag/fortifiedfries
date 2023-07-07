import { Button } from "../ui";
import "../index.css";

interface ButtonProps {
  variant?: "default" | "outline";
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
}

export const ButtonStory = ({
  variant,
  label,
  backgroundColor,
}: ButtonProps) => {
  return (
    <Button
      variant={variant}
      style={backgroundColor ? { backgroundColor } : {}}
    >
      {label}
    </Button>
  );
};
