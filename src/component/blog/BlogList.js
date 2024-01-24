import { useState, useEffect, useContext } from "react";

import { url } from "../../App";

function BlogList() {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    fetch(url + "/api/v1/user/view-all-posts", {
      method: "GET",
      headers: {
        
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        console.log(data);
      });
  }, []);
  
  return (
    <div className="container">
      <h1>All Post</h1>
      <div className="row">
        <div className="col-12 col-md-8 d-flex justify-content-center flex-wrap">
          {blogs?.map((blog) => (
            <div className="card my-2" key={blog.postId}>
              <div className="row">
                <div className="col-2">
                  <img src={blog.thumbnail} alt="" className="card-img" />
                </div>
                <div className="col-10">
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.content}</p>
                    <a href={"/blog/" + blog.postId} className="btn btn-danger">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogList;

/*
                    
*/
