import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { Button, Select, Text } from "../../ui";
import { useHeight, useLocalStorageState } from "../../hooks";
import { NURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import { client } from "../../../supabase/client";

const Gender: React.FC = () => {
  const navigate = useNavigate();
  const styleHeight = useHeight();
  const [allGenders, setAllGenderes] = useState<any>();

  const [initialState, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  const [genderSelected, setGenderSelected] = useState<number | null>(
    0 || initialState?.gender
  );
  const [textError, setTextError] = useState<string | null>(null);

  const getAllGenders = async () => {
    try {
      const { data, error, status } = await client
        .from("GenderUser")
        .select("*");
      return { data, error, status };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getAllGenders();
      setAllGenderes(response);
    })();
  }, []);

  const handleNext = async () => {
    if (!genderSelected) {
      setTextError("Este campo es obligatorio");
      return;
    }

    handleUpdateForm({ gender: genderSelected });
    navigate("/register-password");
  };

  return (
    <div style={styleHeight}>
      <HeaderAuth
        image="/images/bg-register-gender.jpg"
        title=""
        subtitle={`Seleccione su genero`}
      />

      <div className="p-5">
        <Select
          options={allGenders}
          value={genderSelected}
          setValue={setGenderSelected}
          setTextError={setTextError}
          placeholder="Seleccione una opcion"
          handleUpdateForm={handleUpdateForm}
          animation
        />
        {textError ? (
          <Text
            data-test="register-feedback-error"
            className="text-red-500 mt-2"
          >
            {textError}
          </Text>
        ) : null}

        <FooterAuth
          footerText="Ya tienes una cuenta?"
          routeText="Inicia sesion"
          routeLink="/login"
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
