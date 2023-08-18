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
import { client } from "../../../supabase/client";
import { AuthenticatedContext } from "../../context";

const registerValidationSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("El nombre completo es obligatorio"),
});

export default function Name() {
  const navigate = useNavigate();
  const [userInfoValue] = useState<any>(authInitialValue);
  const styleHeight = useHeight();
  const { isAuthenticated } = useContext(AuthenticatedContext);

  const [value, handleUpdate] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
    value: userInfoValue,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(
    value.fullname ? false : true
  );

  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 1500);
  }, []);

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

  if (isAuthenticated === null) return;

  if (loadingPage)
    return (
      <div className="bg-white fixed top-0 left-0 w-screen h-screen grid place-items-center">
        <p className="text-xl">Cargando..</p>
      </div>
    );

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
              count={4}
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
}
