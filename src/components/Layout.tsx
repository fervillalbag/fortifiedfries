import { useEffect, useState } from "react";
import { Navbar } from "./";
import { NURA_AUTH_USER_INFO } from "../utils/constants/auth";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const scrollingDown = currentScrollPos > prevScrollPos;

      setIsVisible(scrollingDown);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    localStorage.getItem(NURA_AUTH_USER_INFO)
      ? setShowNavbar(true)
      : setShowNavbar(false);
  }, []);

  return (
    <div>
      {children}
      {showNavbar ? <Navbar isVisible={isVisible} /> : null}
    </div>
  );
}
