import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { useLocalStorageState } from "../hooks";
import { SURA_CREDENTIALS } from "../utils/constants";
import { SURA_USER_DM } from "../utils/constants/auth";

interface MessageProviderProps {
  children: React.ReactNode;
}

const socket = io("http://localhost:3000");

export const MessageContext = createContext<any>(null);

export default function MessageProvider({
  children,
}: MessageProviderProps) {
  const [value] = useLocalStorageState({
    key: SURA_CREDENTIALS,
    value: { id: "" },
  });

  const [{ id }] = useLocalStorageState({
    key: SURA_USER_DM,
    value: { id: "" },
  });

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.emit(
      "findAllMessages",
      { sender: value.id, receiver: id },
      (response: any) => {
        setMessages(response);
      }
    );
  }, [id]);

  useEffect(() => {
    socket.emit(
      "findAllMessages",
      { sender: value.id, receiver: null },
      (response: any) => {
        setMessages(response);
      }
    );

    socket.on("message", (message: any) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
