import React from "react";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Dropdown,
  CloseButton,
  SplitButton,
  Image,
  ButtonGroup,
  Button,
} from "react-bootstrap";

import ToastMessage from "./base/ToastMessage";

function FAQs({ Toast, setToast }) {
  return (
    <Dropdown as={ButtonGroup}>
      <Button
        style={{
          backgroundColor: "transparent",
          borderColor: "transparent",
          boxShadow: "none",
        }}
        variant="light"
      >
        <Image
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          roundedCircle
          style={{ width: "30px", height: "30px" }}
        />
      </Button>
      <Dropdown.Toggle split variant="light"/>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Active Item</Dropdown.Item>
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FAQs;
