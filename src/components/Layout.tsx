import { useEffect } from "react";
import { m } from "framer-motion";

import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../utils/constants/auth";
import { useLocalStorageState } from "../hooks";
import { transitionLayoutPage } from "../utils/animation";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // const { isAuthenticated } = useContext(AuthenticatedContext);

  const [_, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  useEffect(() => {
    handleUpdateForm(authInitialValue);
  }, []);

  return (
    <div className="min-h-screen">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transitionLayoutPage}
      >
        {children}
      </m.div>

      <Navbar />

      <div className="h-14"></div>
    </div>
  );
}
