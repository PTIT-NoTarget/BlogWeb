import { useState, useEffect } from "react";
import { Card, Badge, Pagination, Spinner } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import "../../assets/css/Blog.css";
import { url } from "../../App";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [pageActive, setPageActive] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const [pageNumbers, setPageNumbers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageArr, setPageArr] = useState(
    Array(pageNumbers)
      .fill()
      .map((_, i) => i + 1)
  );
  useEffect(() => {
    setLoading(true);
    fetch(
      `${url}/api/v1/guest/view-posts/${
        pageActive - 1
      }?pageSize=${postPerPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.postList);
        setPageNumbers(data.totalPage);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageActive, postPerPage]);

  useEffect(() => {
    if (pageNumbers > 7) {
      if (pageActive <= 3) {
        setPageArr([1, 2, 3, 4, -1, pageNumbers]);
      } else if (pageActive >= pageNumbers - 2) {
        setPageArr([
          1,
          -1,
          pageNumbers - 3,
          pageNumbers - 2,
          pageNumbers - 1,
          pageNumbers,
        ]);
      } else {
        setPageArr([
          1,
          -1,
          pageActive - 1,
          pageActive,
          pageActive + 1,
          -1,
          pageNumbers,
        ]);
      }
    } else {
      setPageArr(
        Array(pageNumbers)
          .fill()
          .map((_, i) => i + 1)
      );
    }
  }, [pageActive, blogs, pageNumbers, postPerPage]);

  return (
    <div className="container">
      <h1>All Post</h1>
      <div className="row">
        <div className="col-12 col-md-8 d-flex flex-column justify-content-start">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center w-100 p-5">
              <Spinner animation="border" variant="danger" />
            </div>
          ) : (
            blogs.map((blog) => (
              <Card
                className="w-100 my-1"
                key={blog.postId}
                style={{ overflow: "hidden", height: "fit-content" }}
              >
                <div className="row">
                  <div className="col-4 col-md-2 p-0">
                    <div className="image-container">
                      <img
                        src={blog.thumbnail}
                        alt=""
                        className="img-fluid"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-8 col-md-10">
                    <Card.Body>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Text>
                        {blog.tags.map((tag) => (
                          <Badge bg="danger" className="mx-1" key={tag.tagId}>
                            <a
                              style={{ textDecoration: "none", color: "white" }}
                              href={"/tag/" + tag.tagId}
                            >
                              {tag.name}
                            </a>
                          </Badge>
                        ))}
                      </Card.Text>
                      <a
                        href={"/blog/" + blog.postId}
                        className="btn btn-danger"
                      >
                        Read More
                      </a>
                    </Card.Body>
                  </div>
                </div>
                <Card.Footer>
                  <div
                    className="text-muted d-flex justify-content-between"
                    style={{ fontSize: "15px" }}
                  >
                    <div>
                      <i className="fas fa-user"></i> {blog.user.fullName + " "}
                      <i className="fas fa-eye"></i> {blog.viewCount + " "}
                      <i className="fas fa-thumbs-up"></i>{" "}
                      {blog.likeCount + " "}
                      <i className="fas fa-thumbs-down"></i>{" "}
                      {blog.dislikeCount + " "}
                      <i className="fas fa-comment"></i>{" "}
                      {blog.commentCount + " "}
                    </div>
                    <div>
                      Created at{": "}
                      {format(parseISO(blog.dateCreated), "HH:mm dd/MM/yyyy")}
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            ))
          )}
          <div className="d-flex justify-content-center w-100">
            <Pagination>
              <Pagination.First
                onClick={() => {
                  setPageActive(1);
                }}
              />
              <Pagination.Prev
                onClick={() => {
                  setPageActive(Math.max(1, pageActive - 1));
                }}
              />
              {pageArr.map((number) =>
                number === -1 ? (
                  <Pagination.Ellipsis />
                ) : (
                  <Pagination.Item
                    key={number}
                    active={number === pageActive}
                    onClick={() => {
                      setPageActive(number);
                    }}
                  >
                    {number}
                  </Pagination.Item>
                )
              )}
              <Pagination.Next
                onClick={() => {
                  setPageActive(Math.min(pageNumbers, pageActive + 1));
                }}
              />
              <Pagination.Last onClick={() => setPageActive(pageNumbers)} />
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogList;

/*
                    
*/
