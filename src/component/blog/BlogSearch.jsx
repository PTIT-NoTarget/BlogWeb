import BlogTag from "./BlogTag";
import { useState } from "react";
import { Button } from "react-bootstrap";

function BlogSearch() {
  const [tags, setTags] = useState([]);
  return (
    <div className="container">
      <div>
        <h1 className="text-center">Blog Search</h1>
      </div>
      <div className="row mx-5">
        <div className="col-12">
          <form className="row d-flex justify-content-center">
            <div className="col-12 col-md-6 p-1">
              <label className="m-2" htmlFor="search">
                Search
              </label>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
            <div className="col-12 col-md-6 p-1">
              <BlogTag
                tags={tags}
                setTags={setTags}
                textBtn={"none"}
                textPlaceholder={"Tìm tag bạn muốn lọc ..."}
              />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <Button variant="danger">
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogSearch;
