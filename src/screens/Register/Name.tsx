import { useContext, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { WindowSizeContext } from "../../context";
import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Button, Input, Text } from "../../ui";
import { useLocalStorageState } from "../../hooks";
import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../../utils/constants";

const registerValidationSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("El nombre completo es obligatorio"),
});

export default function Name() {
  const navigate = useNavigate();
  const { windowSize } = useContext(WindowSizeContext);
  const [userInfoValue] = useState<any>(authInitialValue);

  const [initialValues, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
    value: userInfoValue,
  });

  const handleNext = async (values: any) => {
    handleUpdateForm(values);
    navigate("/register-email");
  };

  return (
    <div className={`h-[${windowSize.innerHeight}]px`}>
      <HeaderAuth
        image="/images/bg-register-fullname.jpg"
        title=""
        subtitle={`Ingrese su nombre completo`}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          fullname: initialValues?.fullname || "",
        }}
        onSubmit={(values: any) => handleNext(values)}
      >
        {({
          handleBlur,
          handleChange,
          values,
          handleSubmit,
          errors,
        }) => (
          <form className="p-5" onSubmit={handleSubmit}>
            <Input
              data-test="register-input-name"
              placeholder="Ej: Lucas Lamas"
              value={values.fullname}
              onChange={handleChange("fullname")}
              onBlur={handleBlur("fullname")}
            />

            {errors.fullname && (
              <Text
                data-test="register-feedback-error"
                className="text-red-500 mt-2"
              >
                {errors.fullname as string}
              </Text>
            )}

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login-email"
              currentStep={1}
            >
              <Button
                type="button"
                onClick={() => navigate(-1)}
                variant="outline"
              >
                Volver
              </Button>
              <Button
                data-test="register-button-submit"
                type="submit"
              >
                Siguiente
              </Button>
            </FooterAuth>
          </form>
        )}
      </Formik>
    </div>
  );
}