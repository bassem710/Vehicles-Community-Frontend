import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../constants/constants";

function cars({ id, title, imageurl, price, liked }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  const handleLike = () => {
    axios
      .post(
        baseUrl + `/wishlist/like/${id}`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((_) => window.location.reload())
      .catch((err) => console.log("Something went wrong"));
  };

  const handleUnlike = () => {
    axios
      .post(
        baseUrl + `/wishlist/unlike/${id}`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((_) => window.location.reload())
      .catch((err) => console.log("Something went wrong"));
  };

  const handleDelete = () => {
    axios
      .delete(baseUrl + `/vehicle/${id}`, {
        headers: { Authorization: token },
      })
      .then((_) => window.location.reload())
      .catch((err) => console.log("Something went wrong"));
  };

  return (
    <div className="col-12 col-sm-4 col-lg-3 p-1">
      <div className="card w-100 h-100">
        <img src={imageurl} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-dark">{price} L.E.</p>
          <div className="d-flex justify-content-between">
            <Link to={`/cars/${id}`} className="btn btn-primary">
              View Info
            </Link>
            {user && user.role === "USER" && (
              <button
                className="favourite-button btn"
                onClick={liked ? handleUnlike : handleLike}
              >
                {liked ? "❤️" : "💔"}
              </button>
            )}
            {user && user.role === "ADMIN" && (
              <button className="favourite-button btn" onClick={handleDelete}>
                🗑️
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default cars;
