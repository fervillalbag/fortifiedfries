import { LazyLoadImage } from "react-lazy-load-image-component";

interface HeaderLoaderProps {
  imgCmp: any;
}

export default function HeaderLoader({ imgCmp }: HeaderLoaderProps) {
  return (
    <div className="relative h-[200px]">
      <LazyLoadImage
        src={imgCmp}
        alt="Imagen"
        className={`w-full h-full`}
        placeholderSrc="/images/placeholder-banner-create-post.png"
      />
    </div>
  );
}
