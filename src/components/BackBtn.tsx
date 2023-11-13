import { useNavigate } from "react-router-dom";

interface BackBtnProps {
  title?: string;
  onClick?: () => void;
}

export default function BackBtn({ title, onClick }: BackBtnProps) {
  const navigate = useNavigate();

  return (
    <div className="p-5 flex items-center gap-x-3">
      <button
        className="w-[45px] h-[45px] bg-@sura-primary-900 rounded-md text-white grid place-items-center"
        onClick={!onClick ? () => navigate(-1) : onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <p className="text-[22px] text-@sura-primary-900">{title}</p>
    </div>
  );
}
