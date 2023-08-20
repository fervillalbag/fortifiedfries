import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { client } from "../../../supabase/client";
import { Text } from "../../ui";
import Line from "../Loader/Line";

interface CardProductProps {
  product: any;
}

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
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
    (currency: any) => currency.id === product.currency
  );

  return (
    <div className="relative">
      <button className="absolute top-2 right-2 w-8 h-8 rounded-full grid place-items-center bg-white shadow-xl">
        <img
          src="/icons/heart-no-like.svg"
          alt=""
          className="object-contain"
        />
      </button>

      <div>
        <img
          src={product.images[0]}
          alt=""
          className="w-full h-40 object-cover rounded-md"
        />
      </div>

      <div>
        <Text className="text-@sura-primary-900 mt-1">
          {product.title}
        </Text>
        <span className="font-extrabold mt-[2px] text-@sura-primary-700">
          {!currencyProduct || !currencies ? (
            <div>
              <Line width="28" height={20} rounded="sm" />
            </div>
          ) : (
            <div className="relative">
              <div className="absolute top-0 left-0 bg-transparent z-10 w-full h-full" />
              <NumericFormat
                className="w-32"
                prefix={`${currencyProduct?.name.toString()} `}
                value={product.price}
                thousandSeparator={true}
              />
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardProduct;
