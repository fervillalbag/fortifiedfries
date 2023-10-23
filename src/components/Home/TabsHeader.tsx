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
      className={`sticky top-0 left-0 flex items-center gap-x-[15px] px-5 py-4 bg-white z-50 ${
        scrollPosition < 60 ? "" : "shadow-md shadow-neutral-500/10"
      }`}
    >
      <Link
        to="/home"
        className={`bg-@sura-primary-900 rounded-md px-3 py-2 text-sm ${
          location.pathname === "/home"
            ? "bg-@sura-primary-900 text-white"
            : "bg-@sura-primary-50 text-@sura-primary-900"
        }`}
      >
        Productos
      </Link>
      <Link
        to="/services"
        className={`bg-@sura-primary-900 rounded-md px-3 py-2 text-sm ${
          location.pathname === "/services"
            ? "bg-@sura-primary-900 text-white"
            : "bg-@sura-primary-50 text-@sura-primary-900"
        }`}
      >
        Servicios
      </Link>
      <Link
        to="/community"
        className={`bg-@sura-primary-900 rounded-md px-3 py-2 text-sm ${
          location.pathname === "/community"
            ? "bg-@sura-primary-900 text-white"
            : "bg-@sura-primary-50 text-@sura-primary-900"
        }`}
      >
        Comunidad
      </Link>
    </div>
  );
}
