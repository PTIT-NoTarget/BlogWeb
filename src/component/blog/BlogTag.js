import { useState, useEffect, useContext } from "react";
import { Dropdown, CloseButton, Button } from "react-bootstrap";
import { url } from "../../App";


function BlogTag({ setToast, tags, setTags}) {
  const [tagInput, setTagInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  useEffect(() => {
    fetch(url + "/api/v1/user/tags", {
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
  }, [tagInput]);

  useEffect(() => {
    setDropdownData(
      data.filter((item) => {
        return !tags.includes(item.name);
      })
    );
  }, [tags]);

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
    }, 200);
  };

  return (
    <div>
      <div className="mb-3">
        <label className="m-2" htmlFor="Tags">
          Tags
        </label>
        <span>
          {tags.map((tag, index) => (
            <span key={index} className="badge bg-danger me-2">
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
          <div className="col-8">
            <input
              value={tagInput}
              type="text"
              className="form-control"
              name="Tags"
              id="Tags"
              placeholder="Tối đa 5 tag"
              onChange={(e) => handleTagInput(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div className="col-4">
            <Button variant="outline-danger" onClick={() => addTag(tagInput)}>
              Add new tag
            </Button>
          </div>
        </div>

        {dropdownData.length > 0 && (
          <Dropdown show={showDropdown}>
            <Dropdown.Menu style={{ maxHeight: "200px", overflow: "auto" }}>
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
