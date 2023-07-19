import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { Button, Select, Text } from "../../ui";
import { WindowSizeContext } from "../../context";
import { useLocalStorageState } from "../../hooks";
import { NURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import { getAllGendersUser } from "../../services";

const Gender: React.FC = () => {
  const navigate = useNavigate();
  const { windowSize } = useContext(WindowSizeContext);

  const [initialValues, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  const [userInfoValue] = useState<any>(initialValues.genderId);

  const [genderSelected, setGenderSelected] = useState<string | null>(
    userInfoValue
  );
  const [textError, setTextError] = useState<string | null>(null);

  const { data: genderOfUser } = useQuery(
    ["getAllGendersUser"],
    getAllGendersUser
  );

  const handleNext = async () => {
    if (!genderSelected) {
      setTextError("Este campo es obligatorio");
      return;
    }

    handleUpdateForm({ genderId: genderSelected });
    navigate("/register-password");
  };

  return (
    <div className={`h-[${windowSize.innerHeight}px]`}>
      <HeaderAuth
        image="/images/bg-register-gender.jpg"
        title=""
        subtitle={`Seleccione su genero`}
      />

      <div className="p-5">
        <Select
          options={genderOfUser?.data}
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
          <Button
            onClick={() => navigate("/register-email")}
            variant="outline"
          >
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
