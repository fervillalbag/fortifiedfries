import { useContext } from "react";
import { Button, Text, buttonVariants, textVariants } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import { WindowSizeContext } from "../../context";

const RegisterPrincipal = () => {
  const navigate = useNavigate();
  const { windowSize } = useContext(WindowSizeContext);

  return (
    <div className={`h-[${windowSize.innerHeight}px]`}>
      <div className="relative h-[60vh]">
        <img
          src="/images/bg-auth.png"
          alt=""
          className="w-full h-[70vh] object-cover object-bottom"
        />

        <div className="w-full absolute top-0 left-0 h-[70vh] bg-gradient-to-b from-transparent to-white" />
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
          data-test="auth-register-email-button"
          onClick={() => navigate("/register-email")}
          icon="icon-mail"
          className={buttonVariants({
            className: "mb-4",
            variant: "icon",
          })}
        >
          Registrarse con email
        </Button>
        <Button variant="icon" icon="icon-google">
          Registrarte con email
        </Button>

        <Text
          className={textVariants({
            className: "mt-5 text-center",
          })}
        >
          Ya tienes una cuenta? <Link to="/login">Inicia sesion</Link>
        </Text>
      </div>
    </div>
  );
};

export default RegisterPrincipal;
