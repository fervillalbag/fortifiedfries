import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { Text } from "../ui";

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  return (
    <div
      className={`p-5 py-4 sticky top-0 z-50 transition-all duration-100 ${
        scrollPosition > 10
          ? "bg-white shadow-md shadow-neutral-300/50"
          : ""
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" rx="5" fill="#303643" />
            <path
              d="M30.6667 19.6667C30.6667 17.8253 29.92 16.1587 28.7147 14.9533C27.508 13.7467 25.8413 13 24 13C22.1587 13 20.492 13.7467 19.2853 14.9533C18.08 16.1587 17.3333 17.8253 17.3333 19.6667C17.3333 21.508 18.08 23.1747 19.2853 24.38C20.492 25.5867 22.1587 26.3333 24 26.3333C25.8413 26.3333 27.508 25.5867 28.7147 24.38C29.3345 23.7617 29.826 23.027 30.161 22.2181C30.496 21.4092 30.6678 20.5422 30.6667 19.6667ZM16 33C16 34.3333 19 35.6667 24 35.6667C28.6907 35.6667 32 34.3333 32 33C32 30.3333 28.8613 27.6667 24 27.6667C19 27.6667 16 30.3333 16 33Z"
              fill="white"
            />
          </svg>
        </div>
        <Text className="text-3xl uppercase font-bold text-@sura-primary-900">
          Sura
        </Text>
        <button className="grid place-items-center h-12 w-12 rounded-md bg-@sura-primary-50 shadow-[0px_0px_4px_0px_rgba(0,_0,_0,_0.10)]">
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
  );
}
