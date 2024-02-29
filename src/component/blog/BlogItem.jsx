import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { url } from "../../App";
import { Card, Button } from "react-bootstrap";

import MDEditor from "@uiw/react-md-editor/nohighlight";
import BlogComment from "./BlogComment";

function Blog() {
  const { postId } = useParams();
  const [blog, setBlog] = useState(null);
  const [reaction, setReaction] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(url + "/api/v1/guest/view/" + postId, {
        method: "POST",
        headers: {},
      });
    }, 60000);
    return () => clearTimeout(timer);
  }, [postId]);

  useEffect(() => {
    fetch(url + "/api/v1/guest/post/" + postId, {
      method: "GET",
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

  useEffect(() => {
    fetch(url + "/api/v1/guest/post-reaction/" + postId, {
      method: "GET",
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        setReaction(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId, loading]);

  useEffect(() => {
    fetch(url + "/api/v1/user/check-post-reaction/" + postId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(data);
          setIsLike(data.message === "LIKE");
          setIsDislike(data.message === "DISLIKE");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reaction, postId, loading]);

  const handleReact = (react) => {
    fetch(url + "/api/v1/user/post-reaction/" + postId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        reactType: react,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(!loading);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <Card>
        <Card.Header>
          <div>
            <i className="fas fa-eye"></i> {reaction?.viewCount + " "}
            <i className="fas fa-thumbs-up"></i> {reaction?.likeCount + " "}
            <i className="fas fa-thumbs-down"></i>{" "}
            {reaction?.dislikeCount + " "}
            <i className="fas fa-comment"></i> {reaction?.commentCount + " "}
          </div>
        </Card.Header>
        <Card.Img variant="top" src={blog?.thumbnail} height={"500px"} />
        <Card.Body data-color-mode="light">
          <Card.Title>{blog?.title}</Card.Title>
          <MDEditor.Markdown className="card-text" source={blog?.content} />
        </Card.Body>
        <Card.Footer>
          <Button
            variant={isLike ? "danger" : "secondary"}
            className="mx-2"
            onClick={() => {
              handleReact("LIKE");
            }}
          >
            <i className="fas fa-thumbs-up"></i> Like
          </Button>
          <Button
            variant={isDislike ? "danger" : "secondary"}
            onClick={() => {
              handleReact("DISLIKE");
            }}
          >
            <i className="fas fa-thumbs-down"></i> Dislike
          </Button>
        </Card.Footer>
      </Card>
      <BlogComment postId={postId} />
    </div>
  );
}

export default Blog;
