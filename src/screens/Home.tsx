import React, { useContext, useState } from "react";

import { HeaderGallery, CardProduct } from "../components/Home";
import { Button, buttonVariants } from "../ui";
import { WindowSizeContext } from "../context";

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
];

const Home: React.FC = () => {
  const [categorySelected, setCategorySelected] =
    useState<string>("1");
  const { windowSize } = useContext(WindowSizeContext);

  return (
    <div>
      <div className="p-5">
        <HeaderGallery data={headerImages} />
      </div>

      <div
        className={`flex w-[${
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
              className: `h-12 flex-1 px-7 ${
                index === categories.length - 1 ? "mr-5" : "mr-0"
              }`,
            })}
          >
            {category.text}
          </Button>
        ))}
      </div>

      <div className="p-5 grid grid-cols-2 gap-x-5 gap-y-6">
        {products.map((product) => (
          <CardProduct product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
