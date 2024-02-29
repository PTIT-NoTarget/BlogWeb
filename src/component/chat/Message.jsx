import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import { useMessageStore } from "../../store/messageStore";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";
import { url } from "../../App";

export default function Message() {
  const {profile} = useAuthStore();
  const { setChatboxes, setSender, chatbox } = useMessageStore();
  useEffect(() => {
    fetch(url + "/api/v1/user/chatbox", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChatboxes(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setChatboxes]);

  useEffect(() => {
    if (profile) {
      setSender(profile);
    }
  }, [profile, setSender]);
  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-4">
          <ChatBox />
        </div>
        <div className="col-8">
          <ChatMessage />
        </div>
      </div>
    </div>
  );
}