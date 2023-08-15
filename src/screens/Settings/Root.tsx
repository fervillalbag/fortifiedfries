import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthenticatedContext } from "../../context";
import { client } from "../../../supabase/client";

export default function Root() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthenticatedContext);

  const handleLogout = async () => {
    try {
      const { error } = await client.auth.signOut();

      if (error) {
        console.error("Error al cerrar sesión:", error.message);
      } else {
        console.log("Sesión cerrada exitosamente");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
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
