import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useHeight, useLocalStorageState } from "../../hooks";
import {
  SURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../../utils/constants";
import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { mailformat } from "../../utils/regex";
import { Button, Input, Text } from "../../ui";
import { authStepAnimation } from "../../utils/animation";
import { getUser } from "../../services";
import toast from "react-hot-toast";

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

  const [value, handleUpdate] = useLocalStorageState({
    key: SURA_AUTH_REGISTER_INFO,
  });

  useEffect(() => {
    handleUpdate(authInitialValue);
  }, []);

  const handleNext = async (values: any) => {
    setLoading(true);

    try {
      await getUser("email", values.email);
      handleUpdate({
        email: values.email,
      });
      navigate("/login-password");
    } catch (error) {
      toast.error("El usuario no existe");
    } finally {
      setLoading(false);
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
          email: value?.email || "",
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
                type="email"
                data-test="register-input-email"
                placeholder="Ej: lucas@gmail.com"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                isLoading={loading}
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
              count={2}
              isLogin
            >
              <Button
                type="button"
                onClick={() => navigate("/login")}
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
