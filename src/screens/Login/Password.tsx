import React, { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { m } from "framer-motion";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Alert, Button, Input, Text } from "../../ui";
import { useHeight } from "../../hooks";
import { authStepAnimation } from "../../utils/animation";
import { client } from "../../../supabase/client";
import { NURA_AUTH_USER_INFO } from "../../utils/constants/auth";

const registerValidationSchema = yup.object().shape({
  password: yup.string().required("La contrasena es obligatorio"),
});

const Password: React.FC = () => {
  const navigate = useNavigate();
  const styleHeight = useHeight();
  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = async (values: any) => {
    setLoading(true);
    console.log(values);

    const dataToRegisterUser = {};

    try {
      const { data, status } = await client
        .from("User")
        .insert([dataToRegisterUser])
        .select()
        .single();

      if (status === 201) {
        toast.custom((t) => (
          <Alert
            type="success"
            title="Excelente!"
            description="Cuenta creada exitosamente."
            t={t}
          />
        ));

        localStorage.setItem(
          NURA_AUTH_USER_INFO,
          JSON.stringify({
            id: data?.id,
            email: data?.email,
            fullname: data?.fullname,
          })
        );
        navigate("/register-username");
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
        image="/images/bg-register-password.jpg"
        title=""
        subtitle={``}
      />

      <Formik
        validationSchema={registerValidationSchema}
        validator={() => ({})}
        initialValues={{
          password: "",
          confirmPassword: "",
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
                data-test="register-input-password"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="nueva contrasena"
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
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Password;
