import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotFound } from "../screens";
import {
  LIST_ROUTES_AUTHENTICATED,
  LIST_ROUTES_UNAUTHENTICATED,
} from "./list";

interface AppRouteProps {
  isAuthenticated: boolean | null;
  isLogged: boolean | null;
}

export default function AppRoute({ isAuthenticated }: AppRouteProps) {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!isAuthenticated
            ? LIST_ROUTES_UNAUTHENTICATED.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<route.component />}
                />
              ))
            : LIST_ROUTES_AUTHENTICATED.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<route.component />}
                />
              ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
