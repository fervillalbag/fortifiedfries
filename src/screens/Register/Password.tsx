import React from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { m } from "framer-motion";
// @ts-ignore
import argon2 from "argon2-wasm-esm";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Button, Input, Text, inputVariants } from "../../ui";
import { useHeight, useLocalStorageState } from "../../hooks";
import { SURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import {
  authStepAnimation,
  authStepAnimationDelaySm,
} from "../../utils/animation";

const registerValidationSchema = yup.object().shape({
  password: yup.string().required("La contrasena es obligatorio"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "No coinciden las contrasenas")
    .required("Confirme la contrasena"),
});

const Password: React.FC = () => {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const [_, handleUpdate] = useLocalStorageState({
    key: SURA_AUTH_REGISTER_INFO,
  });

  const handleNext = async (values: { password: string }) => {
    const hashedPassword = await argon2.hash({
      pass: values.password,
      salt: "somesalt",
    });

    handleUpdate({
      password: hashedPassword.encoded,
    });
    navigate("/register-fullname");
  };

  return (
    <div style={styleHeight}>
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
            <m.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={authStepAnimation}
            >
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
            </m.div>

            <m.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={authStepAnimationDelaySm}
            >
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
            </m.div>

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login"
              currentStep={2}
              count={5}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/register-email")}
              >
                Volver
              </Button>
              <Button
                type="submit"
                data-test="register-button-submit"
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
