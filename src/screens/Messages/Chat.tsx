import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BackBtn from "../../components/BackBtn";
import {
  useAllMessages,
  useContactsMessages,
  useMarkMessagesAsSeen,
} from "../../hooks/message/useMessage";
import { useLocalStorageState } from "../../hooks";
import { SURA_CREDENTIALS } from "../../utils/constants";
import { useGetUser } from "../../hooks/user";
import toast from "react-hot-toast";
import { createMessage } from "../../services/message";

export default function Chat() {
  const { id } = useParams();
  const [value] = useLocalStorageState({
    key: SURA_CREDENTIALS,
  });

  const [messages, setMessages] = useState<any[]>([]);
  const [userReceiver, setUserReceiver] = useState<any>(null);
  const [content, setContent] = useState<string>("");

  const queryMarkMessagesAsSeen = useMarkMessagesAsSeen(
    value.id,
    id!
  );

  const queryAllMessages = useAllMessages(value.id, id!);
  const queryUser = useGetUser("_id", id!);
  const queryContacts = useContactsMessages(value.id);

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
    queryContacts.refetch();
  }, []);

  const handleCreateMessage = async () => {
    if (!content) return;

    const messageInfo = {
      content,
      receiver: id,
      sender: value.id,
    };

    try {
      const response = await createMessage(messageInfo);

      if (response.status === 201) {
        queryContacts.refetch();
        queryAllMessages.refetch();
        setContent("");
      }
    } catch (error: any) {
      toast.error("Ha ocurrido un error");
      throw new Error(error);
    }
  };

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

      <div className="w-[calc(100%_-_40px)] fixed bottom-[25px] left-[20px]">
        <input
          value={content}
          placeholder="Escribir mensaje"
          className="outline-none focus-visible:ring-1 ring-@sura-primary-900 h-[54px] rounded-md border border-@sura-primary-200 w-full pl-4 pr-[46px]"
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="bg-white/60 outline-none absolute top-1/2 rounded-md -translate-y-1/2 right-[1px] py-0 h-[calc(100%_-_2px)] px-3 pl-4"
          onClick={handleCreateMessage}
        >
          <svg
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 16V10L8 8L0 6V0L19 8L0 16Z" fill="#1C2331" />
          </svg>
        </button>
      </div>
    </div>
  );
}
