import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Formik } from "formik";
import { toast } from "react-hot-toast";

import { useHeight, useLocalStorageState } from "../../hooks";
import { useSaleStatus } from "../../hooks/sale-status";
import { useTypeProduct } from "../../hooks/type-product";
import { useCurrency } from "../../hooks/currency";
import { HeaderLoader } from "../../components";
import { DotStep } from "../../components/Auth";
import { Layout } from "../../components/CreatePost";
import { Button, Input, Text, buttonVariants } from "../../ui";
import { SURA_CREATE_POST_INFO } from "../../utils/constants";
import { SURA_AUTH_TOKEN } from "../../utils/constants/auth";
import { getDataFromToken } from "../../helpers";

import CreatePostHeader from "../../assets/images/create-post-price.png";

const validationSchemaPrice = yup.object().shape({
  price: yup.string().required("El campo es obligatorio"),
});

const PRICE_LIMIT = 1000000000;
const PRICE_MIN = 10000;

export default function Hashtag() {
  const [{ token }] = useLocalStorageState({
    key: SURA_AUTH_TOKEN,
  });

  const [value, handleUpdate] = useLocalStorageState({
    key: SURA_CREATE_POST_INFO,
  });

  const navigate = useNavigate();
  const styleHeight = useHeight();

  const [loading, setLoading] = useState<boolean>(false);

  const querySaleStatus = useSaleStatus("available");
  const queryCurrency = useCurrency("guaranies");
  const queryTypeProduct = useTypeProduct("product");
  const user: any = getDataFromToken(token);

  // @ts-ignore
  const [errorMessage, setErrorMessage] = useState<null | string>(
    null
  );

  const handleNext = async (values: any) => {
    setLoading(true);
    if (!user || typeof user !== "object" || !user.id) {
      toast.error("Usuario no encontrado");
      return;
    }

    const priceValue = +values.price
      .split("Gs. ")[1]
      .replaceAll(",", "");
    handleUpdate({ price: values.price });

    if (priceValue >= PRICE_LIMIT) {
      setLoading(false);
      toast("El precio no puede ser mayor a\nGs. 1.000.000.000", {
        icon: "⚠️",
      });
      return;
    }

    if (priceValue <= PRICE_MIN) {
      setLoading(false);
      toast("El precio no puede ser menor a\nGs. 10.000", {
        icon: "⚠️",
      });
      return;
    }

    const productData = {
      title: value.name,
      description: value.details,
      price: priceValue,
      category: value.category,
      images: value.images,
      tags: value.tags,
      type: queryTypeProduct.data._id,
      status: value.status,
      saleStatus: querySaleStatus.data._id,
      typeAd: [],
      owner: user.id,
      quantityType: 1,
      currency: queryCurrency.data._id,
    };

    console.log(productData);
    return;

    setLoading(false);
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

              <Layout>
                <div>
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
                </div>

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
              </Layout>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
