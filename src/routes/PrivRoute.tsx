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
      // @ts-ignore
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Principal />
      }
    />
  );
}
