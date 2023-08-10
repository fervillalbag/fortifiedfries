import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface HeaderLoaderProps {
  imgCmp: any;
}

export default function HeaderLoader({ imgCmp }: HeaderLoaderProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <div className="relative h-[200px]">
      <LazyLoadImage
        src={imgCmp}
        alt="Imagen"
        className={`w-full h-full ${
          imageLoaded ? "loaded" : "loading"
        }`}
        afterLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}
