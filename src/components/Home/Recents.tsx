import { Link } from "react-router-dom";

import { CardProduct, LoaderHome } from "./index";
import { useProducts } from "../../hooks/products";
import { Text } from "../../ui";
import type { ProductProps } from "../../hooks/products/useProduct";

export default function Recents() {
  const { queryProduct: query } = useProducts();
  const products = query?.data;

  const productLimit = products ? products.data.slice(0, 4) : [];

  return (
    <div>
      <div className="px-5 flex mb-2 items-center justify-between">
        <Text className="text-[22px] font-medium text-@sura-primary-900">
          Recientes
        </Text>
        <Link
          to="/"
          className="font-medium text-sm uppercase text-@sura-primary-500"
        >
          Ver mas
        </Link>
      </div>

      <div className="mt-3">
        {query.isLoading ? (
          <LoaderHome />
        ) : productLimit ? (
          <div className="px-5 grid grid-cols-2 gap-x-3 gap-y-4 overflow-x-auto hide-scrollbar">
            {productLimit.map(
              (product: ProductProps, index: number) => (
                <CardProduct
                  index={index}
                  key={product._id}
                  width="full"
                  typeAd={0}
                  title={product.title}
                  currency={product.currency.value}
                  id={product._id}
                  images={product.images}
                  price={product.price}
                />
              )
            )}
          </div>
        ) : (
          <div>error</div>
        )}
      </div>
    </div>
  );
}
