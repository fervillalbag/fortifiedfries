import { Text, textVariants } from "../../../ui";

interface SellerProps {
  fullname: string;
  avatar: string | null;
  username: string;
}

export default function Seller({
  fullname,
  username,
  avatar,
}: SellerProps) {
  return (
    <div className="pt-5 pb-3">
      <Text
        className={textVariants({
          variant: "subtitle",
          className: "mb-3 text-2xl border-b pb-1",
        })}
      >
        Vendedor
      </Text>

      <div className="flex items-center gap-3">
        <div>
          {!avatar ? (
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="50" height="50" rx="25" fill="#D2D2D4" />
              <path
                d="M16 37C16 34.5752 16.9633 32.2496 18.6779 30.535C20.3925 28.8204 22.718 27.8571 25.1429 27.8571C27.5677 27.8571 29.8932 28.8204 31.6078 30.535C33.3225 32.2496 34.2857 34.5752 34.2857 37H16ZM25.1429 26.7143C21.3543 26.7143 18.2857 23.6457 18.2857 19.8571C18.2857 16.0686 21.3543 13 25.1429 13C28.9314 13 32 16.0686 32 19.8571C32 23.6457 28.9314 26.7143 25.1429 26.7143Z"
                fill="#1C2331"
              />
            </svg>
          ) : (
            <img src={avatar} alt={`Picture of ${fullname}`} />
          )}
        </div>
        <div>
          <Text className="font-medium text-@sura-primary-900">
            {fullname}
          </Text>
          <Text className="mt-[3px] text-@sura-primary-400">
            @{username}
          </Text>
        </div>
      </div>
    </div>
  );
}
