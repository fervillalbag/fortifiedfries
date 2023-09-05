import { useProducts } from "../../hooks/products";
import { CardProduct, LoaderHome } from "./index";
import { Text } from "../../ui";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Seasons() {
  const { queryProduct } = useProducts();
  const productLastPosition = queryProduct?.data
    ? queryProduct?.data.length - 1
    : 0;

  const [scrollHorizontal, setScrollHorizontal] = useState(0);
  const scrollContainerRef = useRef<any>(null);

  const handleScroll = () => {
    setScrollHorizontal(scrollContainerRef.current.scrollLeft);
  };

  useEffect(() => {
    if (scrollHorizontal === 0) return;

    localStorage.setItem(
      "@SURA_SCROLL_SEASONS",
      scrollHorizontal.toString()
    );
  }, [scrollHorizontal]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollHorizontal;
    }
  }, [scrollHorizontal]);

  useEffect(() => {
    setScrollHorizontal(
      +localStorage.getItem("@SURA_SCROLL_SEASONS")!
    );
  }, []);

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener(
        "scroll",
        handleScroll
      );

      return () => {
        scrollContainerRef.current.removeEventListener(
          "scroll",
          handleScroll
        );
      };
    }
  }, []);

  return (
    <div className="bg-white py-4">
      <Text className="pl-5 text-[22px] font-medium text-@sura-primary-900">
        Primavera
      </Text>

      <div className="h-0 overflow-hidden">{scrollHorizontal}</div>

      <div className="mt-3">
        {queryProduct.isLoading ? (
          <LoaderHome />
        ) : queryProduct.data ? (
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto hide-scrollbar"
          >
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
