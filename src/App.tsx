import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { WindowSizeProvider } from "./context";
import AppRoute from "./routes";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <WindowSizeProvider>
        <AppRoute />
      </WindowSizeProvider>
    </QueryClientProvider>
  );
}

export default App;
