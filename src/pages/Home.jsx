import React, { useEffect, useState } from "react";
import Cars from "../components/CarBox";
import axios from "axios";
import { baseUrl } from "../constants/constants";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [cars, setCars] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const onClear = () => {
    setSearchText("");
    setSearchResult(null);
  };

  const onSearch = () => {
    if (searchText === "") return;
    setSearchResult([]);
    const searchTextLowerCase = searchText.toLowerCase();
    if (cars) {
      cars.forEach((car) => {
        const carTitleLowerCase = car.title.toLowerCase();
        if (carTitleLowerCase.includes(searchTextLowerCase)) {
          setSearchResult((prev) => (prev ? [...prev, car] : [car]));
        }
      });
    }
  };

  useEffect(
    (_) => {
      if (user.role === "ADMIN") {
        axios
          .get(baseUrl + "/vehicle/all")
          .then((res) => setCars(res.data.data))
          .catch((err) => console.log("Something went wrong"));
      }
      axios
        .get(baseUrl + "/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const data = res.data.data.map((one) => one.id);
          axios
            .get(baseUrl + "/vehicle/all")
            .then((res) =>
              setCars(
                res.data.data.map((one) => {
                  if (data.includes(one.id)) return { ...one, liked: true };
                  return one;
                })
              )
            )
            .catch((err) => console.log("Something went wrong"));
        })
        .catch((err) => console.log("Something went wrong"));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="home container-lg">
      {/* Search */}
      <div className="form-inline mt-2 d-flex">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          onClick={onClear}
          className="btn btn-outline-danger my-2 my-sm-0 ms-2"
          type="button"
        >
          Clear
        </button>
        <button
          onClick={onSearch}
          className="btn btn-outline-success my-2 my-sm-0 ms-2"
          type="button"
        >
          Search
        </button>
      </div>
      {/* Search Results */}
      {searchResult &&
        (searchResult.length > 0 ? (
          <>
            <h4 className="fs-3 m-2 text-center">Search Result</h4>
            <div className="row">
              {searchResult.map((car) => {
                return (
                  <Cars
                    id={car.id}
                    key={car.id}
                    title={car.title}
                    imageurl={car.image}
                    price={car.price}
                    liked={car?.liked}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <h4 className="text-center mt-2">0 Results Found</h4>
        ))}
      {/* Home */}
      <h4 className="fs-3 m-2 text-center">Vehicles</h4>
      <div className="row">
        {cars && cars.length > 0 ? (
          cars.map((car) => {
            return (
              <Cars
                id={car.id}
                key={car.id}
                title={car.title}
                imageurl={car.image}
                price={car.price}
                liked={car?.liked}
              />
            );
          })
        ) : (
          <h4 className="text-center">
            {cars === null ? "Loading..." : "No vehicles found"}
          </h4>
        )}
      </div>
    </div>
  );
};

export default Home;
