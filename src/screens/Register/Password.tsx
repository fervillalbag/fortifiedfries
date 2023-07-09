import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { WindowSizeContext } from "../../context";
import { Button, Input } from "../../ui";
import { inputVariants } from "../../ui/Input";

const Password: React.FC = () => {
  const navigate = useNavigate();
  const { windowSize } = useContext(WindowSizeContext);

  return (
    <div className={`h-[${windowSize}]px`}>
      <HeaderAuth
        image="/images/bg-register-email.jpg"
        title="Datos personales"
        subtitle={`Introduce una nueva contrasena`}
      />

      <div className="p-5">
        <Input type="password" placeholder="nueva contrasena" />
        <Input
          type="password"
          className={inputVariants({
            className: "mt-4",
          })}
          placeholder="confirme su contrasena"
        />

        <FooterAuth
          footerText="Ya tienes una cuenta?"
          routeText="Inicia sesion"
          routeLink="/login"
          currentStep={3}
        >
          <Button onClick={() => navigate(-1)} variant="outline">
            Volver
          </Button>
          <Button onClick={() => navigate("/register-password")}>
            Siguiente
          </Button>
        </FooterAuth>
      </div>
    </div>
  );
};

export default Password;
