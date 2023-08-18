import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Button, Input, Text, buttonVariants } from "../../ui";
import { authStepAnimation } from "../../utils/animation";
import { useHeight, useLocalStorageState } from "../../hooks";
import { client } from "../../../supabase/client";
import { NURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import { NotFound } from "..";

const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("El nombre completo es obligatorio"),
});

export default function Username() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const [value, handleUpdate] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  console.log({ value });

  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = async (values: any) => {
    setLoading(true);
    const { data: dataUser } = await client.auth.getUser();

    if (!dataUser.user) {
      console.log("No se pudo obtener usuario");
      return;
    }

    const { data, status } = await client
      .from("Personal")
      .update({ username: values.username })
      .eq("user", dataUser.user.id)
      .select("*")
      .single();

    if (status === 200) {
      console.log("Actualizacion existosa");
      handleUpdate({
        username: data.username,
      });
      navigate("/register-gender", {
        state: { fullname: data.fullname, username: data.username },
      });
      setLoading(false);
      return;
    }

    console.log("Ha ocurrido un problema");
    setLoading(false);
  };

  if (value.email === "" || !value.email) return <NotFound />;

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
              currentStep={2}
              disableFooterText={false}
              count={4}
            >
              <Button
                type="button"
                className={buttonVariants({
                  variant: "outline",
                })}
                onClick={() => navigate("/register-name")}
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
