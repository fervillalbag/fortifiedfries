import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import { useProductDetail } from "../../../hooks/products";
import { Text, textVariants } from "../../../ui";

export function FormEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const queryProductDetail = useProductDetail(id as string);
  const [principalImageSelected, setPrincipalImageSelected] =
    useState<any>(null);

  useEffect(() => {
    if (
      !queryProductDetail ||
      queryProductDetail.isLoading ||
      queryProductDetail.isError
    ) {
      return;
    }

    const { data } = queryProductDetail;

    if (data && data.data.images.length > 0) {
      setPrincipalImageSelected(data.data.images[0]);
    }
  }, [queryProductDetail.isSuccess]);

  if (queryProductDetail.isLoading) return <div>Cargando..</div>;
  if (queryProductDetail.isError)
    return <div>Hubo un problema..</div>;

  const product = queryProductDetail.data.data;

  return (
    <div className="pb-6">
      <div className="p-5 flex items-center gap-4">
        <button
          className="w-[45px] h-[45px] bg-@sura-primary-900 rounded-md text-white grid place-items-center"
          onClick={() => navigate(-1)}
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.75153 5.97482L6.78349 1.94286C6.99562 1.72946 7.11469 1.44078 7.11469 1.13988C7.11469 0.838981 6.99562 0.550307 6.78349 0.336906C6.67761 0.230152 6.55163 0.145419 6.41284 0.0875946C6.27405 0.0297705 6.12518 0 5.97482 0C5.82446 0 5.67559 0.0297705 5.5368 0.0875946C5.398 0.145419 5.27203 0.230152 5.16615 0.336906L0.336906 5.16615C0.230152 5.27203 0.145419 5.398 0.0875951 5.5368C0.029771 5.67559 0 5.82446 0 5.97482C0 6.12518 0.029771 6.27405 0.0875951 6.41284C0.145419 6.55163 0.230152 6.67761 0.336906 6.78349L5.16615 11.6697C5.27257 11.7752 5.39879 11.8588 5.53756 11.9154C5.67633 11.9721 5.82492 12.0008 5.97482 12C6.12471 12.0008 6.27331 11.9721 6.41208 11.9154C6.55085 11.8588 6.67706 11.7752 6.78349 11.6697C6.99562 11.4563 7.11469 11.1676 7.11469 10.8667C7.11469 10.5658 6.99562 10.2771 6.78349 10.0637L2.75153 5.97482Z"
              fill="#fff"
            />
          </svg>
        </button>

        <button
          className="border border-dashed border-yellow-500 py-1 p-2"
          onClick={() =>
            navigate(`/product/edit/title/${product._id}`)
          }
        >
          <Text className="text-@sura-primary-900 text-[22px] font-medium">
            {queryProductDetail?.data.data.title}
          </Text>
        </button>
      </div>

      <div className="px-5">
        <button
          onClick={() =>
            navigate(`/product/edit/images/${product._id}`)
          }
          className="w-full border border-yellow-500 p-3 border-dashed"
        >
          <div className="relative">
            <div className="relative">
              {product.images.map(
                (image: string) =>
                  image === principalImageSelected && (
                    <img
                      src={principalImageSelected}
                      alt=""
                      className={`h-[360px] w-full object-cover object-center rounded-sm ${
                        image === principalImageSelected
                          ? "opacity-100 block"
                          : "opacity-0 hidden"
                      }`}
                    />
                  )
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3">
            {product.images.map((image: string) => (
              <button
                key={image}
                onClick={() => setPrincipalImageSelected(image)}
                className={`relative z-[50] ring-offset-2 w-full ring-[3px] rounded-sm overflow-hidden ${
                  principalImageSelected === image
                    ? "ring-@sura-primary-800"
                    : "ring-transparent"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className={`w-full h-[110px] object-cover rounded-sm `}
                />
              </button>
            ))}
          </div>
        </button>

        <button
          className="text-left w-full p-2 border border-yellow-500 border-dashed mt-5"
          onClick={() =>
            navigate(`/product/edit/description/${product._id}`)
          }
        >
          <Text
            className={textVariants({
              variant: "subtitle",
              className: "mb-2 text-xl",
            })}
          >
            Descripción
          </Text>

          <ReactMarkdown className="product-description text-@sura-primary-400">
            {product.description}
          </ReactMarkdown>
        </button>

        <button
          className="text-left w-full p-2 border border-yellow-500 border-dashed mt-5"
          onClick={() =>
            navigate(`/product/edit/description/${product._id}`)
          }
        >
          <Text
            className={textVariants({
              variant: "subtitle",
              className: "mb-2 text-xl",
            })}
          >
            Estado del producto
          </Text>

          <Text>{product.statusProduct.name}</Text>
        </button>

        <button
          className="text-left w-full p-2 border border-yellow-500 border-dashed mt-5"
          onClick={() =>
            navigate(`/product/edit/description/${product._id}`)
          }
        >
          <Text
            className={textVariants({
              variant: "subtitle",
              className: "mb-2 text-xl",
            })}
          >
            Metodo de pago
          </Text>

          <ul className="list-disc pl-6 text-@sura-primary-400">
            <li>Transferencia</li>
            <li>Efectivo</li>
            <li>Tarjeta</li>
          </ul>
        </button>

        <button
          className="text-left w-full p-2 border border-yellow-500 border-dashed mt-5"
          onClick={() =>
            navigate(`/product/edit/description/${product._id}`)
          }
        >
          <Text
            className={textVariants({
              variant: "subtitle",
              className: "mb-2 text-xl",
            })}
          >
            Precio
          </Text>

          <NumericFormat
            className="text-@sura-primary-400"
            prefix={`${product.currency.value} `}
            value={product.price}
            thousandSeparator={true}
          />
        </button>

        <button
          className="text-left w-full p-2 border border-yellow-500 border-dashed mt-5"
          onClick={() =>
            navigate(`/product/edit/description/${product._id}`)
          }
        >
          <Text
            className={textVariants({
              variant: "subtitle",
              className: "mb-2 text-xl",
            })}
          >
            Ubicacion
          </Text>

          <Text>San Lorenzo, Sinalco</Text>
        </button>
      </div>

      <div className="fixed top-0 text-xs py-1 px-2 rounded-bl-md bg-white right-0">
        Modo edicion
      </div>
    </div>
  );
}
