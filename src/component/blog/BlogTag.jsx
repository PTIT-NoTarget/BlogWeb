import { useState, useEffect } from "react";
import { Dropdown, CloseButton, Button } from "react-bootstrap";
import { url } from "../../App";

function BlogTag({ setToast, tags, setTags, textPlaceholder, textBtn }) {
  const [tagInput, setTagInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  
  useEffect(() => {
    fetch(url + "/api/v1/guest/tags", {
      method: "GET",
      headers: {},
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setData(data);
        setDropdownData(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    setDropdownData(
      data.filter((item) => {
        return item.name.toLowerCase().includes(tagInput.toLowerCase());
      })
    );
  }, [data, tagInput]);

  useEffect(() => {
    setDropdownData(
      data.filter((item) => {
        return !tags.includes(item.name);
      })
    );
  }, [data, tags]);

  const addTag = (tag) => {
    if (tags.length < 5 && !tags.includes(tag) && tag !== "") {
      setTags([...tags, tag]);
      handleTagInput("");
    } else {
      setToast({
        show: true,
        content: "Không đáp ứng yêu cầu",
        type: "warning",
      });
    }
  };

  const handleTagInput = (e) => {
    setTagInput(e);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 500);
  };

  return (
    <div>
      <div className="mb-3">
        <label className="m-2" htmlFor="Tags">
          Tags
        </label>
        <span>
          {tags.map((tag) => (
            <span key={tag} className="badge bg-danger me-2">
              {tag}{" "}
              <CloseButton
                onClick={() => {
                  setTags(tags.filter((item) => item !== tag));
                }}
              />
            </span>
          ))}
        </span>
        <div className="row">
          <div className={textBtn === "none" ? "col-12" : "col-8"}>
            <input
              value={tagInput}
              type="text"
              className="form-control"
              name="Tags"
              id="Tags"
              placeholder={textPlaceholder}
              onChange={(e) => handleTagInput(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div className="col-4" style={{ display: textBtn }}>
            <Button variant="outline-danger" onClick={() => addTag(tagInput)}>
              {textBtn}
            </Button>
          </div>
        </div>

        {dropdownData.length > 0 && (
          <Dropdown show={showDropdown}>
            <Dropdown.Menu
              style={{
                maxHeight: "200px",
                overflow: "auto",
                maxWidth: "400px",
              }}
            >
              {dropdownData.map((item) => (
                <Dropdown.Item
                  key={item.id}
                  onClick={() => {
                    addTag(item.name);
                  }}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default BlogTag;
