import axios from "axios";
import Cars from "../components/CarBox";
import { baseUrl } from "../constants/constants";
import React, { useEffect, useState } from "react";

const Favorites = () => {
  const [favs, setFavs] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(
    (_) => {
      axios
        .get(baseUrl + "/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setFavs(res.data.data))
        .catch((err) => console.log("Something went wrong"));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="home container-lg">
      <h4 className="fs-3 m-2 text-center">Favorites</h4>
      <div className="row">
        {favs && favs.length > 0 ? (
          favs.map((car) => {
            return (
              <Cars
                id={car.id}
                key={car.id}
                title={car.title}
                imageurl={car.image}
                price={car.price}
                liked={true}
              />
            );
          })
        ) : (
          <h4 className="text-center">
            {favs === null ? "Loading..." : "No favorites found"}
          </h4>
        )}
      </div>
    </div>
  );
};

export default Favorites;
