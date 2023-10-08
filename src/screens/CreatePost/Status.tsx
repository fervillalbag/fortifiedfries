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
import { useStatusProducts } from "../../hooks/status";

const validationStatusSchema = yup.object().shape({
  status: yup.string().required("El campo es obligatorio"),
});

export default function Status() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const queryStatusProduct = useStatusProducts();

  const [value, handleUpdate] = useLocalStorageState({
    key: SURA_CREATE_POST_INFO,
  });

  const handleNext = (values: { status: "string" }) => {
    handleUpdate({
      status: values.status,
    });
    navigate("/create-post-category");
  };

  return (
    <Formik
      initialValues={{ status: value.status || "" }}
      validationSchema={validationStatusSchema}
      onSubmit={(values) => handleNext(values)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <Form onSubmit={handleSubmit}>
          <div style={styleHeight}>
            <div className="h-full">
              <HeaderLoader imgCmp={CreatePostHeader} />

              <Layout>
                <div className="flex flex-col">
                  <h3 className="mb-3 text-@sura-primary-500">
                    Estado del producto
                  </h3>

                  <div className="flex flex-col space-y-3">
                    {queryStatusProduct.isLoading
                      ? null
                      : queryStatusProduct.data.map((item: any) => (
                          <label
                            key={item._id}
                            className="flex items-center gap-2"
                          >
                            <Field
                              className="bg-white border border-@sura-primary-300 w-[25px] h-[25px] rounded-full focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none cursor-default"
                              type="radio"
                              value={item._id}
                              name="status"
                              checked={values.status === item._id}
                              onChange={() => {
                                handleChange({
                                  target: {
                                    name: "status",
                                    value: item._id,
                                  },
                                });
                              }}
                            ></Field>
                            {item.name === "new"
                              ? "Nuevo"
                              : item.name === "used"
                              ? "Usado"
                              : "Semi nuevo"}
                          </label>
                        ))}
                  </div>

                  {errors.status && (
                    <Text
                      data-test="register-feedback-error"
                      className="text-red-500 mt-2"
                    >
                      {errors.status as string}
                    </Text>
                  )}
                </div>

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
              </Layout>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
