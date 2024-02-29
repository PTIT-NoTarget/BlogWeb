import { Card } from "react-bootstrap";
import ChatBoxItem from "./ChatBoxItem";
import { useState, useEffect } from "react";
import { url } from "../../App";
import { useMessageStore } from "../../store/messageStore";

export default function ChatBox() {
  const { chatboxes } = useMessageStore();
  return (
    <div>
      <Card
        style={{
          minHeight: "750px",
          maxHeight: "750px",
        }}
      >
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Messages</h3>
            <i className="fas fa-gear fs-3"></i>
          </div>
        </Card.Header>
        <Card.Body
          className="p-0"
          style={{
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {chatboxes.map((chatbox, index) => {
            return <ChatBoxItem key={index} chatbox={chatbox}/>;
          })}
        </Card.Body>
      </Card>
    </div>
  );
}
