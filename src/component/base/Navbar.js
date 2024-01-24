import logo from "../../assets/img/logo/logo-no-background.png";

import { useState, useEffect } from "react";

import { Dropdown, Button, Image, ButtonGroup } from "react-bootstrap";

function Navbar() {
  const [sign, setSign] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setSign(
        <Dropdown as={ButtonGroup} drop="down-centered">
          <Button
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              boxShadow: "none",
            }}
            variant="light"
          >
            <Image
              src={JSON.parse(localStorage.getItem("profileData")).avatar}
              roundedCircle
              style={{ width: "30px", height: "30px" }}
              onClick={() => {
                window.location.href = "/my-profile";
              }}
            />
          </Button>
          <Dropdown.Toggle split variant="light" />
          <Dropdown.Menu>
            <Dropdown.Item
              eventKey="0"
              onClick={() => {
                window.location.href = "/my-profile";
              }}
            >
              <strong>
                {JSON.parse(localStorage.getItem("profileData")).fullName}
              </strong>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              eventKey="1"
              onClick={() => {
                window.location.href = "/my-profile";
              }}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={() => {
                window.location.href = "/my-blog";
              }}
            >
              My Blog
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="3"
              onClick={() => {
                window.location.href = "/settings";
              }}
            >
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              eventKey="4"
              onClick={() => {
                localStorage.removeItem("accessToken");
                window.location.href = "/";
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      setSign(
        <div className="w-100 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-danger ms-4 ms-md-2"
            onClick={() => {
              window.location.href = "/sign-in";
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className="btn btn-danger me-4 me-md-2"
            onClick={() => {
              window.location.href = "/sign-up";
            }}
          >
            Sign Up
          </button>
        </div>
      );
    }
  }, []);

  return (
    <div className="sticky-top bg-white z-1000">
      <div className="container">
        <header className="row border-bottom">
          <div className="col-4 col-md-4 logo d-flex justify-content-start p-1">
            <a
              href="/"
              className="d-inline-flex link-body-emphasis text-decoration-none"
            >
              <img src={logo} alt="logo" width="60" height="60" />
            </a>
          </div>

          <nav className="navbar navbar-expand-md col-8 col-md-8 justify-content-end align-items-center px-3">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="row collapse navbar-collapse justify-content-center justify-content-md-between align-items-center"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav col-12 col-md-9 text-center">
                <li className="nav-item">
                  <a href="/" className="nav-link link-danger">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/blog" className="nav-link link-danger">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/upload-blog" className="nav-link link-danger">
                    Upload Post
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/faqs" className="nav-link link-danger">
                    FAQs
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/about" className="nav-link link-danger">
                    About
                  </a>
                </li>
              </ul>
              <div className=" col-12 col-md-3 d-flex justify-content-end align-items-center">
                {sign}
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
