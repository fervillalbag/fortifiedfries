interface LineProps {
  width?: number | string;
  height?: number | string;
  rounded?: string;
}

export default function Line({ width, height, rounded }: LineProps) {
  return (
    <div className="w-full h-full items-center flex">
      <div
        className={`animate-pulse bg-@sura-primary-300 ${
          width === "full" ? "w-full" : width ? `w-${width}` : "w-32"
        }  ${rounded ? `rounded-${rounded}` : "rounded-none"}`}
        style={{ height }}
      ></div>
    </div>
  );
}
