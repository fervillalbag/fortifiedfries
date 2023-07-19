import { Route } from "react-router-dom";
import { Principal } from "../screens/Register";

export default function PrivRoute({
  component: Component,
  isAuthenticated,
  ...rest
}: any) {
  return (
    <Route
      {...rest}
      render={(props: any) =>
        isAuthenticated ? <Component {...props} /> : <Principal />
      }
    />
  );
}
