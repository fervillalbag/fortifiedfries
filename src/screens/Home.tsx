// import React, { useContext, useEffect, useState } from "react";
import React, { useContext, useRef, useState } from "react";

import {
  // HeaderGallery,
  // CardProduct,
  ModalLogin,
} from "../components/Home";
import { Layout } from "../components";
// import { Button, Text, buttonVariants } from "../ui";
// import { AuthenticatedContext, WindowSizeContext } from "../context";
import { AuthenticatedContext } from "../context";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Text } from "../ui";
import Promotions from "../components/Home/Promotions";
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
  const inputRef = useRef<any>(null);

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

      <div className="p-5 h-[120px] bg-@sura-primary-900">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <UserCircleIcon className="w-12 h-12 rounded-full text-@sura-primary-100" />
            <div>
              <Text className="text-@sura-primary-100 font-bold text-xl">
                <span className="font-normal">Hola</span> Lucas!
              </Text>
              <Text className="text-sm -mt-[3px] text-@sura-primary-300">
                Cuenta y ajustes
              </Text>
            </div>
          </div>
          <button className="grid place-items-center h-12 w-12 rounded-md bg-@sura-primary-200">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 9H27M5 16H27M16 23H27"
                stroke="#1C2331"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-5">
        <div className="relative -mt-[27px]">
          <input
            ref={inputRef}
            placeholder="Buscar"
            className="pl-12 rounded-md shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.08)] bg-white h-[54px] w-full focus-visible:outline-transparent focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-@sura-primary-600"
          />

          <button
            onClick={() => inputRef.current.focus()}
            className="absolute left-[14px] top-1/2 -translate-y-1/2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L16.657 16.657M16.657 16.657C17.3998 15.9141 17.9891 15.0322 18.3912 14.0616C18.7932 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.94942 18.7932 8.90911 18.3912 7.93848C17.9891 6.96785 17.3998 6.08591 16.657 5.34302C15.9141 4.60014 15.0321 4.01084 14.0615 3.6088C13.0909 3.20675 12.0506 2.99982 11 2.99982C9.94936 2.99982 8.90905 3.20675 7.93842 3.6088C6.96779 4.01084 6.08585 4.60014 5.34296 5.34302C3.84263 6.84335 2.99976 8.87824 2.99976 11C2.99976 13.1218 3.84263 15.1567 5.34296 16.657C6.84329 18.1574 8.87818 19.0002 11 19.0002C13.1217 19.0002 15.1566 18.1574 16.657 16.657Z"
                stroke="#A9ABB0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <Promotions />
    </Layout>
  );
};

export default Home;
