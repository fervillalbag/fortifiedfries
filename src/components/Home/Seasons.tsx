import { Link } from "react-router-dom";

import type { ProductProps } from "../../hooks/products/useProduct";
import { useProducts } from "../../hooks/products";
import { CardProduct, LoaderHome } from "./index";
import { Text } from "../../ui";

interface SeasonsProps {
  isPromo?: boolean;
}

export default function Seasons({ isPromo }: SeasonsProps) {
  const { queryProduct } = useProducts();
  const productLimit = queryProduct?.data
    ? queryProduct.data.slice(0, 4)
    : [];

  return (
    <div>
      <div className="px-5 mb-2 flex items-center justify-between">
        <Text
          className={`text-[22px] font-medium text-@sura-primary-900`}
        >
          Primavera
        </Text>
        <Link
          to="/"
          className={`font-medium text-sm uppercase text-@sura-primary-600`}
        >
          Ver mas
        </Link>
      </div>

      <div className="mt-3">
        {queryProduct.isLoading ? (
          <LoaderHome />
        ) : productLimit ? (
          <div className="px-5 grid grid-cols-2 gap-3 overflow-x-auto hide-scrollbar">
            {productLimit
              .slice(0, 3)
              .map((product: ProductProps, index: number) => (
                <CardProduct
                  index={index}
                  isPromo={isPromo}
                  key={product.id}
                  width="full"
                  typeAd={0}
                  title={product.title}
                  currency={product.currency}
                  id={product.id}
                  images={product.images}
                  price={product.price}
                />
              ))}
          </div>
        ) : (
          <div>error</div>
        )}
      </div>
    </div>
  );
}
