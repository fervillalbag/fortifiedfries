import { CardProduct, LoaderHome } from "./index";
import { useProductsPromotions } from "../../hooks/products";
import { Text } from "../../ui";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Promotions() {
  const { queryProduct } = useProductsPromotions();
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
      "@SURA_SCROLL_RECENTS",
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
      +localStorage.getItem("@SURA_SCROLL_RECENTS")!
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
    <div>
      <Text className="pl-5 text-[22px] font-medium text-@sura-primary-900">
        Promociones
      </Text>

      <div className="h-0 overflow-hidden">{scrollHorizontal}</div>

      <div className="mt-3">
        {queryProduct.isLoading ? (
          <LoaderHome />
        ) : queryProduct.data ? (
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto hide-scrollbar pr-5"
          >
            {queryProduct.data.map((product: any, index: number) => (
              <div
                className={`w-min ${index === 0 ? "pl-5" : "pl-0"} ${
                  index === productLastPosition ? "pr-5" : "pr-3"
                }`}
                key={product.id}
              >
                <CardProduct
                  typeAd={3}
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
