import { useEffect, useState } from "react";
import { Button, Text, buttonVariants, textVariants } from "../ui";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export default function Auth() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  console.log({ windowSize });

  return (
    <div>
      <div className="relative h-[60vh]">
        <img
          src="/images/bg-auth.png"
          alt=""
          className="w-full h-[65vh]"
        />
      </div>

      <div className="p-5 pb-8 absolute w-full bottom-0">
        <div className="mb-8 w-full">
          <Text variant="heading">Bienvenido!</Text>
          <Text
            className={textVariants({
              className: "mt-2",
            })}
          >
            Si aun no tienes una cuenta
            <br />
            debes registrarte
          </Text>
        </div>

        <Button
          icon="icon-mail"
          className={buttonVariants({
            className: "mb-4",
            variant: "icon",
          })}
        >
          Registrarte con email
        </Button>
        <Button variant="icon" icon="icon-google">
          Registrarte con email
        </Button>

        <Text
          className={textVariants({
            className: "mt-4 text-center",
          })}
        >
          Ya tienes una cuenta? Inicia sesion
        </Text>
      </div>
    </div>
  );
}
