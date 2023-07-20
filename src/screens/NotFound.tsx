import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Text, buttonVariants } from "../ui";
import { NURA_AUTH_TOKEN } from "../utils/constants/auth";
import { useHeight } from "../hooks";

const NotFound: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(
      localStorage.getItem(NURA_AUTH_TOKEN) ? true : false
    );
  }, []);

  const stylesHeight = useHeight();

  return (
    <div
      style={stylesHeight}
      className={`bg-red-200 overflow-hidden grid grid-rows-[1fr_88px]`}
    >
      <div className="h-full grid content-center place-items-center">
        <img src="/icons/404.svg" alt="" />
        <div className="px-5">
          <Text className="text-2xl text-center text-@sura-primary-900">
            No se encontraron resultados
          </Text>
          <Text className="text-@sura-primary-700 text-center mt-2">
            La página que buscas no ha sido encontrada. Te sugerimos
            revisar la URL o volver a la página de inicio.
          </Text>
        </div>
      </div>
      <div className="px-5 h-full">
        <Link
          to={isAuthenticated ? "/home" : "/"}
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
