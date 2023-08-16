import React, { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { nanoid } from "nanoid";
import { m } from "framer-motion";
// @ts-ignore
import argon2 from "argon2-wasm-esm";

import {
  Header as HeaderAuth,
  Footer as FooterAuth,
} from "../../components/Auth";
import { Button, Input, Text, inputVariants } from "../../ui";
import { useHeight, useLocalStorageState } from "../../hooks";
import { NURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import {
  authStepAnimation,
  authStepAnimationDelaySm,
} from "../../utils/animation";
import { client } from "../../../supabase/client";

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
  const [showModalEmail, setShowModalEmail] =
    useState<boolean>(false);

  const [initialValues] = useLocalStorageState({
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

    const { data, error } = await client.auth.signUp({
      email: initialValues.email,
      password: values.password,
    });

    if (error || data.user === null) {
      console.log({ error });
      return;
    }

    const dataToRegisterUser = {
      ...initialValues,
      user: data?.user.id,
      password: hashedString?.encoded,
      fullname: `${
        initialValues.email.split("@")[0]
      }${shortIdCustom}`,
      typeUser: typeUser?.id,
      gender: 1,
      username: `${
        initialValues.email.split("@")[0]
      }${shortIdCustom}`,
    };

    const { status } = await client
      .from("Personal")
      .insert([dataToRegisterUser])
      .select()
      .single();

    if (status === 201) {
      setShowModalEmail(true);
      setLoading(false);
    }

    console.log("Hubo un problema");
    setLoading(false);
  };

  return (
    <div style={styleHeight}>
      <div
        className={`w-screen h-screen fixed top-0 left-0 bg-white z-20 p-5 ${
          showModalEmail ? "block" : "hidden"
        }`}
      >
        <div>
          <h3 className="text-3xl font-bold text-@sura-primary-900">
            Revise su correo
          </h3>
          <p className="text-@sura-primary-600 mt-2">
            Por favor, revisa tu correo electrónico para ingresar al
            enlace que te permitirá completar tu registro.
          </p>
        </div>
      </div>

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
              currentStep={2}
              count={2}
            >
              <Button
                type="button"
                onClick={() => navigate("/register-email")}
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
