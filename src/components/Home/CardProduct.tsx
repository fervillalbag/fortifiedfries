import React from "react";
import { Text } from "../../ui";

interface CardProductProps {
  product: any;
}

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  return (
    <div className="relative">
      <button className="absolute top-2 right-2 w-8 h-8 rounded-full grid place-items-center bg-white">
        <img
          src="/icons/heart-no-like.svg"
          alt=""
          className="object-contain"
        />
      </button>

      <div>
        <img
          src={product.image}
          alt=""
          className="w-full h-40 object-cover rounded-md"
        />
      </div>

      <div>
        <Text className="text-@sura-primary font-bold mt-1">
          Brown Blazer Coat..
        </Text>
        <Text className="font-bold mt-[2px]">Gs. 200.000</Text>
      </div>
    </div>
  );
};

export default CardProduct;
