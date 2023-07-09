import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { Button, Select } from "../../ui";
import { WindowSizeContext } from "../../context";

const options = [
  {
    id: "1",
    value: "man",
    text: "Hombre",
  },
  {
    id: "2",
    value: "woman",
    text: "Mujer",
  },
  {
    id: "3",
    value: "n/a",
    text: "Prefiero no decirlo",
  },
];

const Gender: React.FC = () => {
  const navigate = useNavigate();
  const { windowSize } = useContext(WindowSizeContext);
  const [genderSelected, setGenderSelected] = useState<string | null>(
    null
  );

  return (
    <div className={`h-[${windowSize}]px`}>
      <HeaderAuth
        image="/images/bg-register-gender.jpg"
        title="Datos personales"
        subtitle={`Seleccione su genero`}
      />

      <div className="p-5">
        <Select
          options={options}
          value={genderSelected}
          setValue={setGenderSelected}
        />

        <FooterAuth
          footerText="Ya tienes una cuenta?"
          routeText="Inicia sesion"
          routeLink="/login"
          currentStep={2}
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

export default Gender;