import React, { useContext, useEffect, useState } from "react";

import {
  HeaderGallery,
  CardProduct,
  ModalLogin,
} from "../components/Home";
import { Layout } from "../components";
import { Button, buttonVariants } from "../ui";
import { WindowSizeContext } from "../context";
import { NURA_AUTH_USER_INFO } from "../utils/constants/auth";
import { SURA_CREATE_POST_INFO } from "../utils/constants";

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

const categories = [
  {
    id: "1",
    text: "Todos",
  },
  {
    id: "2",
    text: "Informatica",
  },
  {
    id: "3",
    text: "Muebles",
  },
  {
    id: "4",
    text: "Prendas",
  },
];

const products = [
  {
    id: "1",
    image: "https://shorturl.at/bot19",
    title: "Lorem ipsum dolor sit amet consectetur. Lorem, ipsum.",
  },
  {
    id: "2",
    image: "https://shorturl.at/dtzT8",
    title: "Lorem ipsum dolor.",
  },
  {
    id: "3",
    image: "https://shorturl.at/hlQZ0",
    title:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet.",
  },
  {
    id: "4",
    image: "https://shorturl.at/arDQS",
    title: "Lorem ipsum dolor sit amet consectetur. Lorem.",
  },
  {
    id: "5",
    image: "https://shorturl.at/dtzT8",
    title:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: "6",
    image: "https://shorturl.at/hlQZ0",
    title: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: "7",
    image: "https://shorturl.at/hlQZ0",
    title:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet.",
  },
  {
    id: "8",
    image: "https://shorturl.at/arDQS",
    title: "Lorem ipsum dolor sit amet consectetur. Lorem.",
  },
];

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  const [showModalLogin, setShowModalLogin] =
    useState<boolean>(false);

  const [categorySelected, setCategorySelected] =
    useState<string>("1");
  const { windowSize } = useContext(WindowSizeContext);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    localStorage.setItem(SURA_CREATE_POST_INFO, "");

    localStorage.getItem(NURA_AUTH_USER_INFO)
      ? setShowModalLogin(false)
      : setShowModalLogin(true);

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

      <div
        className={`${
          scrollY > 300 && "shadow-lg"
        } sticky top-0 z-20 bg-white py-3 flex w-[${
          windowSize - 20
        }px] overflow-x-auto pl-5 gap-3 hide-scrollbar`}
      >
        {categories.map((category, index: number) => (
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
            {category.text}
          </Button>
        ))}
      </div>

      <div className="p-5 pt-2 grid grid-cols-2 gap-x-5 gap-y-6">
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
