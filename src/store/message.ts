import { create } from "zustand";

export const useMessageStore = create((set) => ({
  messages: [],

  updateMessage: (newMessage: any) =>
    set(() => ({
      messages: newMessage,
    })),

  createMessage: (messages: any[], newMessage: any) => {
    console.log({ messages, newMessage });

    set(() => ({
      messages: [...messages, newMessage],
    }));
  },
}));
