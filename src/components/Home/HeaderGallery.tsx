import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import Line from "../Loader/Line";
import { client } from "../../../supabase/client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
      {products.map((product: any) => {
        const urlImage1 = product?.images[0]?.split("upload");
        const urlImage2 = `${urlImage1[0]}upload/w_1400,h_1400,c_crop${urlImage1[1]}`;

        return (
          <SwiperSlide
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="h-48">
              <img
                src={urlImage2}
                alt=""
                className={`rounded-md w-full h-full object-cover`}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeaderGallery;
