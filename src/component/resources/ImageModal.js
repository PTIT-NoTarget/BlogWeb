import { Button, Spinner, CloseButton, Modal } from "react-bootstrap";

import ToastMessage from "../base/ToastMessage";

import { useEffect, useState, useContext } from "react";
import { url } from "../../App";

function ImageModal({ status, setStatus, setToast }) {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const UploadImage = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", imageName);
    setIsLoading(true);
    if (!image) {
      setToast({
        show: true,
        content: "Please choose an image",
        type: "warning",
      });
      setIsLoading(false);
      return;
    }
    if (!imageName) {
      setToast({
        show: true,
        content: "Please enter image name",
        type: "warning",
      });
      setIsLoading(false);
      return;
    }
    fetch(url + "/api/v1/user/upload-image", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setStatus(imageName);
          setImage(null);
          setImageName("");
        } else {
          setToast({ show: true, content: "Add image failed", type: "danger" });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setPreview(null);
        setIsLoading(false);
        setShowModal(false);
        setToast({ show: true, content: "Add image success", type: "success" });
      });
  };

  return (
    <span className="fs-6">
      <span className="badge bg-danger p-0 mx-2">
        <Button
          variant="danger"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <i className="fa fa-plus-circle" aria-hidden="true"></i>
        </Button>
      </span>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setPreview(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="image-res" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image-res"
                name="image-res"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
                required
              />
            </div>
            <div className="form-floating mb-3">
              <input
                value={imageName}
                type="text"
                className="form-control"
                name="img-name"
                id="img-name"
                placeholder="Image name"
                onChange={(e) => setImageName(e.target.value)}
                required
              />
              <label htmlFor="img-name"> Name </label>
            </div>
          </form>
          <img src={preview} alt="" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          {!isLoading ? (
            <Button variant="danger" onClick={UploadImage}>
              Add
            </Button>
          ) : (
            <Spinner animation="border" variant="danger" />
          )}
          <Button
            variant="outline-danger"
            onClick={() => {
              setShowModal(false);
              setPreview(null);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}

export default ImageModal;
