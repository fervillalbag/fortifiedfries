import React from "react";
import { Link } from "react-router-dom";
import { Text, buttonVariants, textVariants } from "../ui";

const NotFound: React.FC = () => {
  return (
    <div className="p-5 grid place-items-center h-screen content-center">
      <Text
        className={textVariants({
          variant: "heading",
          className: "text-center mb-3",
        })}
      >
        No se encontraron resultados
      </Text>
      <Link
        to="/"
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
