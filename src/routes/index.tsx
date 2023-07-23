import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, NotFound } from "../screens";
import {
  LIST_ROUTES_AUTHENTICATED,
  LIST_ROUTES_UNAUTHENTICATED,
} from "./list";

interface AppRouteProps {
  isAuthenticated: boolean | null;
}

export default function AppRoute({ isAuthenticated }: AppRouteProps) {
  return (
    <>
      {isAuthenticated === null && (
        <div className="fixed grid place-items-center w-screen h-screen top-0 left-0 bg-slate-50">
          Cargando..
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />

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
