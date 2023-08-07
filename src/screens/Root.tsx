import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Text, textVariants } from "../ui";
import { useHeight, useLocalStorageState } from "../hooks";
import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../utils/constants";

const Root: React.FC = () => {
  const navigate = useNavigate();
  const stylesHeight = useHeight();

  const [_, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  useEffect(() => {
    handleUpdateForm(authInitialValue);
  }, []);

  return (
    <div style={stylesHeight}>
      <div className="relative h-[60vh]">
        <img
          src="/images/bg-auth.png"
          alt=""
          className="w-full h-[70vh] object-cover object-bottom"
        />

        <div className="w-full absolute top-0 left-0 h-[70vh] bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="absolute w-full bottom-0 z-10 p-4 pb-8">
        <Text
          className={textVariants({
            variant: "heading",
            className: "text-4xl leading-[42px] mb-2",
          })}
        >
          Empieza a comprar y vender de forma segura
        </Text>
        <Text className="text-@sura-primary-400">
          Se prima la experiencia del usuario y la seguridad usando
          nuestro sitio
        </Text>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button
            data-test="root-create-account-button"
            onClick={() => navigate("/register")}
          >
            Crear cuenta
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Iniciar sesion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Root;
