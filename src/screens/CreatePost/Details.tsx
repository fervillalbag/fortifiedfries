import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";

import { useHeight, useLocalStorageState } from "../../hooks";
import { DotStep } from "../../components/Auth";
import { HeaderLoader } from "../../components";
import { Layout } from "../../components/CreatePost";
import { Button, Text, buttonVariants } from "../../ui";

import CreatePostHeader from "../../assets/images/create-post-details.png";
import { SURA_CREATE_POST_INFO } from "../../utils/constants";

const validationDetailsSchema = yup.object().shape({
  details: yup
    .string()
    .required("El campo es obligatorio")
    .min(20, "La descripcion debe tener como minimo 20 palabras"),
});

export default function Details() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const [value, handleUpdate] = useLocalStorageState({
    key: SURA_CREATE_POST_INFO,
  });

  const handleNext = (values: any) => {
    handleUpdate(values);
    navigate("/create-post-images");
  };

  return (
    <Formik
      initialValues={{ details: value.details || "" }}
      validationSchema={validationDetailsSchema}
      onSubmit={(values) => handleNext(values)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <Form onSubmit={handleSubmit}>
          <div style={styleHeight}>
            <div className="h-full">
              <HeaderLoader imgCmp={CreatePostHeader} />

              <div className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]">
                <Layout>
                  <textarea
                    value={values.details}
                    placeholder="Detalles del producto"
                    className="p-3 focus-visible:border-@sura-primary-900 focus-visible:outline-transparent resize-none h-64 w-full border-2 border-@sura-primary-200 rounded-md"
                    onChange={(value) =>
                      handleChange("details")(value)
                    }
                  ></textarea>

                  {errors.details && (
                    <Text
                      data-test="register-feedback-error"
                      className="text-red-500 mt-2"
                    >
                      {errors.details as string}
                    </Text>
                  )}
                </Layout>

                <div>
                  <DotStep value={4} count={7} />
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      onClick={() => navigate(-1)}
                      className={buttonVariants({
                        variant: "outline",
                      })}
                    >
                      Volver
                    </Button>
                    <Button type="submit">Siguiente</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
