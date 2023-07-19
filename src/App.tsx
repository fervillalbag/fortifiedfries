import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { WindowSizeProvider } from "./context";
import AppRoute from "./routes";
import { LazyMotion, domAnimation } from "framer-motion";

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
      <LazyMotion strict features={domAnimation}>
        <WindowSizeProvider>
          <AppRoute />
          <Toaster position="top-center" reverseOrder={false} />
        </WindowSizeProvider>
      </LazyMotion>
    </QueryClientProvider>
  );
}

export default App;
