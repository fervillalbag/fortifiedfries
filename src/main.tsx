import ReactDOM from "react-dom/client";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";
import { AuthenticatedProvider, NavbarProvider } from "./context";

import "react-lazy-load-image-component/src/effects/blur.css";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AnimatePresence>
      <NavbarProvider>
        <AuthenticatedProvider>
          <App />
          <Toaster
            position="top-center"
            reverseOrder={false}
            containerStyle={{
              textAlign: "center",
            }}
          />
        </AuthenticatedProvider>
      </NavbarProvider>
    </AnimatePresence>
  </QueryClientProvider>
);
