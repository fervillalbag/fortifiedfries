import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import { useHeight, useLocalStorageState } from "../../hooks";
import { Button, Input, Text, buttonVariants } from "../../ui";
import { DotStep } from "../../components/Auth";
import { HeaderLoader } from "../../components";
import { Layout } from "../../components/CreatePost";
import { SURA_CREATE_POST_INFO } from "../../utils/constants";

import CreatePostHeader from "../../assets/images/create-post-name.png";
import { initialValueCreatePost } from "../../utils/constants/createPost";

const validationSchemaName = yup.object().shape({
  name: yup
    .string()
    .min(8, "El minimo de caracteres es de 8")
    .required("El campo es obligatorio"),
});

export default function Name() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const [value, handleUpdate] = useLocalStorageState({
    key: SURA_CREATE_POST_INFO,
    value: initialValueCreatePost,
  });

  const handleNext = (values: { name: string }) => {
    handleUpdate(values);
    navigate("/create-post-status");
  };

  return (
    <div style={styleHeight}>
      <Formik
        initialValues={{ name: value.name || "" }}
        validationSchema={validationSchemaName}
        onSubmit={(values: { name: string }) => handleNext(values)}
      >
        {({
          handleBlur,
          handleChange,
          values,
          handleSubmit,
          errors,
        }) => (
          <form className="h-full" onSubmit={handleSubmit}>
            <HeaderLoader imgCmp={CreatePostHeader} />

            <div className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]">
              <Layout>
                <div>
                  <Input
                    value={values.name}
                    onChange={handleChange("name")}
                    placeholder="Nombre del producto"
                    onBlur={handleBlur("name")}
                  />

                  {errors.name && (
                    <Text
                      data-test="register-feedback-error"
                      className="text-red-500 mt-2"
                    >
                      {errors.name as string}
                    </Text>
                  )}
                </div>
              </Layout>

              <div>
                <DotStep value={1} count={7} />
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    className={buttonVariants({
                      variant: "outline",
                    })}
                    onClick={() => navigate(-1)}
                  >
                    Volver
                  </Button>
                  <Button type="submit">Siguiente</Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
