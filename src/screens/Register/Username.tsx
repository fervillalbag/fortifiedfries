import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Button, Input, Text } from "../../ui";
import { authStepAnimation } from "../../utils/animation";
import { useHeight, useLocalStorageState } from "../../hooks";
import { SURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import { getUser, register } from "../../services";
import toast from "react-hot-toast";

const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("El nombre completo es obligatorio"),
});

export default function Username() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const [value] = useLocalStorageState({
    key: SURA_AUTH_REGISTER_INFO,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = async (values: { username: string }) => {
    setLoading(true);
    try {
      await getUser("username", values.username);
      toast.error("El nombre de usuario ya existe");
    } catch (error) {
      const userCreated = {
        ...value,
        username: values.username,
      };

      const response = await register(userCreated);

      if (response.status === 201) {
        navigate("/home");
        toast.success("Cuenta creada correctamente");
        return;
      }

      toast.error("Ha ocurrido un error. Intentelo de nuevo");
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div style={styleHeight}>
      <HeaderAuth
        image="/images/bg-register-username.jpg"
        title=""
        subtitle={`Ingrese su nombre de usuario`}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          username: value.username || "",
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
                data-test="register-input-username"
                placeholder="Ej: lucas_lamas"
                value={values.username}
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
              />

              {errors.username && (
                <Text
                  data-test="register-feedback-error"
                  className="text-red-500 mt-2"
                >
                  {errors.username as string}
                </Text>
              )}
            </m.div>

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login"
              currentStep={5}
              count={5}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/register-gender")}
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
