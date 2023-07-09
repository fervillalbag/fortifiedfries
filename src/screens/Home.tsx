import React from "react";
import { HeaderGallery } from "../components/Home";

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
  return (
    <div>
      <div className="p-5">
        <HeaderGallery data={headerImages} />
      </div>
    </div>
  );
};

export default Home;
