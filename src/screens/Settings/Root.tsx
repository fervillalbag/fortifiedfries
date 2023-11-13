import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import BackBtn from "../../components/BackBtn";
import { AuthenticatedContext } from "../../context";
import { Text } from "../../ui";
import { useHeight } from "../../hooks";

const postsOptions = [
  {
    id: 1,
    name: "Post publicados",
    icon: "/icons/settings-posts.svg",
  },
  {
    id: 2,
    name: "Post favoritos",
    icon: "/icons/settings-saves.svg",
  },
  {
    id: 3,
    name: "Tickets",
    icon: "/icons/settings-ticket.svg",
    link: "/tickets",
  },
];

const infoUserOptions = [
  {
    id: 1,
    name: "Correo electronico",
    icon: "/icons/settings-email.svg",
  },
  {
    id: 2,
    name: "Nombre de usuario",
    icon: "/icons/settings-username.svg",
  },
  {
    id: 3,
    name: "Contraseña",
    icon: "/icons/settings-password.svg",
  },
];

const legalOptions = [
  {
    id: 1,
    name: "Política de Privacidad",
    icon: "/icons/settings-lock.svg",
  },
  {
    id: 2,
    name: "Términos y Condiciones",
    icon: "/icons/settings-terms.svg",
  },
];

const ButtonOption: React.FC<any> = ({ option }) => {
  const navigate = useNavigate();

  return (
    <button
      className="flex items-center gap-2"
      onClick={() => navigate(option.link)}
    >
      <div>
        <img src={option.icon} alt="" />
      </div>
      <Text>{option.name}</Text>
    </button>
  );
};

export default function Root() {
  const styleHeight = useHeight();

  const navigate = useNavigate();
  const { logout } = useContext(AuthenticatedContext);

  return (
    <div
      className="flex flex-col justify-between pb-6"
      style={styleHeight}
    >
      <div>
        <BackBtn
          title="Ajustes"
          onClick={() => navigate("/profile")}
        />

        <div className="px-5">
          <h3 className="text-xl font-medium text-@sura-primary-900">
            Informacion de usuario
          </h3>

          <div className="mt-3 grid gap-y-4">
            {postsOptions.map((option) => (
              <ButtonOption key={option.id} option={option} />
            ))}
          </div>
        </div>

        <div className="px-5 mt-7">
          <h3 className="text-xl font-medium text-@sura-primary-900">
            Editar perfil
          </h3>

          <div className="mt-3 grid gap-y-4">
            {infoUserOptions.map((option) => (
              <ButtonOption key={option.id} option={option} />
            ))}
          </div>
        </div>

        <div className="px-5 mt-7">
          <h3 className="text-xl font-medium text-@sura-primary-900">
            Terminos y condiciones
          </h3>

          <div className="mt-3 grid gap-y-4">
            {legalOptions.map((option) => (
              <ButtonOption key={option.id} option={option} />
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <button
          className="font-medium border border-@sura-primary-900 py-3 rounded-md w-full"
          onClick={() => {
            logout();
            toast("Has cerrado sesion", {
              icon: "👀",
            });
            navigate("/");
          }}
        >
          Cerrar sesion
        </button>
      </div>
    </div>
  );
}
