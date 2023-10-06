import { WindowSizeProvider } from "./context";
import AppRoute from "./routes";
import { LazyMotion, domAnimation } from "framer-motion";

function App() {
  return (
    <LazyMotion strict features={domAnimation}>
      <WindowSizeProvider>
        <AppRoute isAuthenticated={false} isLogged={true} />
      </WindowSizeProvider>
    </LazyMotion>
  );
}

export default App;
