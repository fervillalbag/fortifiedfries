import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BackBtn from "../../components/BackBtn";
import {
  useAllMessages,
  useMarkMessagesAsSeen,
} from "../../hooks/message/useMessage";
import { useLocalStorageState } from "../../hooks";
import { SURA_CREDENTIALS } from "../../utils/constants";
import { useGetUser } from "../../hooks/user";

export default function Chat() {
  const { id } = useParams();
  const [value] = useLocalStorageState({
    key: SURA_CREDENTIALS,
  });

  const [messages, setMessages] = useState<any[]>([]);
  const [userReceiver, setUserReceiver] = useState<any>(null);

  const queryMarkMessagesAsSeen = useMarkMessagesAsSeen(
    value.id,
    id!
  );
  const queryAllMessages = useAllMessages(value.id, id!);
  const queryUser = useGetUser("_id", id!);

  useEffect(() => {
    if (queryAllMessages.isSuccess) {
      setMessages(queryAllMessages.data.data);
    }
    if (queryUser.isSuccess) {
      setUserReceiver(queryUser.data);
    }
  }, [queryAllMessages.isSuccess, queryUser.isSuccess]);

  useEffect(() => {
    queryMarkMessagesAsSeen.refetch();
  }, []);

  return (
    <div>
      <BackBtn title={userReceiver?.fullname} />

      <div className="px-5">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`h-12 mb-2 bg-@sura-primary-100/70 rounded-md flex items-center px-3 text-@sura-primary-900 w-max ${
              value.id === message.sender
                ? "ml-auto bg-[#34C659] text-white"
                : ""
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
}
