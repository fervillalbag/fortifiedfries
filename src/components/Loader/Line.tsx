interface LineProps {
  width?: number | null;
}

export default function Line({ width }: LineProps) {
  return (
    <div className="h-7 w-full items-center flex">
      <div
        className={`bg-slate-300 h-4 ${
          width ? `w-[${width}px]` : "w-32"
        }`}
      ></div>
    </div>
  );
}
