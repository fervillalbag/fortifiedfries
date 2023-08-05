import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import { toast } from "react-hot-toast";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Alert, Button, Input, Text } from "../../ui";
import { authStepAnimation } from "../../utils/animation";
import { useHeight, useLocalStorageState } from "../../hooks";
import { NURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import { client } from "../../../supabase/client";

const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("El nombre completo es obligatorio"),
});

export default function Username() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const [loading, setLoading] = useState<boolean>(false);

  const [value, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  const getUser = async () => {
    const { data, error } = await client
      .from("User")
      .select("*")
      .eq("email", value.email)
      .single();

    return { data, error };
  };

  const handleNext = async (values: any) => {
    setLoading(true);
    const currentUser: any = await getUser();

    try {
      const { status } = await client
        .from("User")
        .update({ username: values.username })
        .eq("id", currentUser?.data.id)
        .select();

      if (status === 200) {
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
