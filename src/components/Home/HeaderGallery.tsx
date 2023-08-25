import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { client } from "../../../supabase/client";
import Line from "../Loader/Line";
import { useNavigate } from "react-router-dom";

const HeaderGallery: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any>(null);
  const [errorProducts, setErrorProducts] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data: products, error: errorProducts } = await client
        .from("Product")
        .select("id, images")
        .eq("typeAd", 4);

      if (errorProducts) {
        console.log("Ha ocurrido un error");
        setErrorProducts(errorProducts);
        return;
      }

      setProducts(products);
    })();
  }, []);

  if (!errorProducts && !products) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <Line width="100%" height={192} rounded="md" />
        <Line width="100%" height={192} rounded="md" />
      </div>
    );
  }

  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper rounded-md"
    >
      {products.map((product: any) => (
        <SwiperSlide
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="h-48">
            <img
              src={product.images[0]}
              alt=""
              className={`rounded-md w-full h-full object-cover`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeaderGallery;
