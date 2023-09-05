import { useContext } from "react";

import { WindowSizeProvider } from "./context";
import AppRoute from "./routes";
import { LazyMotion, domAnimation } from "framer-motion";
import { AuthenticatedContext } from "./context";

function App() {
  const { isAuthenticated, isLogged } = useContext(
    AuthenticatedContext
  );

  return (
    <LazyMotion strict features={domAnimation}>
      <WindowSizeProvider>
        <AppRoute
          isAuthenticated={isAuthenticated}
          isLogged={isLogged}
        />
      </WindowSizeProvider>
    </LazyMotion>
  );
}

export default App;
