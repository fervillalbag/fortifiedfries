import { LazyLoadImage } from "react-lazy-load-image-component";

interface HeaderLoaderProps {
  imgCmp: any;
}

export default function HeaderLoader({ imgCmp }: HeaderLoaderProps) {
  return (
    <div className="relative w-full h-[200px] header-loader">
      <LazyLoadImage
        src={imgCmp}
        alt="Imagen"
        className={`w-full h-[200px] object-cover`}
        placeholderSrc="/images/placeholder-banner-create-post.png"
      />
    </div>
  );
}
