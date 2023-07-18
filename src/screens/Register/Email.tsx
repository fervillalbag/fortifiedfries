import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { motion } from "framer-motion";

import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { Button, Input, Text } from "../../ui";
import { WindowSizeContext } from "../../context";
import { mailformat } from "../../utils/regex";
import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../../utils/constants";
import { useLocalStorageState } from "../../hooks/useAuth";
import { authStepAnimation } from "../../utils/animation";

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

  const [userInfoValue] = useState<any>(authInitialValue);

  const [initialValues, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
    value: userInfoValue,
  });

  const handleNext = async (values: any) => {
    handleUpdateForm(values);
    navigate("/register-gender");
  };

  return (
    <div className={`h-[${windowSize.innerHeight}]px`}>
      <HeaderAuth
        image="/images/bg-register-email.jpg"
        title=""
        subtitle={`Ingrese su correo electronico`}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          email: initialValues.email || "",
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
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={authStepAnimation}
            >
              <Input
                data-test="register-input-email"
                placeholder="Ej: lucas@gmail.com"
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
            </motion.div>

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login-email"
              currentStep={2}
            >
              <Button
                type="button"
                onClick={() => navigate("/register-name")}
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
