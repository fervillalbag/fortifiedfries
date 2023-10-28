import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import BackBtn from "../../components/BackBtn";
import { useLocalStorageState } from "../../hooks";
import { SURA_CREDENTIALS } from "../../utils/constants";
import { useGetUser } from "../../hooks/user";
import { SURA_USER_DM } from "../../utils/constants/auth";
import { useMessageStore } from "../../store/message";
import socket from "../../store/socket";

export default function Chat() {
  const { id } = useParams();
  const [value] = useLocalStorageState({
    key: SURA_CREDENTIALS,
  });

  const bottomElement = useRef<any>(null);

  const messages = useMessageStore((state: any) => state.messages);
  const updateMessage = useMessageStore(
    (state: any) => state.updateMessage
  );
  const createMessage = useMessageStore(
    (state: any) => state.createMessage
  );

  useEffect(() => {
    socket.on("message", (message) => {
      updateMessage(message);
    });

    socket.emit(
      "findAllMessages",
      { sender: value.id, receiver: id },
      (response: any) => {
        updateMessage(response);
      }
    );
  }, [id]);

  const [_, handleChange] = useLocalStorageState({
    key: SURA_USER_DM,
  });

  const [userReceiver, setUserReceiver] = useState<any>(null);
  const [content, setContent] = useState<string>("");

  const queryUser = useGetUser("_id", id!);

  useEffect(() => {
    if (queryUser.isSuccess) {
      setUserReceiver(queryUser.data);
    }
  }, [queryUser.isSuccess]);

  useEffect(() => {
    handleChange({ id });
  }, [id]);

  const handleCreateMessage = () => () => {
    socket.emit(
      "createMessage",
      {
        content,
        receiver: id,
        sender: value.id,
      },
      (response: any) => createMessage(messages, response)
    );
  };

  console.log({ chat: messages });

  return (
    <div className="overflow-hidden h-screen">
      <div className="shadow-md shadow-neutral-200/30">
        <BackBtn title={userReceiver?.fullname} />
      </div>

      <div
        ref={bottomElement}
        className="px-5 pt-5 overflow-y-auto h-[calc(100vh_-_85px)]"
      >
        {!Array.isArray(messages)
          ? null
          : messages?.map((message: any) => (
              <div
                key={message._id}
                className={`relative h-12 pb-3 mb-2 bg-@sura-primary-100/70 rounded-md flex items-center px-3 text-@sura-primary-900 w-max ${
                  value.id === message.sender
                    ? "ml-auto bg-[#34C659] text-white"
                    : ""
                }`}
              >
                {message.content}

                <span className="absolute text-[10px] font-semibold opacity-70 bottom-1 right-2">
                  {dayjs(message.createdAt).format("HH:mm")}
                </span>
              </div>
            ))}
        <div className="h-[95px]" />
      </div>

      <div className="fixed h-20 bg-white/60 w-full bottom-0 left-0"></div>

      <div className="w-[calc(100%_-_40px)] fixed bottom-[25px] left-[20px]">
        <input
          value={content}
          placeholder="Escribir mensaje"
          className="outline-none focus-visible:ring-1 ring-@sura-primary-900 h-[54px] rounded-md border border-@sura-primary-200 w-full pl-4 pr-[46px]"
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="bg-white/60 outline-none absolute top-1/2 rounded-md -translate-y-1/2 right-[1px] py-0 h-[calc(100%_-_2px)] px-3 pl-4"
          onClick={handleCreateMessage()}
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
