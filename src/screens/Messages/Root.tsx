import { useEffect, useRef } from "react";

import { Layout } from "../../components";
import { Conversation } from "../../components/Messages";
import { useLocalStorageState } from "../../hooks";
import { SURA_CREDENTIALS } from "../../utils/constants";
import { useMessageStore } from "../../store/message";
import socket from "../../store/socket";

export default function Root() {
  const inputRef = useRef<any>(null);
  const [value] = useLocalStorageState({
    key: SURA_CREDENTIALS,
  });

  const updateMessage = useMessageStore(
    (state: any) => state.updateMessage
  );

  useEffect(() => {
    socket.on("message", (message) => {
      updateMessage(message);
    });

    socket.emit(
      "findAllMessages",
      { sender: value.id, receiver: null },
      (response: any) => {
        updateMessage(response);
      }
    );

    return () => {
      socket.off("message");
    };
  }, [value.id]);

  const messages = useMessageStore((state: any) => state.messages);

  const myMessages = messages?.filter(
    (message: any) =>
      message.sender === value.id || message.receiver === value.id
  );

  const conversations = new Set();

  myMessages?.forEach((message: any) => {
    if (message.sender !== value.id) {
      conversations.add(message.sender);
    }
    if (message.receiver !== value.id) {
      conversations.add(message.receiver);
    }
  });

  return (
    <Layout>
      <div className="h-screen grid place-items-center">
        <h1>Working in this screens</h1>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="items-center flex p-5">
        <div className="relative w-full">
          <button
            onClick={() => inputRef.current.focus()}
            className="absolute top-1/2 -translate-y-1/2 left-3"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5451 14.6625L17.9864 17.1025C18.1002 17.2204 18.1632 17.3782 18.1618 17.5421C18.1603 17.706 18.0946 17.8627 17.9787 17.9786C17.8629 18.0945 17.7061 18.1602 17.5422 18.1616C17.3784 18.1631 17.2205 18.1001 17.1026 17.9862L14.6614 15.545C13.0661 16.9118 11.0034 17.6076 8.90612 17.4863C6.80887 17.3651 4.8401 16.4363 3.41291 14.8948C1.98573 13.3532 1.21108 11.3189 1.25151 9.21851C1.29194 7.11815 2.14431 5.11509 3.62976 3.62964C5.11521 2.14419 7.11827 1.29181 9.21863 1.25138C11.319 1.21095 13.3534 1.98561 14.8949 3.41279C16.4364 4.83998 17.3652 6.80875 17.4865 8.906C17.6077 11.0032 16.9119 13.0659 15.5451 14.6612V14.6625ZM9.3751 16.25C11.1985 16.25 12.9471 15.5257 14.2365 14.2363C15.5258 12.947 16.2501 11.1983 16.2501 9.37498C16.2501 7.55162 15.5258 5.80293 14.2365 4.51362C12.9471 3.22431 11.1985 2.49998 9.3751 2.49998C7.55174 2.49998 5.80305 3.22431 4.51374 4.51362C3.22443 5.80293 2.5001 7.55162 2.5001 9.37498C2.5001 11.1983 3.22443 12.947 4.51374 14.2363C5.80305 15.5257 7.55174 16.25 9.3751 16.25Z"
                fill="#6D7179"
              />
            </svg>
          </button>

          <input
            ref={inputRef}
            placeholder="Buscar mensajes"
            className="pl-10 h-[54px] w-full bg-@sura-primary-100/60 rounded-md text-@sura-primary-500 placeholder:text-@sura-primary-500 focus-visible:outline-@sura-primary-100/50"
          />
        </div>
      </div>

      <div className="px-5">
        {Array.from(conversations)?.map((conversation: any) => (
          <Conversation key={conversation} id={conversation} />
        ))}
      </div>
    </Layout>
  );
}
