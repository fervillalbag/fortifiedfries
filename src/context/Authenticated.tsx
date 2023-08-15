import { useEffect, useState, createContext } from "react";
import { client } from "../../supabase/client";

export const AuthenticatedContext = createContext<any>(null);

interface AuthenticatedProps {
  children?: React.ReactNode;
}

export default function AuthenticatedProvider({
  children,
}: AuthenticatedProps) {
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await client.auth.getSession();

      if (data) return setIsAuthenticated(true);
      setIsAuthenticated(false);
    })();
  }, []);

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
