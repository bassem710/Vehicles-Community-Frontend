import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/constants";

const AddNews = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddNews = () => {
    setLoading(true);
    if (!title || !desc) {
      setError("Please fill all the required fields");
      setLoading(false);
      return;
    }
    // Submit
    axios
      .post(
        baseUrl + "/news/add",
        {
          title,
          description: desc,
          image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => navigate(`/news`))
      .catch((err) => setError("Something went wrong"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="col-12 mt-3 p-3 shadow cardAdd bg-white rounded-3">
      <h2 className="text-center p-1">Add News</h2>
      <div className="row">
        {/* Image select */}
        <div className="input-group mb-2">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Image
          </span>
          <input
            type="text"
            value={image}
            id="image"
            className="form-control my-2"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        {/* Title */}
        <div className="col-12">
          <div className="input-group mb-2">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Title
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
        </div>
      </div>
      {/* Desc */}
      <div className="input-group mb-2">
        <span className="input-group-text">Description</span>
        <textarea
          className="form-control"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      {/* Btn & Error Msg */}
      <div className="d-flex justify-content-between align-items-center">
        <p className="p-o m-0 text-danger fw-bold">{error}</p>
        <button onClick={handleAddNews} className="btn btn-primary px-5">
          {loading ? "Loading..." : "Add News"}
        </button>
      </div>
    </div>
  );
};

export default AddNews;
