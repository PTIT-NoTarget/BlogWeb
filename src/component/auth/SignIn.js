import logo from "../../assets/img/logo/logo-no-background.png";
import { useState, useContext } from "react";
import { url } from "../../App";

function SignIn({ setToast }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = () => {
    fetch(url + "/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setToast({
            show: true,
            content: data.message,
            type: "success",
          });
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          return fetch(url + "/api/v1/user/profile", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
              accessToken: localStorage.getItem("accessToken"),
            },
          }).then((res) => {
            return res.json();
          });
        } else {
          setToast({
            show: true,
            content: data.message,
            type: "warning",
          });
        }
      })
      .then((profileData) => {
        localStorage.setItem("profileData", JSON.stringify(profileData));
        if (profileData.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container" style={{ height: "500px" }}>
      <div className="row  d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-5">
          <div className="card align-items-center">
            <img className="card-img-top w-50 h-50" src={logo} alt="Title" />
            <div className="card-body w-100">
              <h4 className="card-title">Sign in with ...</h4>
              <div className="row">
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <button type="button" className="btn btn-primary btn-block">
                    <i className="fab fa-facebook-f"></i> Facebook
                  </button>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <button type="button" className="btn btn-danger btn-block">
                    <i className="fab fa-google"></i> Google
                  </button>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <button type="button" className="btn btn-success btn-block">
                    <i className="fab fa-microsoft"></i> Microsoft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-5">
          <div className="card">
            <h1 className="card-header text-center">Sign in</h1>
            <div className="card-body">
              <form id="sign-in-form" encType="multipart/form-data">
                <div className="form-floating mb-3">
                  <input
                    value={username}
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="username"> Username </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    value={password}
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label htmlFor="rememberMe" className="form-check-label">
                    Remember me
                  </label>
                </div>

                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <button
                    id="sign-up-btn"
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={handleSignIn}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              {" "}
              Don't have an account? <a href="/sign-up">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
