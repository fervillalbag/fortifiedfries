import { useEffect, useRef } from "react";
import * as Toast from "@radix-ui/react-toast";

import InfoIcon from "../assets/icons/toast-info-icon.svg";
import WarningIcon from "../assets/icons/toast-warning-icon.svg";
import SuccessIcon from "../assets/icons/toast-success-icon.svg";
import ErrorIcon from "../assets/icons/toast-error-icon.svg";
import CloseIcon from "../assets/icons/toast-close-icon.svg";

interface ToastUIProps {
  type: string;
  open: boolean;
  message: string;
  duration?: number;
  setOpen: (value: boolean) => void;
}

export default function ToastUI({
  type,
  open = false,
  message,
  duration = 3000,
  setOpen,
}: ToastUIProps) {
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const icon =
    type === "error"
      ? ErrorIcon
      : type === "success"
      ? SuccessIcon
      : type === "warning"
      ? WarningIcon
      : InfoIcon;

  return (
    <Toast.Provider swipeDirection="down" duration={duration}>
      <Toast.Root
        duration={duration}
        className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="flex items-center gap-3">
          <img src={icon} alt="" className="w-10" />
          <Toast.Title className="[grid-area:_title] font-medium text-@sura-primary-700">
            {message}
          </Toast.Title>
        </div>
        <Toast.Action
          className="[grid-area:_action]"
          asChild
          altText="Goto schedule to undo"
        >
          <button className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11">
            <img src={CloseIcon} alt="" className="w-4" />
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_16px] fixed top-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
}
