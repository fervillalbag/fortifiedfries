import { useState, createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks";
import { SURA_AUTH_TOKEN } from "../utils/constants/auth";

export const AuthenticatedContext = createContext<any>(null);

interface AuthenticatedProps {
  children?: React.ReactNode;
}

export default function AuthenticatedProvider({
  children,
}: AuthenticatedProps) {
  const [value] = useLocalStorageState({
    key: SURA_AUTH_TOKEN,
  });

  const [isAuthenticated, setIsAuthenticated] = useState<
    boolean | null
  >(value?.token ? true : false);

  useEffect(() => {
    setIsAuthenticated(value?.token ? true : false);
  }, [value]);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(SURA_AUTH_TOKEN);
  };

  return (
    <AuthenticatedContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthenticatedContext.Provider>
  );
}
