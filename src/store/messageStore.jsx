import { create } from "zustand";

export const useMessageStore = create((set) => ({
  sender : null,
  receiver : null,
  chatboxes: [],
  chatbox: null,
  messages: [],
  setSender: (sender) => set({sender}),
  setReceiver: (receiver) => set({receiver}),
  setChatboxes: (chatboxes) => set({chatboxes}),
  setChatbox: (chatbox) => set({chatbox}),
  setMessages: (messages) => set({messages}),
}));
