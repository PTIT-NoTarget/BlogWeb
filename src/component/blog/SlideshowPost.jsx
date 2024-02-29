import { Carousel } from "react-bootstrap";
import { url } from "../../App";
import { useEffect, useState } from "react";
import "../../assets/css/SlideshowPost.css";

function SlideshowPost() {
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    fetch(url + "/api/v1/user/view-all-posts", {
      method: "GET",
      headers: {},
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlogs(data.slice(0, 3));
      });
  }, []);
  return (
    <div className="container">
      <Carousel variant="dark">
        {blogs?.map((blog) => (
          <Carousel.Item>
            <div
              className="image-container d-flex justify-content-center align-items-center"
              onClick={() => {
                window.location.href = "/blog/" + blog.postId;
              }}
            >
              <img
                src={blog.thumbnail}
                alt=""
              />
            </div>
            <Carousel.Caption className="caption">
              <h3>{blog.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default SlideshowPost;
