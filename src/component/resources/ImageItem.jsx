import { Button, Modal } from "react-bootstrap";
import { url } from "../../App";

function ImageItem({ images, setShowModal, showModal, setToast, setStatus }) {
  const deleteImage = (id) => {
    fetch(url + "/api/v1/user/image", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setStatus(id);
          setToast({
            show: true,
            content: "Delete image success",
            type: "success",
          });
        } else {
          setToast({
            show: true,
            content: "Delete image failed",
            type: "warning",
          });
        }
        console.log(data);
      });
  };
  return (
    <div
      className="container"
      style={{
        maxHeight: "600px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="row border-bottom text-center">
        <div className="col-2">
          <h5>#</h5>
        </div>
        <div className="col-7">
          <h5>Name</h5>
        </div>
        <div className="col-3">
          <h5>Action</h5>
        </div>
      </div>
      {images?.map((image, index) => (
        <div className="row border-bottom" key={image.id}>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <span className="badge bg-danger p-0 m-0">
              <Button
                className="text-center p-0 m-0"
                style={{ width: "38px", height: "38px" }}
                variant="danger"
                onClick={() => {
                  setShowModal((prev) => {
                    return { ...prev, [image.id]: true };
                  });
                }}
              >
                {index + 1}
              </Button>
            </span>
            <Modal
              show={showModal[image.id]}
              onHide={() => {
                setShowModal((prev) => {
                  return { ...prev, [image.id]: false };
                });
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>{image.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={image.link}
                  alt={image.name}
                  id="image-preview"
                  className="img-fluid"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    navigator.clipboard.writeText(image.link);
                    setToast({
                      show: true,
                      content: "Copy link success",
                      type: "success",
                    });
                  }}
                >
                  Copy
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col-7 d-flex align-items-center">{image.name}</div>
          <div className="col-3 d-flex align-items-center justify-content-center py-1">
            <Button
              className="me-1"
              variant="outline-danger"
              onClick={() => {
                navigator.clipboard.writeText(image.link);
                setToast({
                  show: true,
                  content: "Copy link success",
                  type: "success",
                });
              }}
            >
              <i className="fa fa-copy"></i>
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                deleteImage(image.id);
              }}
            >
              <i className="fa fa-trash-can"></i>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageItem;
