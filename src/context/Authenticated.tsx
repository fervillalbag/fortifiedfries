import { useEffect, useState, createContext } from "react";
import { NURA_AUTH_USER_INFO } from "../utils/constants/auth";

export const AuthenticatedContext = createContext<any>(null);

interface AuthenticatedProps {
  children?: React.ReactNode;
}

export default function AuthenticatedProvider({
  children,
}: AuthenticatedProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<
    boolean | null
  >(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(
      localStorage.getItem(NURA_AUTH_USER_INFO) ? true : false
    );
  }, [isLogged]);

  return (
    <AuthenticatedContext.Provider
      value={{
        isLogged,
        setIsLogged,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthenticatedContext.Provider>
  );
}
