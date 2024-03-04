import React, { useEffect, useState } from "react";
import { Image, Dropdown } from "react-bootstrap";
import { useMessageStore } from "../../store/messageStore";

export default function ChatBoxItem({ chatbox }) {
  const [hover, setHover] = useState(false);
  const [setting, setSetting] = useState(false);
  const [boxReceiver, setBoxReceiver] = useState([]);
  const { sender, setReceiver, setChatbox } = useMessageStore();
  useEffect(() => {
    if (chatbox.user1.userId === sender.userId) {
      setBoxReceiver(chatbox.user2);
    } else {
      setBoxReceiver(chatbox.user1);
    }
  }, [chatbox, sender]);
  return (
    <div
      className="row p-3 border-bottom"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onClick={() => {
        setReceiver(boxReceiver);
        setChatbox(chatbox);
        console.log(chatbox);
      }}
      style={
        hover
          ? { backgroundColor: "#f2f2f2", cursor: "pointer" }
          : { backgroundColor: "#fff" }
      }
    >
      <div className="col-3">
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
            src={boxReceiver?.avatar}
            roundedCircle
            className="img-fluid"
          />
        </div>
      </div>
      <div className="col-9 my-auto d-flex justify-content-between">
        <div>
          <h5>{boxReceiver?.fullName}</h5>
          <div className="text-muted">3 Lastest Message</div>
        </div>
        <div className="my-auto me-1">
          <i
            className="fas fa-ellipsis fs-4"
            onClick={() => {
              setSetting(!setting);
            }}
          ></i>
          <Dropdown show={setting} align={{ lg: "end" }}>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setSetting(false);
                }}
              >
                Delete
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSetting(false);
                }}
              >
                Block
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
