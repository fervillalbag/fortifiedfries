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
          <Text className="text-[26px] uppercase font-medium text-@sura-primary-900">
            Sura
          </Text>
          <button className="border p-2 rounded-md border-@sura-primary-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
