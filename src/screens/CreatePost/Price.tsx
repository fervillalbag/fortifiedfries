import { forwardRef, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import classnames from "classnames";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

import { useHeight, useLocalStorageState } from "../../hooks";
import { useSaleStatus } from "../../hooks/sale-status";
import { useTypeProduct } from "../../hooks/type-product";
import { useCurrencies } from "../../hooks/currency";
import { HeaderLoader } from "../../components";
import { DotStep } from "../../components/Auth";
import { Layout } from "../../components/CreatePost";
import { Button, Input, Text, buttonVariants } from "../../ui";
import { SURA_CREATE_POST_INFO } from "../../utils/constants";
import { SURA_AUTH_TOKEN } from "../../utils/constants/auth";
import { getDataFromToken } from "../../helpers";

import CreatePostHeader from "../../assets/images/create-post-price.png";
import { createProduct } from "../../services";

const validationSchemaPrice = yup.object().shape({
  price: yup.string().required("El campo es obligatorio"),
  currency: yup.string().required("El campo es obligatorio"),
});

const PRICE_LIMIT = 1000000000;
const PRICE_MIN = 10000;

interface SelectItemProps
  extends React.ComponentPropsWithRef<typeof Select.Item> {
  children: React.ReactNode;
  className?: string;
}

const SelectItem: React.FC<SelectItemProps> = forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(
          "text-base leading-none mb-2 text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

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
  const queryCurrencies = useCurrencies();
  const queryTypeProduct = useTypeProduct("product");
  const user: any = getDataFromToken(token);

  // @ts-ignore
  const [errorMessage, setErrorMessage] = useState<null | string>(
    null
  );

  const handleNext = async (values: {
    currency: string;
    price: string;
  }) => {
    setLoading(true);
    if (!user || typeof user !== "object" || !user.id) {
      toast.error("Usuario no encontrado");
      return;
    }

    const priceValue = +values.price
      // @ts-ignore
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
      subCategory: value.subCategory || null,
      images: value.images,
      tags: value.tags,
      type: queryTypeProduct.data._id,
      statusProduct: value.status,
      saleStatus: querySaleStatus.data._id,
      ad: [],
      owner: user.id,
      measureType: "unit",
      // quantityType: 1,
      currency: values.currency || null,
    };

    try {
      const response = await createProduct(productData);

      if (response.status === 201) {
        toast.success("Product publicado");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error("Hubo un problema");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ price: value.price || "", currency: "" }}
      validationSchema={validationSchemaPrice}
      onSubmit={(values: { price: string; currency: string }) =>
        handleNext(values)
      }
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
                  <div className="flex gap-4">
                    <div>
                      <Select.Root
                        value={values.currency}
                        onValueChange={(value) => {
                          handleChange("currency")(value);
                        }}
                      >
                        <Select.Trigger
                          className="text-@sura-primary-600 w-full inline-flex items-center justify-between rounded px-[15px] text-lg leading-none h-full gap-[5px] bg-white text-violet11 border-2 border-@sura-primary-200 hover:bg-mauve3 data-[placeholder]:text-violet9 outline-none"
                          aria-label="Food"
                        >
                          <Select.Value placeholder="Seleccione una categoria" />
                          <Select.Icon className="text-violet11">
                            <ChevronDownIcon />
                          </Select.Icon>
                        </Select.Trigger>

                        <Select.Portal>
                          <Select.Content className="overflow-hidden pt-2 pb-1 bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                            <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                              <ChevronUpIcon />
                            </Select.ScrollUpButton>
                            <Select.Viewport className="p-[5px]">
                              <Select.Group>
                                <SelectItem
                                  value=""
                                  className="text-@sura-primary-500"
                                >
                                  Moneda
                                </SelectItem>
                                {queryCurrencies.isLoading
                                  ? null
                                  : queryCurrencies.data.map(
                                      (category: any) => (
                                        <SelectItem
                                          key={category._id}
                                          value={category._id}
                                          className="text-lg text-@sura-primary-700"
                                        >
                                          {category.value}
                                        </SelectItem>
                                      )
                                    )}
                              </Select.Group>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>

                    <div className="flex-1 price-container-input">
                      <NumericFormat
                        value={values.price}
                        onChange={handleChange("price")}
                        placeholder="Precio del producto"
                        onBlur={handleBlur("price")}
                        allowNegative={false}
                        customInput={Input}
                        thousandSeparator={true}
                      />
                    </div>
                  </div>

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
