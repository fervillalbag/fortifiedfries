import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Text, buttonVariants, textVariants } from "./ui";
import { Principal, Email } from "./screens/Register";
import Root from "./screens/Root";
import { WindowSizeProvider } from "./components/context";

function App() {
  return (
    <WindowSizeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/register" element={<Principal />} />
          <Route path="/register-email" element={<Email />} />
          <Route
            path="*"
            element={
              <div className="p-5 grid place-items-center h-screen content-center">
                <Text
                  className={textVariants({
                    variant: "heading",
                    className: "text-center mb-3",
                  })}
                >
                  No se encontraron resultados
                </Text>
                <Link
                  to="/"
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
                  Volver al inicio
                </Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </WindowSizeProvider>
  );
}

export default App;
