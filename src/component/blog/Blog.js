import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { url } from "../../App";

import MDEditor from '@uiw/react-md-editor/nohighlight';

function Blog() {
  const { postId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(url + "/api/v1/user/view-post/" + postId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBlog(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);
  return (
    <div className="container">
      <div className="card">
        <img src={blog?.thumbnail} alt="" className="card-img-top" />
        <div className="card-body" data-color-mode="light">
          <h1 className="card-title">{blog?.title}</h1>
          <MDEditor.Markdown className="card-text" source={blog?.content} />
        </div>
      </div>
    </div>
  );
}

export default Blog;
