import { useState } from "react";
import { url } from "../../App";
import { Spinner } from "react-bootstrap";

function SignUp({ setToast }) {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSignUp = () => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      setToast({
        message: "Password and confirm password do not match",
        type: "warning",
        show: true,
      });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("fullName", firstname + " " + lastname);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("phoneNumber", phone);

    fetch(url + "/api/v1/auth/signup", {
      method: "POST",
      headers: {},
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setToast({
            message: data.message,
            type: "success",
            show: true,
          });
          window.location.href = "/sign-in";
        } else {
          setToast({
            message: data.message,
            type: "warning",
            show: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container col-md-6 col-12">
      <div className="card">
        <h1 className="card-header text-center">Sign up</h1>
        <div className="card-body">
          <form id="sign-up-form" encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="avatar" className="form-label">
                Avatar
              </label>
              <input
                type="file"
                className="form-control"
                id="avatar"
                name="avatar"
                accept="image/*"
                required
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>

            <div className="row">
              <div className="col">
                <div className="col form-floating mb-3">
                  <input
                    value={firstname}
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="form-control"
                    placeholder="First name"
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <label htmlFor="firstname"> First name </label>
                </div>
              </div>
              <div className="col">
                <div className="col form-floating mb-3">
                  <input
                    value={lastname}
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="form-control"
                    placeholder="Last name"
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <label htmlFor="lastname"> Last name </label>
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                value={username}
                type="text"
                className="form-control"
                name="username"
                id="username"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
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
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="form-floating mb-3">
              <input
                value={confirmPassword}
                type="password"
                className="form-control"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirm-password">Confirm Password</label>
            </div>

            <div className="form-floating mb-3">
              <input
                value={email}
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                value={phone}
                type="tel"
                className="form-control"
                name="phone"
                id="phone"
                placeholder="Phone"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="phone">Phone</label>
            </div>

            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="agree" />
              <label htmlFor="agree" className="form-check-label">
                Agree to terms and conditions
              </label>
            </div>

            <div className="mb-3 d-flex justify-content-center align-items-center">
              {!isLoading ? (
                <button
                  type="button"
                  className="btn btn-danger btn-block"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              ) : (
                <Spinner animation="border" variant="danger" />
              )}
            </div>
          </form>
        </div>
        <div className="card-footer">
          {" "}
          Already have an account? <a href="/sign-in">Sign in</a>{" "}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
