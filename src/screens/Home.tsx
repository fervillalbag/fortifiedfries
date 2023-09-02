// import React, { useContext, useEffect, useState } from "react";
import React, { useContext, useState } from "react";

import {
  InputHome,
  // HeaderGallery,
  // CardProduct,
  ModalLogin,
  PromotionSection,
  RecentsSection,
  SeasonsSection,
} from "../components/Home";
import { HeaderHome, Layout } from "../components";
// import { Button, Text, buttonVariants } from "../ui";
// import { AuthenticatedContext, WindowSizeContext } from "../context";
import { AuthenticatedContext } from "../context";
// import { SURA_CREATE_POST_INFO } from "../utils/constants";
// import { client } from "../../supabase/client";
// import Line from "../components/Loader/Line";

// import NotResultIcon from "../assets/images/not-result-icon.png";

// const VALUE_AD = 3;

// function compararPorTypeAd(a: any, b: any): number {
//   if (a.typeAd === VALUE_AD && b.typeAd !== VALUE_AD) {
//     return -1;
//   } else if (a.typeAd !== VALUE_AD && b.typeAd === VALUE_AD) {
//     return 1;
//   } else {
//     return 0;
//   }
// }

const Home: React.FC = () => {
  // const [scrollY, setScrollY] = useState(0);
  const { isAuthenticated } = useContext(AuthenticatedContext);

  // const [categorySelected, setCategorySelected] = useState<
  //   number | null
  // >(null);
  // const { windowSize } = useContext(WindowSizeContext);

  // const [products, setProducts] = useState<any | null>(null);
  // const [errorProduct, setErrorProduct] = useState<any | null>(null);
  // const [categories, setCategories] = useState<any | null>(null);
  // const [errorCategories, setErrorCategories] = useState<any | null>(
  //   null
  // );

  const [showModalLogin, setShowModalLogin] = useState<boolean>(
    !isAuthenticated
  );

  // useEffect(() => {
  //   (async () => {
  //     const { data: products, error: errorProducts } = await client
  //       .from("Product")
  //       .select("id, images, title, price, currency, typeAd")
  //       .eq(
  //         categorySelected !== null ? "category" : "",
  //         categorySelected
  //       )
  //       .order("created_at", { ascending: false });

  //     if (errorProducts) {
  //       console.log("Productos no encontrados");
  //       return;
  //     }
  //     setErrorProduct(errorProducts);
  //     setProducts(products);
  //   })();
  // }, [categorySelected]);

  // useEffect(() => {
  //   (async () => {
  //     const { data: categories, error: errorCategories } =
  //       await client
  //         .from("CategoryProduct")
  //         .select("*")
  //         .order("created_at", { ascending: false });

  //     if (errorCategories) {
  //       console.log("Categoria no encontrados");
  //       setErrorCategories(errorCategories);
  //       return;
  //     }

  //     setCategories(categories);
  //   })();
  // }, []);

  // const handleScroll = () => {
  //   setScrollY(window.scrollY);
  // };

  // useEffect(() => {
  //   localStorage.setItem(SURA_CREATE_POST_INFO, "");
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // products?.sort(compararPorTypeAd);

  return (
    <Layout>
      <ModalLogin show={showModalLogin} setShow={setShowModalLogin} />

      <HeaderHome />
      <InputHome />

      <main className="py-5 flex flex-col gap-y-5">
        <PromotionSection />
        <RecentsSection />
        <SeasonsSection />
      </main>
    </Layout>
  );
};

export default Home;
