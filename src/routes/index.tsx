import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Root from "../screens/Root";
import {
  Gender,
  Password,
  Principal,
  Email,
  Name,
} from "../screens/Register";
import { Email as EmailLogin } from "../screens/Login";
import { Home, NotFound } from "../screens";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />

        <Route path="/register" element={<Principal />} />
        <Route path="/register-name" element={<Name />} />
        <Route path="/register-email" element={<Email />} />
        <Route path="/register-gender" element={<Gender />} />
        <Route path="/register-password" element={<Password />} />

        <Route path="/login-email" element={<EmailLogin />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
