import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";

import { useHeight, useLocalStorageState } from "../../hooks";
import { Button, Text, buttonVariants } from "../../ui";
import { DotStep } from "../../components/Auth";
import { HeaderLoader } from "../../components";
import { Layout } from "../../components/CreatePost";
import { SURA_CREATE_POST_INFO } from "../../utils/constants";

import CreatePostHeader from "../../assets/images/create-post-status.png";

const validationStatusSchema = yup.object().shape({
  status: yup.string().required("El campo es obligatorio"),
});

export default function Status() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const [_, handleUpdate] = useLocalStorageState({
    key: SURA_CREATE_POST_INFO,
  });

  const handleNext = (values: any) => {
    handleUpdate(values);
    navigate("/create-post-category");
  };

  return (
    <Formik
      initialValues={{ status: "" }}
      validationSchema={validationStatusSchema}
      onSubmit={(values) => handleNext(values)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <Form onSubmit={handleSubmit}>
          <div style={styleHeight}>
            <div className="h-full">
              <HeaderLoader imgCmp={CreatePostHeader} />

              <div className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]">
                <Layout>
                  <h3 className="mb-3 text-lg text-@sura-primary-900">
                    Estado del producto
                  </h3>

                  <div className="flex flex-col space-y-3">
                    <label className="flex items-center gap-2">
                      <Field
                        className="bg-white border border-@sura-primary-300 w-[25px] h-[25px] rounded-full focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none cursor-default"
                        type="radio"
                        value="usado"
                        name="status"
                        onChange={handleChange}
                        checked={values.status === "usado"}
                      ></Field>
                      Usado
                    </label>
                    <label className="flex items-center gap-2">
                      <Field
                        className="bg-white border border-@sura-primary-300 w-[25px] h-[25px] rounded-full focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none cursor-default"
                        type="radio"
                        value="nuevo"
                        name="status"
                        onChange={handleChange}
                        checked={values.status === "nuevo"}
                      />
                      Nuevo
                    </label>
                    <label className="flex items-center gap-2">
                      <Field
                        className="bg-white border border-@sura-primary-300 w-[25px] h-[25px] rounded-full focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none cursor-default"
                        type="radio"
                        value="semi-nuevo"
                        name="status"
                        onChange={handleChange}
                        checked={values.status === "semi-nuevo"}
                      />
                      Semi nuevo
                    </label>

                    {errors.status && (
                      <Text
                        data-test="register-feedback-error"
                        className="text-red-500 mt-2"
                      >
                        {errors.status as string}
                      </Text>
                    )}
                  </div>
                </Layout>

                <div>
                  <DotStep value={2} count={7} />
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
