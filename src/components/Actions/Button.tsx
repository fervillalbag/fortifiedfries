interface ButtonProps {
  title?: string;
  description?: string;
  onClick?: () => void;
}

export default function Button({
  title,
  description,
  onClick,
}: ButtonProps) {
  return (
    <button
      className="w-full border border-@sura-primary-200 rounded-md p-4 flex flex-col items-start mb-5"
      onClick={onClick}
    >
      <span className="block text-xl text-@sura-primary-900 font-bold">
        {title}
      </span>
      <span className="text-left block text-sm text-@sura-primary-300 mt-2">
        {description}
      </span>
    </button>
  );
}
