import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotFound } from "../screens";
import {
  LIST_ROUTES_AUTHENTICATED,
  LIST_ROUTES_UNAUTHENTICATED,
} from "./list";
import { useLocalStorageState } from "../hooks";
import { SURA_AUTH_TOKEN } from "../utils/constants/auth";

export default function AppRoute() {
  const [value] = useLocalStorageState({
    key: SURA_AUTH_TOKEN,
  });

  return (
    <BrowserRouter>
      <Routes>
        {!value.token
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
  );
}
