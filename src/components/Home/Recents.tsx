import { useEffect, useState } from "react";
import { Text } from "../../ui";
import { client } from "../../../supabase/client";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import { CardProduct, LoaderHome } from "./index";

import "swiper/css";
import "swiper/css/pagination";

export default function Recents() {
  const [products, setProducts] = useState<any | null>(null);
  const [errorProduct, setErrorProduct] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const { data: products, error: errorProducts } = await client
        .from("Product")
        .select("id, images, title, price, currency, typeAd")
        .order("created_at", { ascending: false });

      if (errorProducts) {
        console.log("Productos no encontrados");
        return;
      }
      setErrorProduct(errorProducts);
      setProducts(products);
    })();
  }, []);

  return (
    <div>
      <Text className="pl-5 text-[22px] font-medium text-@sura-primary-900">
        Recientes
      </Text>

      <div className="mt-3">
        {!errorProduct && !products ? (
          <LoaderHome />
        ) : products ? (
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={12}
            modules={[Pagination]}
            className="mySwiper pr-5"
          >
            {products?.map((product: any, index: number) => (
              <SwiperSlide
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
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div>error</div>
        )}
      </div>
    </div>
  );
}
