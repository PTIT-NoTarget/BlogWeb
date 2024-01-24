import BlogList from "./blog/BlogList";

function Home() {
  return (
    <div>
      <div
        className="alert alert-danger alert-dismissible fade show container"
        role="alert"
      >
        Welcome{" "}
        <strong>
          {JSON.parse(localStorage.getItem("profileData")).fullName}
        </strong>{" "}
        to website
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <BlogList />
    </div>
  );
}

export default Home;
