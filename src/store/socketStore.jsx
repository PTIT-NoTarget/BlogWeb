import { create } from "zustand";

export const useSocketStore = create((set) => ({
  receivedMessage: null,
  stompClient: null,
  isConnected: false,
  setStompClient: (stompClient) => set({ stompClient }),
  onConnected: () => set({ isConnected: true }),
  onMessageReceived : (receivedMessage) => set({ receivedMessage }),
}));
