import { CardProduct, LoaderHome } from "./index";
import { useProducts } from "../../hooks/products";
import { Text } from "../../ui";

export default function Recents() {
  const { queryProduct } = useProducts();
  const productLastPosition = queryProduct?.data
    ? queryProduct?.data.length - 1
    : 0;

  return (
    <div>
      <Text className="pl-5 text-[22px] font-medium text-@sura-primary-900">
        Recientes
      </Text>

      <div className="mt-3">
        {queryProduct.isLoading ? (
          <LoaderHome />
        ) : queryProduct.data ? (
          <div className="flex overflow-x-auto hide-scrollbar">
            {queryProduct.data.map((product: any, index: number) => (
              <div
                className={`w-min ${index === 0 ? "pl-5" : "pl-0"} ${
                  index === productLastPosition ? "pr-5" : "pr-3"
                }`}
                key={product.id}
              >
                <CardProduct
                  typeAd={0}
                  title={product.title}
                  currency={product.currency}
                  id={product.id}
                  images={product.images}
                  price={product.price}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>error</div>
        )}
      </div>
    </div>
  );
}
