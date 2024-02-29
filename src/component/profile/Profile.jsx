import Avatar from "./Avatar";
import BlogTab from "./BlogTab";
import InformationTab from "./InformationTab";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../App";

function Profile() {
  const [profile, setProfile ] = useState(null);
  const { username } = useParams(); 
  useEffect(() => {
    fetch(url + "/api/v1/guest/profile/" + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);

  const createChatBox = () => {
    fetch(url + "/api/v1/user/chatbox", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ username: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === 200){
          console.log(data);
          window.location.href = "/message";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <Avatar profile={profile}/>
        </div>
        <div className="col-6 my-auto">
          <div className="d-flex justify-content-end">
            <Button variant="outline-danger me-3">Follow</Button>
            <Button
              variant="outline-danger me-3"
              onClick={() => {
                createChatBox();
              }}
            >
              Message
            </Button>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <Tabs defaultActiveKey="blog-tab" id="profile-tab" className="mb-3">
          <Tab eventKey="blog-tab" title="Blog">
            <BlogTab></BlogTab>
          </Tab>
          <Tab eventKey="information" title="Information">
            <InformationTab></InformationTab>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
