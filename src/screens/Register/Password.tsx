import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { WindowSizeContext } from "../../context";
import { Button, Input, Text } from "../../ui";
import { inputVariants } from "../../ui/Input";

const registerValidationSchema = yup.object().shape({
  password: yup.string().required("La contrasena es obligatorio"),
  confirmPassword: yup.string().required("Confirme la contrasena"),
});

const Password: React.FC = () => {
  const navigate = useNavigate();
  const { windowSize } = useContext(WindowSizeContext);

  const handleNext = async (values: any) => {
    console.log({ values });
    navigate("/home");
  };

  return (
    <div className={`h-[${windowSize}]px`}>
      <HeaderAuth
        image="/images/bg-register-password.jpg"
        title=""
        subtitle={``}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          password: "",
          confirmPassword: "",
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
              data-test="register-input-password"
              type="password"
              value={values.password}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="nueva contrasena"
            />
            {errors.password && (
              <Text
                data-test="register-feedback-error"
                className="text-red-500 my-2"
              >
                {errors.password as string}
              </Text>
            )}

            <Input
              data-test="register-input-confirm-password"
              type="password"
              className={inputVariants({
                className: "mt-4",
              })}
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              placeholder="confirme su contrasena"
            />
            {errors.confirmPassword && (
              <Text
                data-test="register-feedback-error-confirmPassword"
                className="text-red-500 my-2"
              >
                {errors.confirmPassword as string}
              </Text>
            )}

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login-email"
              currentStep={4}
            >
              <Button
                type="button"
                onClick={() => navigate(-1)}
                variant="outline"
              >
                Volver
              </Button>
              <Button
                type="submit"
                data-test="register-button-submit"
                onClick={() => navigate("/register-password")}
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

export default Password;
