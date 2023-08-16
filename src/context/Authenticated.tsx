import { useState, createContext, useEffect } from "react";
import { client } from "../../supabase/client";

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
    (async () => {
      const { data } = await client.auth.getSession();

      if (data.session?.access_token) {
        setIsAuthenticated(true);
        return;
      }

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
