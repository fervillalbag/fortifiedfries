import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { Button, Select, Text } from "../../ui";
import { WindowSizeContext } from "../../context";
import { useLocalStorageState } from "../../hooks";
import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../../utils/constants";

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
  const [userInfoValue] = useState<any>(authInitialValue);

  const [initialValues, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
    value: userInfoValue,
  });

  const [genderSelected, setGenderSelected] = useState<string | null>(
    initialValues.gender
  );
  const [textError, setTextError] = useState<string | null>(null);

  const handleNext = async () => {
    if (!genderSelected) {
      setTextError("Este campo es obligatorio");
      return;
    }

    handleUpdateForm({ gender: genderSelected });
    navigate("/register-password");
  };

  return (
    <div className={`h-[${windowSize.innerHeight}]px`}>
      <HeaderAuth
        image="/images/bg-register-gender.jpg"
        title=""
        subtitle={`Seleccione su genero`}
      />

      <div className="p-5">
        <Select
          options={options}
          value={genderSelected}
          setValue={setGenderSelected}
          setTextError={setTextError}
          placeholder="Seleccione una opcion"
        />
        {textError && !genderSelected && (
          <Text
            data-test="register-feedback-error"
            className="text-red-500 mt-2"
          >
            {textError}
          </Text>
        )}

        <FooterAuth
          footerText="Ya tienes una cuenta?"
          routeText="Inicia sesion"
          routeLink="/login-email"
          currentStep={3}
        >
          <Button onClick={() => navigate(-1)} variant="outline">
            Volver
          </Button>
          <Button
            data-test="register-button-submit"
            onClick={handleNext}
          >
            Siguiente
          </Button>
        </FooterAuth>
      </div>
    </div>
  );
};

export default Gender;
