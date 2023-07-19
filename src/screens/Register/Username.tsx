import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Alert, Button, Input, Text } from "../../ui";
import { authStepAnimation } from "../../utils/animation";
import { useLocalStorageState } from "../../hooks";
import { NURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import { getUser, updateUser } from "../../services/user";

const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("El nombre completo es obligatorio"),
});

export default function Username() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const [value, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  const { data: dataUser } = useQuery(["getUser"], () =>
    getUser("email", value.email)
  );
  const user = dataUser?.data;

  const handleNext = async (values: any) => {
    const usernameUpdated = {
      username: values.username,
    };
    setLoading(true);

    try {
      const response = await updateUser(user?.id, usernameUpdated);

      if (response?.status === 200) {
        toast.custom(
          (t) => (
            <Alert
              type="success"
              title="Excelente!"
              description="Datos actualizados."
              t={t}
              duration={2000}
            />
          ),
          { duration: 4000 }
        );
        handleUpdateForm(values);
        navigate("/register-photos", {
          state: {
            fullname: value.fullname,
            username: values.username,
          },
        });
        setLoading(false);
      }
      setLoading(false);
    } catch (error: any) {
      toast.custom((t) => (
        <Alert
          type="error"
          title="Hubo un problema"
          description={error.message}
          t={t}
        />
      ));
      setLoading(false);
    }
  };

  return (
    <div>
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
                data-test="register-input-name"
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
              routeLink="/login-email"
              currentStep={1}
              disableFooterText={false}
            >
              <div />
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
