import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../../store/authStore";
import { useSocketStore } from "../../store/socketStore";

import ToastMessage from "../base/ToastMessage";
import { Button } from "react-bootstrap";

import SockJS from "sockjs-client";
import { over } from "stompjs";
import { url } from "../../App";

export default function ChatBoxItem() {
  const {
    profile,
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
  } = useAuthStore();
  const {
    stompClient,
    setStompClient,
    isConnected,
    onConnected,
    onMessageReceived,
  } = useSocketStore();

  const connect = () => {
    if (!isConnected) {
      let socket = new SockJS(url + "/ws");
      setStompClient(over(socket));
      onConnected();
    }
  };

  useEffect(() => {
    if (isConnected) {
      console.log("connected");
      stompClient.connect(
        {},
        () => {
          
          stompClient.subscribe("/user/" + profile.userId, onMessageReceived);
        },
        () => {
          console.log("error");
        }
      );
    }
  }, [stompClient]);

  const sendMessage = () => {
    const date = new Date().toISOString();
    const chatMessage = {
      content: "message",
      dateCreated: date,
      receiverId: 2,
      senderId: 5,
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  return (
    <div>
      <Button onClick={connect}>Connect</Button>
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
}
