import { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { url } from "../../App";
import "../../assets/css/HighlightPost.css";

function HighlightPost() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(url + "/api/v1/guest/get-5-most-view-posts", {
      method: "GET",
      headers: {},
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 py-1">
          {blogs?.slice(0, 1).map((blog) => (
            <Card className="card-container" key={blog.postId}>
              <Card.Img
                src={blog.thumbnail}
                alt=""
                className="img-fluid img-container"
              />
              <Card.ImgOverlay className="img-overlay">
                <div className="content">
                  <Card.Title>
                    {blog.title} <Badge bg="danger">Most View</Badge>
                  </Card.Title>
                  <Card.Text>
                    <a href={"/blog/" + blog.postId} className="btn btn-danger">
                      Read More
                    </a>
                  </Card.Text>
                </div>
              </Card.ImgOverlay>
            </Card>
          ))}
        </div>
        <div className="col-12 col-md-6">
          <div className="row">
            {blogs?.slice(1, 5).map((blog) => (
              <div className="col-6 py-2" key={blog.postId}>
                <Card className="card-container">
                  <Card.Img
                    src={blog.thumbnail}
                    alt=""
                    className="img-fluid img-container"
                  />
                  <Card.ImgOverlay className="img-overlay">
                    <div className="content">
                      <Card.Title>
                        {blog.title} <Badge bg="danger">Most View</Badge>
                      </Card.Title>
                      <Card.Text>
                        <a
                          href={"/blog/" + blog.postId}
                          className="btn btn-danger"
                        >
                          Read More
                        </a>
                      </Card.Text>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HighlightPost;
