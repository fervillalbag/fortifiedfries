import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Button, Input, Text } from "../../ui";
import { useHeight, useLocalStorageState } from "../../hooks";
import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../../utils/constants";
import { authStepAnimation } from "../../utils/animation";
import { AuthenticatedContext } from "../../context";
import { client } from "../../../supabase/client";
import { NotFound } from "..";

const registerValidationSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("El nombre completo es obligatorio"),
});

export default function Name() {
  const navigate = useNavigate();
  const [userInfoValue] = useState<any>(authInitialValue);
  const styleHeight = useHeight();

  const [loading, setLoading] = useState<boolean>(false);

  const { setIsAuthenticated } = useContext(AuthenticatedContext);

  useEffect(() => {
    setIsAuthenticated(true);
  }, []);

  const [value, handleUpdate] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
    value: userInfoValue,
  });

  const handleNext = async (values: any) => {
    setLoading(true);
    const { data: dataUser } = await client.auth.getUser();

    if (dataUser.user === null) {
      console.log("No se ha encontrado el usuario");
      return;
    }

    const { data, status } = await client
      .from("Personal")
      .update({ fullname: values.fullname })
      .eq("user", dataUser.user.id)
      .select("*")
      .single();

    if (status === 200) {
      console.log("Actualizacion existosa");
      handleUpdate({
        username: data.username,
        fullname: data.fullname,
      });
      navigate("/register-username");
      setLoading(false);
      return;
    }

    console.log("Ha ocurrido un problema");
    setLoading(false);
  };

  if (value.email === "")
    return (
      <div style={styleHeight}>
        <HeaderAuth
          image="/images/bg-register-fullname.jpg"
          title=""
          subtitle={`Ingrese su nombre completo`}
        />

        <Formik
          validationSchema={registerValidationSchema}
          validator={() => ({})}
          initialValues={{
            fullname: value?.fullname || "",
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
                  placeholder="Ej: Lucas Lamas"
                  value={values.fullname}
                  onChange={handleChange("fullname")}
                  onBlur={handleBlur("fullname")}
                />

                {errors.fullname && (
                  <Text
                    data-test="register-feedback-error"
                    className="text-red-500 mt-2"
                  >
                    {errors.fullname as string}
                  </Text>
                )}
              </m.div>

              <FooterAuth
                footerText=""
                routeText=""
                routeLink="/login"
                disableFooterText={false}
                currentStep={1}
                count={3}
              >
                <div />
                <Button
                  data-test="register-button-submit"
                  type="submit"
                  isLoading={loading}
                >
                  Siguiente
                </Button>
              </FooterAuth>
            </form>
          )}
        </Formik>
      </div>
    );

  if (!value.email) return <NotFound />;
}
