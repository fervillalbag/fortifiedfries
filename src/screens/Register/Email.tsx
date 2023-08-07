import React, { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { m } from "framer-motion";

import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { Alert, Button, Input, Text } from "../../ui";
import { mailformat } from "../../utils/regex";
import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../../utils/constants";
import { useLocalStorageState } from "../../hooks/useAuth";
import { authStepAnimation } from "../../utils/animation";
import { toast } from "react-hot-toast";
import { useHeight } from "../../hooks";
import { client } from "../../../supabase/client";

const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .matches(new RegExp(mailformat), "Debe ser un correo válido")
    .required("El correo es obligatorio"),
});

const Email: React.FC = () => {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const [userInfoValue] = useState<any>(authInitialValue);
  const [loading, setLoading] = useState<boolean>(false);

  const [initialValues, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
    value: userInfoValue,
  });

  const handleNext = async (values: any) => {
    handleUpdateForm(values);
    setLoading(true);

    try {
      const { data: dataUser } = await client
        .from("User")
        .select("*")
        .eq("email", values.email);

      if (dataUser?.length === 0) {
        setLoading(false);
        navigate("/register-gender");
        return;
      }

      setLoading(false);
      return toast.custom(
        (t) => (
          <Alert
            type="error"
            title="Hubo un problema!"
            description="El email ya está registrado."
            t={t}
            duration={2000}
          />
        ),
        { duration: 4000 }
      );
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div style={styleHeight}>
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
            <m.div
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
            </m.div>

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login"
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
                isLoading={loading}
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
