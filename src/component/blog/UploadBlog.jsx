import React, { useState } from "react";
import { url } from "../../App";

import { Spinner, Button } from "react-bootstrap";

import MDEditor from "@uiw/react-md-editor";

import ImageRes from "../resources/ImageRes";
import BlogTag from "./BlogTag";

function UploadBlog({ setToast }) {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const addPost = () => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("content", content);
    setLoading(true);
    if (tags.length > 0) {
      tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    } else {
      formData.append(`tags`, "undefined");
    }
    if (!thumbnail) {
      setToast({
        show: true,
        content: "Please choose thumbnail",
        type: "warning",
      });
      setLoading(false);
      return;
    }
    if (!title) {
      setToast({ show: true, content: "Please enter title", type: "warning" });
      setLoading(false);
      return;
    }
    if (!content) {
      setToast({
        show: true,
        content: "Please enter content",
        type: "warning",
      });
      setLoading(false);
      return;
    }
    fetch(url + "/api/v1/user/upload-post", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setToast({
            show: true,
            content: "Upload post success",
            type: "success",
          });
          window.location.href = "/";
        } else {
          setToast({
            show: true,
            content: "Upload post failed",
            type: "warning",
          });
        }
      })
      .catch((error) => {
        setToast({ show: true, content: "Upload post failed", type: "warning" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8 order-2 order-md-1">
          <div className="mb-3">
            <label htmlFor="thumbnail" className="form-label">
              Thumbnail
            </label>
            <input
              type="file"
              className="form-control"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              required
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>
          <div className="form-floating mb-3">
            <input
              value={title}
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="title"> Title </label>
          </div>
          <div className="mb-3 z-3" data-color-mode="light">
            <MDEditor value={content} onChange={setContent} height={"500px"}/>
          </div>
          <BlogTag setToast={setToast} tags={tags} setTags={setTags} textPlaceholder={"Tối đa 5 tag"} textBtn={"Add a new tag"}/>
          <div className="d-flex justify-content-center">
            {loading ? (
              <Spinner animation="border" variant="danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Button
                variant="danger"
                onClick={addPost}
              >
                Upload
              </Button>
            )}
          </div>
        </div>
        <div className="col-12 col-md-4 order-1 order-md-2">
          <ImageRes setToast={setToast}></ImageRes>
        </div>
      </div>
    </div>
  );
}

export default UploadBlog;
