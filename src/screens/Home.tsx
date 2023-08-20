import React, { useContext, useEffect, useState } from "react";

import {
  HeaderGallery,
  CardProduct,
  ModalLogin,
} from "../components/Home";
import { Layout } from "../components";
import { Button, Text, buttonVariants } from "../ui";
import { AuthenticatedContext, WindowSizeContext } from "../context";
import { SURA_CREATE_POST_INFO } from "../utils/constants";
import { client } from "../../supabase/client";
import Line from "../components/Loader/Line";

import NotResultIcon from "../assets/images/not-result-icon.png";

const headerImages = [
  {
    id: "1",
    image: "https://shorturl.at/xKRW3",
  },
  {
    id: "2",
    image: "https://shorturl.at/nxyV1",
  },
  {
    id: "3",
    image: "https://shorturl.at/FPX01",
  },
  {
    id: "4",
    image: "https://shorturl.at/abkpX",
  },
];

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const { isAuthenticated } = useContext(AuthenticatedContext);

  const [categorySelected, setCategorySelected] = useState<
    number | null
  >(null);
  const { windowSize } = useContext(WindowSizeContext);

  const [products, setProducts] = useState<any | null>(null);
  const [errorProduct, setErrorProduct] = useState<any | null>(null);
  const [categories, setCategories] = useState<any | null>(null);
  const [errorCategories, setErrorCategories] = useState<any | null>(
    null
  );

  const [showModalLogin, setShowModalLogin] = useState<boolean>(
    !isAuthenticated
  );

  useEffect(() => {
    (async () => {
      const { data: products, error: errorProducts } = await client
        .from("Product")
        .select("*")
        .eq(
          categorySelected !== null ? "category" : "",
          categorySelected
        );

      if (errorProducts) {
        console.log("Productos no encontrados");
        return;
      }
      setErrorProduct(errorProducts);
      setProducts(products);
    })();
  }, [categorySelected]);

  useEffect(() => {
    (async () => {
      const { data: categories, error: errorCategories } =
        await client
          .from("CategoryProduct")
          .select("*")
          .order("created_at", { ascending: false });

      if (errorCategories) {
        console.log("Categoria no encontrados");
        setErrorCategories(errorCategories);
        return;
      }

      setCategories(categories);
    })();
  }, []);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    localStorage.setItem(SURA_CREATE_POST_INFO, "");
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout>
      <ModalLogin show={showModalLogin} setShow={setShowModalLogin} />

      <div className="p-5 pb-2">
        <HeaderGallery data={headerImages} />
      </div>

      {!errorCategories && !categories ? (
        <div className="px-5 py-3 flex gap-x-3 overflow-x-auto hide-scrollbar">
          <Line rounded="md" width={32} height={48}></Line>
          <Line rounded="md" width={32} height={48}></Line>
          <Line rounded="md" width={32} height={48}></Line>
          <Line rounded="md" width={32} height={48}></Line>
          <Line rounded="md" width={32} height={48}></Line>
        </div>
      ) : errorCategories ? (
        <div>error</div>
      ) : (
        <div
          className={`${
            scrollY > 300 && "shadow-lg"
          } sticky top-0 z-20 bg-white py-3 flex w-[${
            windowSize - 20
          }px] overflow-x-auto pl-5 gap-3 hide-scrollbar`}
        >
          <Button
            onClick={() => setCategorySelected(null)}
            className={buttonVariants({
              variant: `${
                categorySelected === null ? "default" : "outline"
              }`,
              className: `mr-0 h-12 flex-1 px-7 focus:outline-none focus:ring-opacity-0 focus:ring-0`,
            })}
          >
            Todos
          </Button>
          {categories.map((category: any, index: number) => (
            <Button
              key={category.id}
              onClick={() => setCategorySelected(category.id)}
              className={buttonVariants({
                variant: `${
                  category.id === categorySelected
                    ? "default"
                    : "outline"
                }`,
                className: `h-12 flex-1 px-7 focus:outline-none focus:ring-opacity-0 focus:ring-0 ${
                  index === categories.length - 1 ? "mr-5" : "mr-0"
                }`,
              })}
            >
              {category.name}
            </Button>
          ))}
        </div>
      )}

      {!products && !errorProduct ? (
        <div className="p-5 pt-2 grid grid-cols-2 gap-5">
          <Line rounded="md" width="full" height={208} />
          <Line rounded="md" width="full" height={208} />
          <Line rounded="md" width="full" height={208} />
          <Line rounded="md" width="full" height={208} />
        </div>
      ) : errorProduct ? (
        <div>error</div>
      ) : products?.length === 0 ? (
        <div className="px-5 py-6 w-72 mx-auto grid place-items-center">
          <img
            src={NotResultIcon}
            alt=""
            className="w-12 object-contain mb-3"
          />
          <Text className="text-center">
            No hay productos disponibles con esta categoría en este
            momento.
          </Text>
        </div>
      ) : (
        <div className="p-5 pt-2 grid grid-cols-2 gap-5">
          {products.map((product: any) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Home;
