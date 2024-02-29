import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { url } from "../../App";
import { Button, Link } from "react-bootstrap";

var stompClient = null;
function Message() {
  const [publicMessage, setPublicMessage] = useState([]);
  const [privateMessage, setPrivateMessage] = useState(new Map());
  const [tab, setTab] = useState("chatroom");
  const [userData, setUserData] = useState({
    username: "",
    receiveName: "",
    connected: false,
    message: "",
  });

  const handleJoin = () => {
    let socket = new SockJS(url + "/ws");
    stompClient = over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
    stompClient.subscribe(+
      "/user/" + userData.username + "/private",
      onPrivateMessageReceived
    );
    userJoin();
  };

  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.type) {
      case "JOIN":
        if (!privateMessage.get(payloadData.senderName)) {
          privateMessage.set(payloadData.senderName, []);
          setPrivateMessage(new Map(privateMessage));
        }
        break;
      case "LEAVE":
        break;
      case "CHAT":
        publicMessage.push(payloadData);
        setPublicMessage([...publicMessage]);
        break;
      default:
        break;
    }
  };

  const onPrivateMessageReceived = (payload) => {
    console.log(payload);
    let payloadData = JSON.parse(payload.body);
    if (privateMessage.get(payloadData.senderName)) {
      privateMessage.get(payloadData.senderName).push(payloadData);
      setPrivateMessage(new Map(privateMessage));
    } else {
      let arr = [];
      arr.push(payloadData);
      privateMessage.set(payloadData.senderName, arr);
      setPrivateMessage(new Map(privateMessage));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const sendPublicMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        type: "CHAT",
        message: userData.message,
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateMessage = () => {
    console.log(tab);
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        type: "CHAT",
        message: userData.message,
      };
      console.log(chatMessage);
      if (userData.username !== tab) {
        privateMessage.get(tab).push(chatMessage);
        setPrivateMessage(new Map(privateMessage));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const userJoin = () => {
    let chatMessage = {
      senderName: userData.username,
      type: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  return (
    <div className="container">
      {!userData.connected ? (
        <div className="row">
          <form encType="multipart/form-data" className="col-8">
            <div className="form-floating">
              <input
                value={userData.username}
                type="text"
                className="form-control"
                name="username"
                id="username"
                placeholder="Username"
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                required
              />
              <label htmlFor="username"> Username </label>
            </div>
          </form>

          <form encType="multipart/form-data" className="col-4">
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
              <button
                onClick={handleJoin}
                type="button"
                className="btn btn-danger btn-block"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="row">
          <div className="col-4">
            <Button
              onClick={() => {
                setTab("chatroom");
              }}
            >
              Chatroom
            </Button>
            {[...privateMessage.keys()].map((name, index) => {
              return (
                <Button
                  onClick={() => {
                    setTab(name);
                  }}
                  key={index}
                >
                  {name}
                </Button>
              );
            })}
          </div>
          {tab === "chatroom" ? (
            <div className="col-8">
              {publicMessage.map((message, index) => {
                return (
                  <div key={index}>
                    {message.senderName !== userData.username ? (
                      <div className="d-flex justify-content-start">
                        <div className="p-2 bg-light border">
                          {message.message}
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-end">
                        <div className="p-2 bg-primary text-white border">
                          {message.message}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <form encType="multipart/form-data">
                <div className="form-floating mb-3">
                  <input
                    value={userData.message}
                    type="text"
                    className="form-control"
                    name="message"
                    placeholder="Message"
                    onChange={(e) => {
                      setUserData({ ...userData, message: e.target.value });
                    }}
                  />
                  <label htmlFor="message"> Message </label>
                </div>

                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <button
                    onClick={sendPublicMessage}
                    type="button"
                    className="btn btn-danger btn-block"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="col-8">
              {[...privateMessage.get(tab)].map((message, index) => {
                return (
                  <div key={index}>
                    {message.senderName !== userData.username ? (
                      <div className="d-flex justify-content-start">
                        <div className="p-2 bg-light border">
                          {message.message}
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-end">
                        <div className="p-2 bg-primary text-white border">
                          {message.message}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <form encType="multipart/form-data">
                <div className="form-floating mb-3">
                  <input
                    value={userData.message}
                    type="text"
                    className="form-control"
                    name="message"
                    placeholder="Message"
                    onChange={(e) => {
                      setUserData({ ...userData, message: e.target.value });
                    }}
                  />
                  <label htmlFor="message"> Message </label>
                </div>

                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <button
                    onClick={sendPrivateMessage}
                    type="button"
                    className="btn btn-danger btn-block"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          )}
          {/* <form encType="multipart/form-data">
            <div className="form-floating mb-3">
              <input
                value={userData.message}
                type="text"
                className="form-control"
                name="message"
                placeholder="Message"
                onChange={(e) => {
                  setUserData({ ...userData, message: e.target.value });
                }}
              />
              <label htmlFor="message"> Message </label>
            </div>

            <div className="mb-3 d-flex justify-content-center align-items-center">
              <button
                onClick={() => {}}
                type="button"
                className="btn btn-danger btn-block"
              >
                Send
              </button>
            </div>
          </form> */}
        </div>
      )}
    </div>
  );
}

export default Message;
