import { create } from "zustand";

export const useMessageStore = create((set) => ({
  messages: [],

  updateMessage: (newMessage: any) => {
    set((state: any) => ({
      messages: [...state.messages, ...newMessage],
    }));
  },

  createMessage: (newMessage: any) => {
    set((state: any) => ({
      messages: [...state.messages, newMessage],
    }));
  },
}));
