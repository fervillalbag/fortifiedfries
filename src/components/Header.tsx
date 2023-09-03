import { useContext, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { Text } from "../ui";
import { useNavigate } from "react-router-dom";
import { NavbarContext } from "../context";

export default function Header() {
  const navigate = useNavigate();
  const { setShowNavbar } = useContext(NavbarContext);

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  return (
    <div>
      <div className="h-[68px]" />

      <div
        className={`p-5 py-3 fixed w-screen top-0 z-50 ${
          scrollPosition > 10
            ? "bg-white shadow-md shadow-neutral-500/10"
            : ""
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <button
              className="h-11 w-11 rounded-md bg-transparent border border-@sura-primary-600 grid place-items-center"
              onClick={() => navigate("/profile")}
            >
              <svg
                width="16"
                height="23"
                viewBox="0 0 16 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6667 6.66667C14.6667 4.82533 13.92 3.15867 12.7147 1.95333C11.508 0.746667 9.84133 0 8 0C6.15867 0 4.492 0.746667 3.28533 1.95333C2.08 3.15867 1.33333 4.82533 1.33333 6.66667C1.33333 8.508 2.08 10.1747 3.28533 11.38C4.492 12.5867 6.15867 13.3333 8 13.3333C9.84133 13.3333 11.508 12.5867 12.7147 11.38C13.3345 10.7617 13.826 10.027 14.161 9.21811C14.496 8.40924 14.6678 7.54215 14.6667 6.66667ZM0 20C0 21.3333 3 22.6667 8 22.6667C12.6907 22.6667 16 21.3333 16 20C16 17.3333 12.8613 14.6667 8 14.6667C3 14.6667 0 17.3333 0 20Z"
                  fill="#303643"
                />
              </svg>
            </button>
          </div>
          <Text className="text-2xl uppercase font-bold text-@sura-primary-900">
            Sura
          </Text>
          <button
            onClick={() => setShowNavbar(true)}
            className="grid place-items-center h-11 w-11 rounded-md bg-@sura-primary-50 border border-@sura-primary-300"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 9H27M5 16H27M16 23H27"
                stroke="#1C2331"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
