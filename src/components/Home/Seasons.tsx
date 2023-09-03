import { useProducts } from "../../hooks/products";
import { CardProduct, LoaderHome } from "./index";
import { Text } from "../../ui";

export default function Seasons() {
  const { queryProduct } = useProducts();

  return (
    <div className="bg-white py-4">
      <Text className="pl-5 text-[22px] font-medium text-@sura-primary-900">
        Primavera
      </Text>

      <div className="mt-3">
        {queryProduct.isLoading ? (
          <LoaderHome />
        ) : queryProduct.data ? (
          <div className="flex overflow-x-auto gap-x-3 hide-scrollbar pr-5">
            {queryProduct.data.map((product: any, index: number) => (
              <div
                className={`w-min ${index === 0 ? "pl-5" : "pl-0"}`}
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
