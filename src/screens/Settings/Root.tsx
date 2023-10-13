import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { AuthenticatedContext } from "../../context";
import BackBtn from "../../components/BackBtn";

export default function Root() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthenticatedContext);

  return (
    <div>
      <BackBtn title="Ajustes" />

      <button
        onClick={() => {
          logout();
          toast("Has cerrado sesion", {
            icon: "👀",
          });
          navigate("/");
        }}
      >
        cerrar sesion
      </button>
    </div>
  );
}
