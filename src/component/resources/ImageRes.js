import ImageModal from "./ImageModal";
import ImageTable from "./ImageTable";

import { Button, Offcanvas } from "react-bootstrap";

import { useState } from "react";

function ImageRes({ Toast, setToast }) {
  const [status, setStatus] = useState("");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  return (
    <div className="m-0 p-0">
      <div className="d-flex jutify-content-between align-items-center">
        <span className="fs-2">Resources</span>
        <ImageModal
          status={status}
          setStatus={setStatus}
          setToast={setToast}
        ></ImageModal>
        <span className="badge bg-danger p-0 d-span d-md-none">
          <Button
            variant="danger"
            onClick={() => {
              setShowOffcanvas(true);
            }}
          >
            <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
          </Button>
        </span>
      </div>
      <Offcanvas
        show={showOffcanvas}
        onHide={() => {
          setShowOffcanvas(false);
        }}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="d-flex jutify-content-between align-items-center">
              <span className="fs-2">Resources</span>
              <ImageModal
                status={status}
                setStatus={setStatus}
                setToast={setToast}
              ></ImageModal>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ImageTable
            status={status}
            setStatus={setStatus}
            setToast={setToast}
          ></ImageTable>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="all-resource d-none d-md-block">
        <ImageTable
          status={status}
          setStatus={setStatus}
          setToast={setToast}
        ></ImageTable>
      </div>
    </div>
  );
}

export default ImageRes;
