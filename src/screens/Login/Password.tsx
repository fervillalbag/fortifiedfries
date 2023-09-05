import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { m } from "framer-motion";
import { toast } from "react-hot-toast";
// @ts-ignore
import argon2 from "argon2-wasm-esm";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Button, Input, Text } from "../../ui";
import { useHeight } from "../../hooks";
import { authStepAnimation } from "../../utils/animation";
import { client } from "../../../supabase/client";
import { AuthenticatedContext } from "../../context";

const registerValidationSchema = yup.object().shape({
  password: yup.string().required("La contrasena es obligatorio"),
});

const Password: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setIsAuthenticated } = useContext(AuthenticatedContext);

  const styleHeight = useHeight();
  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = async (values: any) => {
    setLoading(true);
    toast.loading("Ingresando..");

    if (!state.user) {
      toast.dismiss();
      toast.error("Credenciales incorrectas");
      setLoading(false);
      return;
    }

    const { error } = await client.auth.signInWithPassword({
      email: state.user.email,
      password: values.password,
    });

    if (error?.message === "Invalid login credentials") {
      toast.dismiss();
      toast.error("Credenciales incorrectas");
      setLoading(false);
      return;
    }

    if (!error) {
      setIsAuthenticated(true);
      toast.dismiss();
      toast.success("Has iniciado sesion");
      navigate("/home");
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.dismiss();
    toast.error("Ha ocurrido un error");
  };

  return (
    <div style={styleHeight}>
      <HeaderAuth
        image="/images/bg-register-password.jpg"
        title=""
        subtitle={``}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          password: "",
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
          <Form className="p-5" onSubmit={handleSubmit}>
            <m.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={authStepAnimation}
            >
              <Input
                data-test="register-input-password"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="introduce la contrasena"
                isLoading={loading}
              />
              {errors.password && (
                <Text
                  data-test="register-feedback-error"
                  className="text-red-500 my-2"
                >
                  {errors.password as string}
                </Text>
              )}
            </m.div>

            <FooterAuth
              footerText="Aun no tienes una cuenta?"
              routeText="Registrate"
              routeLink="/register"
              currentStep={2}
              count={2}
              isLogin
            >
              <Button
                type="button"
                onClick={() => navigate("/login-email")}
                variant="outline"
              >
                Volver
              </Button>
              <Button
                isLoading={loading}
                type="submit"
                data-test="register-button-submit"
              >
                Siguiente
              </Button>
            </FooterAuth>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Password;
