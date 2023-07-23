import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AuthenticatedProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthenticatedProvider>
    <App />
  </AuthenticatedProvider>
);
