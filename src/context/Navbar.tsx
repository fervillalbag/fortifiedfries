import { createContext, useState } from "react";

export const NavbarContext = createContext<any>(null);

interface NavbarProviderProps {
  children: React.ReactNode;
}

export default function NavbarProvider({
  children,
}: NavbarProviderProps) {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  return (
    <NavbarContext.Provider
      value={{
        showNavbar,
        setShowNavbar,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}
