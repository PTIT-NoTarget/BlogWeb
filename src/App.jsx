import "./App.css";

import { Route, Routes } from "react-router-dom";

import Footer from "./component/base/Footer";
import Navbar from "./component/base/Navbar";
import UploadBlog from "./component/blog/UploadBlog";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import BlogItem from "./component/blog/BlogItem";
import Home from "./component/Home";
import FAQs from "./component/FAQs";
import Settings from "./component/profile/Settings";
import Blog from "./component/Blog";
import Notification from "./component/profile/Notification";
import Profile from "./component/profile/Profile";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "./store/authStore";
import { useSocketStore } from "./store/socketStore";
import { useBaseStore } from "./store/baseStore";

import ToastMessage from "./component/base/ToastMessage";
import Message from "./component/chat/Message";
import MessageTest2 from "./component/chat/MessageTest2";

import SockJS from "sockjs-client";
import { over } from "stompjs";

export const url = "http://localhost:6868";
//export const url = "https://blogweb-be-cf7553c6a34d.herokuapp.com";

function App() {
  const [Toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  const { title } = useBaseStore();
  const {
    isSignedIn,
    profile,
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
  useEffect(() => {
    if (refreshToken) {
      fetch(url + "/api/v1/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refreshToken, setAccessToken, setRefreshToken]);

  useEffect(() => {
    if (!isConnected && isSignedIn) {
      let socket = new SockJS(url + "/ws");
      setStompClient(over(socket));
      onConnected();
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
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

  useEffect(() => {
    document.title = title;
  },[]);

  return (
    <div className="App">
      <Navbar setToast={setToast} />
      <Routes>
        <Route path="/" element={<Home setToast={setToast} />} />
        <Route path="/blog" element={<Blog setToast={setToast} />} />
        <Route
          path="/upload-blog"
          element={<UploadBlog setToast={setToast} />}
        />
        <Route path="/sign-in" element={<SignIn setToast={setToast} />} />
        <Route path="/sign-up" element={<SignUp setToast={setToast} />} />
        <Route
          path="/blog/:postId"
          element={<BlogItem setToast={setToast} />}
        />
        <Route path="/faqs" element={<FAQs setToast={setToast} />} />
        <Route path="/settings" element={<Settings setToast={setToast} />} />
        <Route
          path="/notification"
          element={<Notification setToast={setToast} />}
        />
        <Route path="/message" element={<Message setToast={setToast} />} />
        <Route
          path="/profile/:username"
          element={<Profile setToast={setToast} />}
        />
      </Routes>
      <Footer setToast={setToast} />
      <ToastMessage Toast={Toast} setToast={setToast}></ToastMessage>
    </div>
  );
}

export default App;
