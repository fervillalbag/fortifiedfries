import { useContext, useEffect } from "react";
import { m } from "framer-motion";

import { Navbar } from "./";
import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../utils/constants/auth";
import { useLocalStorageState } from "../hooks";
import { transitionLayoutPage } from "../utils/animation";
import { AuthenticatedContext } from "../context";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useContext(AuthenticatedContext);

  const [_, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  useEffect(() => {
    handleUpdateForm(authInitialValue);
  }, []);

  return (
    <div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transitionLayoutPage}
      >
        {children}

        <div className="h-[70px] bg-transparent" aria-hidden="true" />
      </m.div>

      {isAuthenticated ? <Navbar /> : null}
    </div>
  );
}
