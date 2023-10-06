import { useEffect } from "react";
import { m } from "framer-motion";

import {
  SURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../utils/constants/auth";
import { useLocalStorageState } from "../hooks";
import {
  animateAnimation,
  exitAnimation,
  initialAnimation,
  transitionLayoutPage,
} from "../utils/animation";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [_, handleUpdateForm] = useLocalStorageState({
    key: SURA_AUTH_REGISTER_INFO,
  });

  useEffect(() => {
    handleUpdateForm(authInitialValue);
  }, []);

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
