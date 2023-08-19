import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Formik } from "formik";

import { useHeight, useLocalStorageState } from "../../hooks";
import { HeaderLoader } from "../../components";
import { DotStep } from "../../components/Auth";
import { Button, Input, Text, buttonVariants } from "../../ui";
import { Layout } from "../../components/CreatePost";

import CreatePostHeader from "../../assets/images/create-post-price.png";
import { useState } from "react";
import { SURA_CREATE_POST_INFO } from "../../utils/constants";

const validationSchemaPrice = yup.object().shape({
  price: yup.string().required("El campo es obligatorio"),
});

export default function Hashtag() {
  const navigate = useNavigate();
  const styleHeight = useHeight();
  const [currency] = useState<string>("gs");

  const [errorMessage, setErrorMessage] = useState<null | string>(
    null
  );

  const [value, handleUpdate] = useLocalStorageState({
    key: SURA_CREATE_POST_INFO,
  });

  const handleNext = (values: any) => {
    const price = +values.price.split("Gs. ")[1].replace(",", "");

    if (price < 5000) {
      setErrorMessage(
        "El precio es muy bajo. Debe ser superior a Gs. 5.000"
      );
      return;
    }

    console.log({ value });
    handleUpdate({ price, currency });
    setErrorMessage(null);
    console.log({ price });
    return;
    navigate("/home");
  };

  return (
    <Formik
      initialValues={{ price: "" }}
      validationSchema={validationSchemaPrice}
      onSubmit={(values: { price: string }) => handleNext(values)}
    >
      {({
        handleBlur,
        handleChange,
        values,
        handleSubmit,
        errors,
      }) => (
        <form className="h-full" onSubmit={handleSubmit}>
          <div style={styleHeight}>
            <div className="h-full">
              <HeaderLoader imgCmp={CreatePostHeader} />

              <div className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]">
                <Layout>
                  <NumericFormat
                    value={values.price}
                    onChange={handleChange("price")}
                    placeholder="Precio del producto"
                    onBlur={handleBlur("price")}
                    allowNegative={false}
                    customInput={Input}
                    prefix="Gs. "
                    thousandSeparator={true}
                  />

                  {errors.price || errorMessage ? (
                    <Text
                      data-test="register-feedback-error"
                      className="text-red-500 mt-2"
                    >
                      {errors.price || errorMessage}
                    </Text>
                  ) : null}
                </Layout>

                <div>
                  <DotStep value={7} count={7} />
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
        </form>
      )}
    </Formik>
  );
}
