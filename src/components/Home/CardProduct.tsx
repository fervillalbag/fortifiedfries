import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { client } from "../../../supabase/client";
import { Text } from "../../ui";
import Line from "../Loader/Line";
import { useNavigate } from "react-router-dom";

interface CardProductProps {
  id: number;
  title: string;
  images: string[];
  price: number;
  currency: number;
}

const CardProduct: React.FC<CardProductProps> = ({
  id,
  title,
  images,
  price,
  currency,
}: CardProductProps) => {
  const navigate = useNavigate();
  const [currencies, setCurrencies] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const { data: currencies, error: errorCurrencies } =
        await client.from("CurrencyProduct").select("*");

      if (errorCurrencies) {
        console.log("No se encontraron monedas");
        return;
      }

      setCurrencies(currencies);
    })();
  }, []);

  const currencyProduct = currencies?.find(
    (currencyData: any) => currencyData.id === currency
  );

  return (
    <div className="relative">
      <button className="z-10 absolute top-2 right-2 w-8 h-8 rounded-full grid place-items-center bg-white shadow-xl">
        <img
          src="/icons/heart-no-like.svg"
          alt=""
          className="object-contain"
        />
      </button>

      <div onClick={() => navigate(`/product/${id}`)}>
        <div>
          <img
            src={images[0]}
            alt=""
            className="w-full h-40 object-cover rounded-md"
          />
        </div>

        <div>
          <Text className="text-@sura-primary-900 mt-1">
            {title.length >= 16 ? `${title.slice(0, 16)}..` : title}
          </Text>
          <span className="font-extrabold mt-[2px] text-@sura-primary-700">
            {!currencyProduct || !currencies ? (
              <div>
                <Line width={112} height={24} rounded="sm" />
              </div>
            ) : (
              <div className="relative">
                <div
                  className="absolute top-0 left-0 bg-transparent z-10 w-full h-full"
                  aria-hidden="true"
                />
                <NumericFormat
                  className="w-32"
                  prefix={`${currencyProduct?.name.toString()} `}
                  value={price}
                  thousandSeparator={true}
                />
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
