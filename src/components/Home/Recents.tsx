import { Link } from "react-router-dom";

import { CardProduct, LoaderHome } from "./index";
import { useProducts } from "../../hooks/products";
import { Text } from "../../ui";

export default function Recents() {
  const { queryProduct } = useProducts();
  const productLimit = queryProduct?.data
    ? queryProduct.data.slice(0, 4)
    : [];

  return (
    <div>
      <div className="px-5 flex items-center justify-between">
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
        {queryProduct.isLoading ? (
          <LoaderHome />
        ) : productLimit ? (
          <div className="px-5 grid grid-cols-2 gap-5 overflow-x-auto hide-scrollbar">
            {productLimit.map((product: any) => (
              <CardProduct
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
