import React, { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast";
import { m } from "framer-motion";
// @ts-ignore
import argon2 from "argon2-wasm-esm";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Alert, Button, Input, Text, inputVariants } from "../../ui";
import { useHeight, useLocalStorageState } from "../../hooks";
import { NURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import {
  authStepAnimation,
  authStepAnimationDelaySm,
} from "../../utils/animation";
import { client } from "../../../supabase/client";
import { NURA_AUTH_USER_INFO } from "../../utils/constants/auth";

const registerValidationSchema = yup.object().shape({
  password: yup.string().required("La contrasena es obligatorio"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "No coinciden las contrasenas")
    .required("Confirme la contrasena"),
});

const Password: React.FC = () => {
  const navigate = useNavigate();
  const styleHeight = useHeight();
  const [loading, setLoading] = useState<boolean>(false);

  const [initialValues, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  const typeOfUserFetch = async () => {
    const { data } = await client
      .from("TypeUser")
      .select("*")
      .eq("name", "BASIC")
      .single();

    return data;
  };

  const handleNext = async (values: any) => {
    const shortIdCustom = nanoid(5);
    setLoading(true);
    const typeUser = await typeOfUserFetch();

    const hashedString = await argon2.hash({
      pass: values.password,
      salt: "somesalt",
    });

    const dataToRegisterUser = {
      ...initialValues,
      password: hashedString?.encoded,
      typeUser: typeUser?.id,
      username: `${
        initialValues.email.split("@")[0]
      }${shortIdCustom}`,
    };

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
        handleUpdateForm({ username: dataToRegisterUser.username });
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

            <m.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={authStepAnimationDelaySm}
            >
              <Input
                data-test="register-input-confirm-password"
                type="password"
                className={inputVariants({
                  className: "mt-4",
                })}
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                placeholder="confirme su contrasena"
              />
              {errors.confirmPassword && (
                <Text
                  data-test="register-feedback-error-confirmPassword"
                  className="text-red-500 my-2"
                >
                  {errors.confirmPassword as string}
                </Text>
              )}
            </m.div>

            <FooterAuth
              footerText="Ya tienes una cuenta?"
              routeText="Inicia sesion"
              routeLink="/login"
              currentStep={4}
            >
              <Button
                type="button"
                onClick={() => navigate("/register-gender")}
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
