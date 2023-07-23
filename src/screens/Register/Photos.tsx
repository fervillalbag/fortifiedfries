import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { m } from "framer-motion";

import { Button, Text } from "../../ui";
import { Footer as FooterAuth } from "../../components/Auth";
import { authStepAnimation } from "../../utils/animation";
import { NURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import { useHeight } from "../../hooks";
import { AuthenticatedContext } from "../../context";

export default function Photos() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const styleHeight = useHeight();

  const { isLogged, setIsLogged } = useContext(AuthenticatedContext);

  const handleComplete = async () => {
    try {
      localStorage.setItem(NURA_AUTH_REGISTER_INFO, "");
      setIsLogged(!isLogged);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={styleHeight}
      className="flex flex-col h-screen overflow-hidden"
    >
      <m.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={authStepAnimation}
      >
        <Text className="p-5">
          Agrega una portada y una foto de perfil
        </Text>

        <div>
          <button className="w-full h-32 bg-@sura-primary-200 grid place-items-center">
            <img src="/icons/camera-icons.svg" alt="" />
          </button>

          <button className="relative z-20 ml-5 -mt-[50px] bg-@sura-primary-200 border border-@sura-primary-400 grid place-items-center w-[100px] h-[100px] rounded-full">
            <img src="/icons/camera-icons.svg" alt="" />
          </button>
        </div>

        <div className="px-5 py-2">
          <Text className="text-xl font-medium text-@sura-primary-900">
            {state.fullname}
          </Text>
          <Text className="">@{state.username}</Text>
        </div>

        <div className="px-5 py-3">
          <div className="flex items-center gap-4">
            <div className="w-28 h-5 bg-@sura-primary-200" />
            <div className="w-28 h-5 bg-@sura-primary-200" />
          </div>

          <div className="grid grid-cols-2 gap-5 mt-5">
            <div>
              <div className="w-full h-40 bg-@sura-primary-200" />
              <div className="mt-1 w-28 h-5 bg-@sura-primary-200" />
              <div className="mt-1 w-20 h-5 bg-@sura-primary-200" />
            </div>
            <div>
              <div className="w-full h-40 bg-@sura-primary-200" />
              <div className="mt-1 w-28 h-5 bg-@sura-primary-200" />
              <div className="mt-1 w-20 h-5 bg-@sura-primary-200" />
            </div>
          </div>
        </div>
      </m.div>

      <div className="grid items-end h-full">
        <FooterAuth
          footerText="Ya tienes una cuenta?"
          routeText="Inicia sesion"
          routeLink="/login-email"
          currentStep={2}
          disableFooterText={false}
        >
          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant="outline"
          >
            Volver
          </Button>
          <Button
            type="button"
            onClick={handleComplete}
            data-test="register-button-submit"
          >
            Siguiente
          </Button>
        </FooterAuth>
      </div>
    </div>
  );
}
