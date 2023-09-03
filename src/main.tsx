import ReactDOM from "react-dom/client";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import App from "./App";
import "./index.css";
import { AuthenticatedProvider } from "./context";

import "react-lazy-load-image-component/src/effects/blur.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthenticatedProvider>
      <App />
    </AuthenticatedProvider>
  </QueryClientProvider>
);
