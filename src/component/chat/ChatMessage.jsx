import { Card, Image, Button } from "react-bootstrap";
import { useMessageStore } from "../../store/messageStore";
import { url } from "../../App";
import { useEffect, useState } from "react";
import { useSocketStore } from "../../store/socketStore";

export default function ChatMessage() {
  const { sender, receiver, chatbox, messages, setMessages } =
    useMessageStore();
  const [message, setMessage] = useState("");
  const { receivedMessage, stompClient, isConnected } = useSocketStore();
  useEffect(() => {
    if (chatbox) {
      setMessages(chatbox.chatMessages);
    }
  }, [chatbox, setMessages]);

  useEffect(() => {
    if (receivedMessage) {
      const message = JSON.parse(receivedMessage.body);
      setMessages([...messages, message]);
    }
  }, [receivedMessage]);

  const sendMessage = () => {
    const date = new Date().toISOString();
    const chatMessage = {
      content: message,
      dateCreated: date,
      receiverId: receiver.userId,
      senderId: sender.userId,
    };
    setMessages([...messages, chatMessage]);
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    fetch(url + "/api/v1/user/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        chatBoxId: chatbox.id,
        receiverId: receiver.userId,
        content: message,
        dateCreated: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <Card
        style={{
          minHeight: "750px",
          maxHeight: "750px",
        }}
      >
        <Card.Header>
          <div className="row">
            <div className="col-1">
              <div
                style={{
                  position: "relative",
                  paddingTop: "100%",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={receiver?.avatar}
                  roundedCircle
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-11 my-auto">
              <h5 className="my-auto">{receiver?.fullName}</h5>
            </div>
          </div>
        </Card.Header>
        <Card.Body
          style={{
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {messages?.map((message, index) => {
            return (
              <div
                key={index}
                className={
                  message.senderId === receiver.userId
                    ? "d-flex justify-content-start my-2"
                    : "d-flex justify-content-end my-2"
                }
              >
                {message.senderId === receiver.userId && (
                  <div
                    className="me-2"
                    style={{
                      position: "relative",
                      width: "40px",
                      height: "40px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src={receiver?.avatar}
                      roundedCircle
                      className="img-fluid"
                    />
                  </div>
                )}
                <div
                  className={
                    message.senderId === receiver.userId
                      ? "bg-secondary text-white p-2 rounded-3"
                      : "bg-danger text-white p-2 rounded-3"
                  }
                >
                  {message.content}
                </div>
              </div>
            );
          })}
        </Card.Body>
        <Card.Footer>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Type a message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button variant="outline-danger" className="mx-2">
              <i className="fas fa-face-smile"></i>
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                sendMessage();
              }}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
