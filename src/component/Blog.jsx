import BlogList from "./blog/BlogList";
import BlogSearch from "./blog/BlogSearch";

function Blog({setToast, blogs, setBlogs}){
  return (
    <div>
      <BlogSearch blogs={blogs} setBlogs={setBlogs}/>
      <BlogList blogs={blogs} setBlogs={setBlogs} setToast={setToast}/>
    </div>
  );
}

export default Blog;