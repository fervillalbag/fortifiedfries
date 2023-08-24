interface LineProps {
  width?: number | string;
  height?: number | string;
  rounded?: string;
}

export default function Line({ width, height, rounded }: LineProps) {
  return (
    <div className="w-full h-full items-center flex">
      <div
        className={`animate-pulse bg-@sura-primary-300   ${
          rounded ? `rounded-${rounded}` : "rounded-none"
        }`}
        style={{ width, height }}
      ></div>
    </div>
  );
}
