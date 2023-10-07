import React, { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { m } from "framer-motion";
import { toast } from "react-hot-toast";
// @ts-ignore
import argon2 from "argon2-wasm-esm";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Button, Input, Text } from "../../ui";
import { useHeight, useLocalStorageState } from "../../hooks";
import { authStepAnimation } from "../../utils/animation";
import { SURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import { login } from "../../services/user";

const registerValidationSchema = yup.object().shape({
  password: yup.string().required("La contrasena es obligatorio"),
});

const Password: React.FC = () => {
  const navigate = useNavigate();

  const [value] = useLocalStorageState({
    key: SURA_AUTH_REGISTER_INFO,
  });

  const styleHeight = useHeight();
  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = async (values: any) => {
    setLoading(true);

    const hashedPassword = await argon2.hash({
      pass: values.password,
      salt: "somesalt",
    });

    const userCredentials = {
      email: value.email,
      password: hashedPassword.encoded,
    };

    try {
      const response = await login(userCredentials);

      if (response.token) {
        navigate("/home");
        toast.success("Cuenta creada correctamente");
        return;
      }
    } catch (error) {
      toast.error("Credenciales incorrectas");
      console.log(error);
    } finally {
      setLoading(false);
    }
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
          <Form className="p-5" onSubmit={handleSubmit}>
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
                placeholder="introduce la contrasena"
                isLoading={loading}
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

            <FooterAuth
              footerText="Aun no tienes una cuenta?"
              routeText="Registrate"
              routeLink="/register"
              currentStep={2}
              count={2}
              isLogin
            >
              <Button
                type="button"
                onClick={() => navigate("/login-email")}
                variant="outline"
              >
                Volver
              </Button>
              <Button
                isLoading={loading}
                type="submit"
                data-test="register-button-submit"
              >
                Siguiente
              </Button>
            </FooterAuth>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Password;
