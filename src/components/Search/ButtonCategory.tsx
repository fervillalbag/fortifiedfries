import { Button, buttonVariants } from "../../ui";

interface ButtonCategoryProps {
  title: string;
  subtitle: string;
}

export default function ButtonCategory({
  title,
  subtitle,
}: ButtonCategoryProps) {
  return (
    <Button
      className={buttonVariants({
        variant: "default",
        className: "bg-white flex-col border border-b-4 h-[100px]",
      })}
    >
      <span className="block text-lg text-@sura-primary-900">
        {title}
      </span>
      <span className="block text-sm text-@sura-primary-300">
        {subtitle}
      </span>
    </Button>
  );
}
