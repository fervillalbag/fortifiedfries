import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { WindowSizeProvider } from "./context";
import AppRoute from "./routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WindowSizeProvider>
        <AppRoute />
      </WindowSizeProvider>
    </QueryClientProvider>
  );
}

export default App;
