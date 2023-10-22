import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface ConversationProps {
  fullname: string;
  id: string;
  lastMessage: string;
  time: string;
  countMessages: number;
}

export function Conversation({
  fullname,
  lastMessage,
  id,
  time,
  countMessages,
}: ConversationProps) {
  const navigate = useNavigate();

  return (
    <button
      className="mb-3 w-full grid grid-cols-[60px_1fr] items-center gap-x-3"
      onClick={() => navigate(`/messages/${id}`)}
    >
      <div>
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="60" height="60" rx="30" fill="#F5F5F5" />
          <path
            d="M21 42C21 39.5752 21.9633 37.2496 23.6779 35.535C25.3925 33.8204 27.718 32.8571 30.1429 32.8571C32.5677 32.8571 34.8932 33.8204 36.6078 35.535C38.3225 37.2496 39.2857 39.5752 39.2857 42H21ZM30.1429 31.7143C26.3543 31.7143 23.2857 28.6457 23.2857 24.8571C23.2857 21.0686 26.3543 18 30.1429 18C33.9314 18 37 21.0686 37 24.8571C37 28.6457 33.9314 31.7143 30.1429 31.7143Z"
            fill="#6D7179"
          />
        </svg>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-@sura-primary-900">
            {fullname}
          </p>
          <p className="text-xs font-medium text-@sura-primary-500">
            {dayjs(time).format("HH:mm")}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-@sura-primary-400">
            {lastMessage}
          </p>

          {!countMessages ? null : (
            <span className="block w-max py-[3px] px-[6px] text-[10px] font-semibold text-white bg-@sura-primary-900 rounded-sm">
              {countMessages}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
