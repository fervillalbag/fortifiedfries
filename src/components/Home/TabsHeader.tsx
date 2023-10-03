import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Link } from "react-router-dom";

export default function TabsHeader() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  return (
    <div
      className={`sticky top-0 left-0 flex items-center gap-x-[22px] px-5 py-4 bg-white z-50 ${
        scrollPosition < 60 ? "" : "shadow-md shadow-neutral-500/10"
      }`}
    >
      <Link
        to="/home"
        className={`${
          location.pathname === "/home"
            ? "font-medium text-lg text-@sura-primary-900"
            : "font-normal text-@sura-primary-300"
        }`}
      >
        Productos
      </Link>
      <Link
        to="/services"
        className={`${
          location.pathname === "/services"
            ? "font-medium text-lg text-@sura-primary-900"
            : "font-normal text-@sura-primary-300"
        }`}
      >
        Servicios
      </Link>
      <Link
        to="/community"
        className={`${
          location.pathname === "/community"
            ? "font-medium text-lg text-@sura-primary-900"
            : "font-normal text-@sura-primary-300"
        }`}
      >
        Comunidad
      </Link>
    </div>
  );
}
