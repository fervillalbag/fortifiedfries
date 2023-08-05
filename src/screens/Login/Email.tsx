import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { m } from "framer-motion";

import { useHeight, useLocalStorageState } from "../../hooks";
import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../../utils/constants";
import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { mailformat } from "../../utils/regex";
import { client } from "../../../supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Alert, Button, Input, Text } from "../../ui";
import { authStepAnimation } from "../../utils/animation";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .matches(new RegExp(mailformat), "Debe ser un correo válido")
    .required("El correo es obligatorio"),
});

export default function Email() {
  const styleHeight = useHeight();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [_, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  useEffect(() => {
    handleUpdateForm(authInitialValue);
  }, []);

  const handleNext = async (values: any) => {
    handleUpdateForm(values);
    setLoading(true);

    try {
      const { data: dataUser } = await client
        .from("User")
        .select("*")
        .eq("email", values.email);

      if (dataUser?.length! > 0) {
        setLoading(false);
        navigate("/login-password");
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
        validationSchema={loginValidationSchema}
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
              footerText="Aun no tienes una cuenta?"
              routeText="Registrate"
              routeLink="/register"
              currentStep={1}
              isLogin
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
}
