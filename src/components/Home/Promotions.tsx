import type { ProductPromotionsProps } from "../../hooks/products/usePromotions";
import { CardProduct, LoaderHome } from "./index";
import { useProductsPromotions } from "../../hooks/products";
import { Text } from "../../ui";

export default function Promotions({ typeAd }: any) {
  const { queryProduct } = useProductsPromotions(typeAd?._id);
  const products = queryProduct?.data;

  const productLastPosition = products ? products.length - 1 : 0;

  return (
    <div>
      <Text className="pl-5 mb-2 text-[22px] font-medium text-@sura-primary-900">
        Promociones
      </Text>

      <div className="mt-3">
        {queryProduct.isLoading ? (
          <LoaderHome />
        ) : products.data ? (
          <div className="flex overflow-x-auto hide-scrollbar pr-5">
            {products.data.map(
              (product: ProductPromotionsProps, index: number) => (
                <div
                  className={`w-min ${
                    index === 0 ? "pl-5" : "pl-0"
                  } ${
                    index === productLastPosition ? "pr-5" : "pr-3"
                  }`}
                  key={product._id}
                >
                  <CardProduct
                    id={product._id}
                    index={index}
                    typeAd={3}
                    title={product.title}
                    currency={product.currency.value}
                    images={product.images}
                    price={product.price}
                  />
                </div>
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
