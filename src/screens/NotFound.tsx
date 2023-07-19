import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Text, buttonVariants, textVariants } from "../ui";
import { WindowSizeContext } from "../context";
import { NURA_AUTH_TOKEN } from "../utils/constants/auth";

const NotFound: React.FC = () => {
  const { windowSize } = useContext(WindowSizeContext);

  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(
      localStorage.getItem(NURA_AUTH_TOKEN) ? true : false
    );
  }, []);

  return (
    <div
      className={`h-[${windowSize.innerHeight}px] overflow-hidden p-5 grid place-items-center h-screen content-center`}
    >
      <Text
        className={textVariants({
          variant: "heading",
          className: "text-center mb-3",
        })}
      >
        No se encontraron resultados
      </Text>
      <Link
        to={isAuthenticated ? "/home" : "/"}
        className={buttonVariants({
          variant: "outline",
        })}
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
