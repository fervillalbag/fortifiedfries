import { Text } from "../ui";

export default function Header() {
  return (
    <div>
      <div
        className={`w-screen bg-white pt-4 px-5 flex items-center`}
      >
        <div className="w-full flex items-center justify-between">
          <button className="flex items-center">
            <Text className="font-[Cantarell] text-2xl uppercase font-bold text-@sura-primary-900">
              Sura<span className="font-normal lowercase">.sh</span>
            </Text>
          </button>
          <button className="border p-2 rounded-md bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
