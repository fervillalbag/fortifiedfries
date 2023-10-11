import { useState, createContext } from "react";
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
  >(value.token ? true : false);

  return (
    <AuthenticatedContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthenticatedContext.Provider>
  );
}
