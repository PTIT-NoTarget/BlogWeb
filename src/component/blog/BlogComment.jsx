import React, { useState, useEffect, useRef } from "react";
import { Button, Image } from "react-bootstrap";
import { url } from "../../App";

function BlogComment({ postId }) {
  const inputRef = useRef(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentLevel, setCommentLevel] = useState(0);
  const [parentCommentId, setParentCommentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reactions, setReactions] = useState(new Map());

  useEffect(() => {
    fetch(url + "/api/v1/guest/comment/" + postId, {
      method: "GET",
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId, loading]);

  useEffect(() => {
    fetch(url + "/api/v1/user/check-comment-reaction/" + postId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === 200){
          let map = new Map();
          for (let i = 0; i < data.commentIds.length; i++) {
            map.set(data.commentIds[i], data.reactTypes[i]);
          }
          setReactions(map);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [loading, postId]);

  const handleSubmitComment = () => {
    console.log("commentLevel: ", commentLevel);
    console.log("parentCommentId: ", parentCommentId);
    fetch(url + "/api/v1/user/comment/" + postId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        content: comment,
        commentLevel: commentLevel,
        parentCommentId: parentCommentId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComment("");
        setLoading(!loading);
        setParentCommentId(0);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReact = (react, commentId) => {
    fetch(url + "/api/v1/user/comment-reaction/" + commentId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        reactType: react,
        postId: postId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(!loading);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h3>Comment</h3>
      <div className="row d-flex justify-content-center border-bottom">
        <div className="col-10">
          <div className="form-floating mb-3">
            <input
              value={comment}
              type="text"
              className="form-control"
              name="comment"
              id="comment"
              placeholder="Comment"
              required
              onChange={(e) => setComment(e.target.value)}
            />
            <label htmlFor="comment"> Comment </label>
          </div>
        </div>
        <div className="col-2">
          <Button
            onClick={() => {
              setCommentLevel(0);
              setParentCommentId(0);
              handleSubmitComment();
            }}
            className="w-100 h-75"
            variant="danger"
            type="submit"
          >
            <i className="fas fa-paper-plane"></i>
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {comments.map((cmt) => (
            <div
              key={cmt.commentId}
              className="my-1 flex-grow-1"
              style={{ marginLeft: cmt.commentLevel * 80 + "px" }}
            >
              <div className="row">
                <div className="col-1">
                  <Image src={cmt.user.avatar} roundedCircle fluid />
                </div>
                <div
                  className="col-10"
                  style={{ backgroundColor: "lightgray", borderRadius: "10px" }}
                >
                  <div>
                    <a href={"/profile/" + cmt.user.username}>
                      <strong>{cmt.user.username}</strong>
                    </a>
                  </div>
                  <div>{cmt.content}</div>
                </div>
                <div className="col-1 d-flex flex-column align-items-center">
                  <Button
                    onClick={() => {
                      handleReact("LIKE", cmt.commentId);
                    }}
                    variant={reactions.get(cmt.commentId) === "LIKE" ? "danger" : "secondary"}
                    className="my-0 py-0 w-100"
                  >
                    <i className="fas fa-thumbs-up"></i> {cmt.likeCount + " "}
                  </Button>
                  <Button
                    onClick={() => {
                      handleReact("DISLIKE", cmt.commentId);
                    }}
                    variant={reactions.get(cmt.commentId) === "DISLIKE" ? "danger" : "secondary"}
                    className="m-0 py-0 w-100"
                  >
                    <i className="fas fa-thumbs-down"></i>{" "}
                    {cmt.dislikeCount + " "}
                  </Button>
                  <Button
                    className="m-0 py-0 w-100"
                    variant="danger"
                    onClick={() => {
                      setCommentLevel(cmt.commentLevel + 1);
                      if (cmt.commentId !== parentCommentId) {
                        setParentCommentId(cmt.commentId);
                        setTimeout(() => {
                          if (inputRef.current) {
                            inputRef.current.focus();
                          }
                        }, 0);
                      } else {
                        setParentCommentId(0);
                      }
                    }}
                  >
                    <i className="fas fa-reply"></i>
                  </Button>
                </div>
              </div>
              {cmt.commentId === parentCommentId ? (
                <div className="row d-flex justify-content-center">
                  <div className="col-10">
                    <div className="form-floating mb-3">
                      <input
                        value={comment}
                        type="text"
                        className="form-control"
                        name="comment"
                        id="comment"
                        placeholder="Comment"
                        required
                        onChange={(e) => setComment(e.target.value)}
                        ref={inputRef}
                      />
                      <label htmlFor="comment"> Comment </label>
                    </div>
                  </div>
                  <div className="col-2">
                    <Button
                      onClick={handleSubmitComment}
                      className="w-100 h-75"
                      variant="danger"
                      type="submit"
                    >
                      <i className="fas fa-paper-plane"></i>
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogComment;
