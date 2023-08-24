import Line from "../../Loader/Line";

export default function Loader() {
  return (
    <div className="p-5 overflow-hidden h-screen">
      <div className="flex items-center gap-3">
        <div>
          <Line width={45} height={45} rounded="md" />
        </div>
        <Line width={160} height={20} rounded="sm" />
      </div>

      <div className="mt-5">
        <Line width="100%" height={300} rounded="sm" />
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        <Line width="100%" height={111} />
        <Line width="100%" height={111} />
        <Line width="100%" height={111} />
      </div>

      <div className="py-5">
        <div className="h-[37px] flex items-center mb-2">
          <Line width={200} height={24} rounded="sm" />
        </div>

        <div className="grid gap-y-3">
          <Line width="100%" height={20} rounded="sm" />
          <Line width="90%" height={20} rounded="sm" />
          <Line width="100%" height={20} rounded="sm" />
          <Line width="90%" height={20} rounded="sm" />
          <Line width="100%" height={20} rounded="sm" />
        </div>
      </div>

      <div className="pb-5">
        <div className="h-[37px] flex items-center mb-2">
          <Line width={200} height={24} rounded="sm" />
        </div>

        <div className="grid gap-y-3">
          <Line width="100%" height={20} rounded="sm" />
          <Line width="90%" height={20} rounded="sm" />
          <Line width="100%" height={20} rounded="sm" />
          <Line width="90%" height={20} rounded="sm" />
          <Line width="100%" height={20} rounded="sm" />
          <Line width="90%" height={20} rounded="sm" />
        </div>
      </div>
    </div>
  );
}
