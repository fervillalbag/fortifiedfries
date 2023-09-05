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
          <button className="flex items-center">
            <Text className="tracking-wider text-[26px] uppercase font-semibold text-@sura-primary-900">
              Sura
            </Text>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0002 15.1211C11.8689 15.1212 11.7388 15.0954 11.6175 15.0451C11.4962 14.9948 11.386 14.9211 11.2932 14.8281L7.05024 10.5861C6.86809 10.3975 6.76729 10.1449 6.76957 9.88267C6.77185 9.62047 6.87702 9.36966 7.06242 9.18425C7.24783 8.99884 7.49865 8.89367 7.76084 8.8914C8.02304 8.88912 8.27564 8.98991 8.46424 9.17207L12.0002 12.7071L15.5362 9.17207C15.7248 8.98991 15.9774 8.88912 16.2396 8.8914C16.5018 8.89367 16.7527 8.99884 16.9381 9.18425C17.1235 9.36966 17.2286 9.62047 17.2309 9.88267C17.2332 10.1449 17.1324 10.3975 16.9502 10.5861L12.7072 14.8281C12.6145 14.9211 12.5043 14.9948 12.383 15.0451C12.2616 15.0954 12.1316 15.1212 12.0002 15.1211Z"
                fill="black"
              />
            </svg>
          </button>
          <button className="border p-2 rounded-md bg-@sura-primary-50">
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
