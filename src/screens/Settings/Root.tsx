import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthenticatedContext } from "../../context";
import { NURA_AUTH_USER_INFO } from "../../utils/constants/auth";

export default function Root() {
  const navigate = useNavigate();
  const { setIsLogged, setIsAuthenticated } = useContext(
    AuthenticatedContext
  );

  return (
    <div>
      <div>settings</div>
      <button
        onClick={() => {
          setIsLogged(false);
          setIsAuthenticated(false);
          localStorage.setItem(NURA_AUTH_USER_INFO, "");
          navigate("/");
        }}
      >
        cerrar sesion
      </button>
    </div>
  );
}
