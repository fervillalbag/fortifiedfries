import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface AlertProps {
  title: string;
  description?: string;
  t: any;
  type: "error" | "success";
  duration?: number;
}

export default function Alert({
  title,
  description,
  t,
  type,
  duration,
}: AlertProps) {
  useEffect(() => {
    setTimeout(() => {
      toast.dismiss(t.id);
    }, duration);
  }, []);

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full ${
        type === "success" ? "bg-green-100" : "bg-red-100"
      } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src={`/icons/icon-${
                type === "success" ? "success" : "error"
              }.svg`}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-base font-medium text-gray-900">
              {title}
            </p>
            <p
              data-test="register-alert-feedback"
              className="text-sm text-gray-500"
            >
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className={`w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium ${
            type === "success"
              ? "text-green-800 hover:text-green-500 focus:ring-green-500"
              : "text-red-800 hover:text-red-500 focus:ring-red-500"
          } focus:outline-none focus:ring-2`}
        >
          Close
        </button>
      </div>
    </div>
  );
}
