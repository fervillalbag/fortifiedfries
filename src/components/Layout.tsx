import { useEffect, useState } from "react";
import { Navbar } from "./";
import { NURA_AUTH_TOKEN } from "../utils/constants/auth";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  useEffect(() => {
    localStorage.getItem(NURA_AUTH_TOKEN)
      ? setShowNavbar(true)
      : setShowNavbar(false);
  }, []);

  return (
    <div className="pb-[70px]">
      {children}
      {showNavbar && <Navbar />}
    </div>
  );
}
