interface LoaderProps {
  padding?: boolean;
}

export default function Loader({ padding = true }: LoaderProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-x-3 gap-y-4 ${
        padding ? "px-5" : ""
      }`}
    >
      <div className="w-full h-[208px] bg-@sura-primary-200 rounded-md animate-pulse"></div>
      <div className="w-full h-[208px] bg-@sura-primary-200 rounded-md animate-pulse"></div>
      <div className="w-full h-[208px] bg-@sura-primary-200 rounded-md animate-pulse"></div>
      <div className="w-full h-[208px] bg-@sura-primary-200 rounded-md animate-pulse"></div>
    </div>
  );
}
