import { useEffect, useState, useContext } from "react";
import ImageItem from "./ImageItem";
import { url } from "../../App";
import { Button, Modal } from "react-bootstrap";

function ImageTable({ status, setStatus, setToast }) {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState(null);
  const [imagesSto, setImagesSto] = useState(null);
  const [showModal, setShowModal] = useState({});
  useEffect(() => {
    fetch(url + "/api/v1/user/get-all-image", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImagesSto(data);
        setImages(data);
      });
  }, [status]);

  useEffect(() => {
    setImages(
      imagesSto?.filter((image) => {
        return image.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search]);

  return (
    <div>
      <div className="form-floating mb-3">
        <input
          value={search}
          type="text"
          className="form-control"
          name="search-img"
          id="search-img"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          required
        />
        <label htmlFor="search-img"> Search </label>
      </div>
      <ImageItem
        images={images}
        setShowModal={setShowModal}
        showModal={showModal}
        setToast={setToast}
        setStatus={setStatus}
      />
    </div>
  );
}

export default ImageTable;
