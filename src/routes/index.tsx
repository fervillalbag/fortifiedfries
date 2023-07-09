import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Text, buttonVariants, textVariants } from "../ui";
import { Principal, Email } from "../screens/Register";
import Root from "../screens/Root";
import Gender from "../screens/Register/Gender";
import Password from "../screens/Register/Password";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/register" element={<Principal />} />
        <Route path="/register-email" element={<Email />} />
        <Route path="/register-gender" element={<Gender />} />
        <Route path="/register-password" element={<Password />} />
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
  );
};

export default AppRoute;
