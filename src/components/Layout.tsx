import { useEffect } from "react";
import { m } from "framer-motion";
import { useLocation } from "react-router-dom";

import {
  SURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../utils/constants/auth";
import { useLocalStorageState } from "../hooks";
import { transitionLayoutPage } from "../utils/animation";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const [_, handleUpdateForm] = useLocalStorageState({
    key: SURA_AUTH_REGISTER_INFO,
  });

  useEffect(() => {
    handleUpdateForm(authInitialValue);
  }, []);

  const initialAnimation =
    location.pathname === "/services" ||
    location.pathname === "/home" ||
    location.pathname === "/community"
      ? {}
      : { opacity: 0 };

  const animateAnimation =
    location.pathname === "/services" ||
    location.pathname === "/home" ||
    location.pathname === "/community"
      ? {}
      : { opacity: 1 };

  const exitAnimation =
    location.pathname === "/services" ||
    location.pathname === "/home" ||
    location.pathname === "/community"
      ? {}
      : { opacity: 0 };

  return (
    <div className="min-h-screen">
      <m.div
        initial={initialAnimation}
        animate={animateAnimation}
        exit={exitAnimation}
        transition={transitionLayoutPage}
      >
        {children}
      </m.div>

      <Navbar />

      <div className="h-[68px]"></div>
    </div>
  );
}
