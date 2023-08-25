import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { AuthenticatedContext } from "../../context";
import { client } from "../../../supabase/client";

export default function Root() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthenticatedContext);

  const handleLogout = async () => {
    try {
      const { error } = await client.auth.signOut();

      if (error) {
        toast.error("Error al cerrar sesión");
      } else {
        toast("Has cerrado sesion", {
          icon: "👀",
        });
      }
    } catch (error: any) {
      toast.error("Error al cerrar sesión");
    }
  };

  return (
    <div>
      <div>settings</div>
      <button
        onClick={() => {
          handleLogout();
          setIsAuthenticated(false);
          navigate("/");
        }}
      >
        cerrar sesion
      </button>
    </div>
  );
}
