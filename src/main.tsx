import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { AuthenticatedProvider } from "./context";

import "react-lazy-load-image-component/src/effects/blur.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthenticatedProvider>
    <App />
  </AuthenticatedProvider>
);
