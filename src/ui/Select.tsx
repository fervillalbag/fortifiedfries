import React from "react";
import { m } from "framer-motion";

interface ValueProps {
  name: string;
}

interface SelectProps {
  show: boolean;
  value: ValueProps;
  setShow: (value: boolean) => void;
  children?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  value,
  children,
  show,
  setShow,
}) => {
  return (
    <div>
      <button
        className="focus-visible:outline-1 outline-@sura-primary-900 z-[60] text-left relative h-[58px] bg-white border border-@sura-primary-600 rounded-md w-full appearance-none px-[14px]"
        onClick={() => setShow(!show)}
      >
        <span>{value.name || "Seleccione una opcion"}</span>
        <span className="absolute top-1/2 -translate-y-1/2 right-[14px]">
          <svg
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-all duration-300 ${
              show ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              d="M5.49426 6.50402C5.36288 6.50464 5.23269 6.47901 5.11134 6.42864C4.98999 6.37827 4.87992 6.30417 4.7876 6.21069L0.160929 1.54402C0.0390743 1.35608 -0.0161537 1.13267 0.00409628 0.909595C0.0243463 0.686523 0.118902 0.476709 0.272608 0.313781C0.426314 0.150853 0.630268 0.0442459 0.851783 0.0110468C1.0733 -0.0221524 1.29955 0.0199794 1.49426 0.130688L5.49426 4.13069L9.49426 0.130688C9.68898 0.0199794 9.91523 -0.0221524 10.1367 0.0110468C10.3583 0.0442459 10.5622 0.150853 10.7159 0.313781C10.8696 0.476709 10.9642 0.686523 10.9844 0.909595C11.0047 1.13267 10.9495 1.35608 10.8276 1.54402L6.16093 6.21069C5.98425 6.38991 5.74576 6.49484 5.49426 6.50402Z"
              fill="#80838A"
            />
          </svg>
        </span>
      </button>

      {show && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-transparent z-50"
          onClick={() => setShow(false)}
        />
      )}

      {show && (
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          className="select-options-container relative z-[60] py-2 bg-white shadow-[0px_0px_4px_0px_rgba(0,_0,_0,_0.30)] px-3 rounded-md mt-[10px]"
        >
          {children}
        </m.div>
      )}
    </div>
  );
};

export default Select;
