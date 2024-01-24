import "./App.css";

import { Route, Routes } from "react-router-dom";

import Footer from "./component/base/Footer";
import Navbar from "./component/base/Navbar";
import BlogList from "./component/blog/BlogList";
import UploadBlog from "./component/blog/UploadBlog";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import Blog from "./component/blog/Blog";
import Home from "./component/Home";
import FAQs from "./component/FAQs";
import MyBlog from "./component/profile/MyBlog";
import MyProfile from "./component/profile/MyProfile";
import Settings from "./component/profile/Settings";

import { useState } from "react";

import ToastMessage from "./component/base/ToastMessage";

export const url = "http://14.225.204.125:6868";

function App() {
  const [Toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  return (
    <div className="App">
      <Navbar setToast={setToast} />
      <Routes>
        <Route path="/" element={<Home setToast={setToast} />} />
        <Route path="/blog" element={<BlogList setToast={setToast} />} />
        <Route
          path="/upload-blog"
          element={<UploadBlog setToast={setToast} />}
        />
        <Route path="/sign-in" element={<SignIn setToast={setToast} />} />
        <Route path="/sign-up" element={<SignUp setToast={setToast} />} />
        <Route path="/blog/:postId" element={<Blog setToast={setToast} />} />
        <Route path="/faqs" element={<FAQs setToast={setToast} />} />
        <Route path="/my-profile" element={<MyProfile setToast={setToast} />} />
        <Route path="/my-blog" element={<MyBlog setToast={setToast} />} />
        <Route path="/settings" element={<Settings setToast={setToast} />} />
      </Routes>
      <Footer setToast={setToast} />
      <ToastMessage Toast={Toast} setToast={setToast}></ToastMessage>
    </div>
  );
}

export default App;
