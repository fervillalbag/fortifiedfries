import { WindowSizeProvider } from "./context";
import AppRoute from "./routes";

function App() {
  return (
    <WindowSizeProvider>
      <AppRoute />
    </WindowSizeProvider>
  );
}

export default App;
