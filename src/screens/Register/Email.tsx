import React, { useContext } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { Button, Input, Text } from "../../ui";
import { WindowSizeContext } from "../../context";
import { mailformat } from "../../utils/regex";

const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .matches(new RegExp(mailformat), "Debe ser un correo válido")
    .required("El correo es obligatorio"),
});

const Email: React.FC = () => {
  const navigate = useNavigate();
  const { windowSize } = useContext(WindowSizeContext);

  const handleNext = async (values: any) => {
    console.log({ values });
    navigate("/register-gender");
  };

  return (
    <div className={`h-[${windowSize}]px`}>
      <HeaderAuth
        image="/images/bg-register-email.jpg"
        title=""
        subtitle={``}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          email: "",
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
              data-test="register-input-email"
              placeholder="Ej: fer@gmail.com"
              value={values.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
            />

            {errors.email && (
              <Text
                data-test="register-feedback-error"
                className="text-red-500 mt-2"
              >
                {errors.email as string}
              </Text>
            )}

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login"
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
};

export default Email;
