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
import { client } from "../../../supabase/client";

const validationSchemaPrice = yup.object().shape({
  price: yup.string().required("El campo es obligatorio"),
});

export default function Hashtag() {
  const navigate = useNavigate();
  const styleHeight = useHeight();
  const [currency] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<null | string>(
    null
  );

  const [value] = useLocalStorageState({
    key: SURA_CREATE_POST_INFO,
  });

  const handleNext = async (values: any) => {
    setLoading(true);

    const { data, error } = await client.auth.getUser();
    if (error) return;

    const { data: dataUser, error: errorUser } = await client
      .from("Personal")
      .select("*")
      .eq("email", data.user.email)
      .single();
    if (errorUser) return;

    const price =
      typeof values.price === "number"
        ? values.price
        : +values.price.split("Gs. ")[1].replace(",", "");

    if (price < 5000) {
      setErrorMessage(
        "El precio es muy bajo. Debe ser superior a Gs. 5.000"
      );
      return;
    }

    const productData = {
      title: value.name,
      description: value.details,
      price,
      category: +value.category,
      images: value.images,
      tags: value.tags,
      type: 3,
      status: +value.status,
      saleStatus: 2,
      typeAd: null,
      owner: dataUser.id,
      quantityType: 1,
      currency,
    };

    const { status } = await client
      .from("Product")
      .insert(productData);

    if (status === 201) {
      console.log("Creado correctamente");
      setErrorMessage(null);
      navigate("/home");
      setLoading(false);
      return;
    }

    setLoading(false);
    console.log("Hubo un problema");
  };

  return (
    <Formik
      initialValues={{ price: value.price || "" }}
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
                    <Button type="submit" isLoading={loading}>
                      Siguiente
                    </Button>
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
