import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";

import { baseUrl } from "../../constants/constants";

const AddEvent = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddEvent = () => {
    setLoading(true);
    if (!title || !location || !selectedDate || !selectedTime) {
      setError("Please fill all the required fields");
      setLoading(false);
      return;
    }
    // Merge Date and time
    const desiredYear = selectedDate.getFullYear();
    const desiredMonth = selectedDate.getMonth();
    const desiredDay = selectedDate.getDate();
    const newDate = new Date(desiredYear, desiredMonth, desiredDay);
    newDate.setHours(selectedTime.getHours());
    newDate.setMinutes(selectedTime.getMinutes());
    newDate.setSeconds(selectedTime.getSeconds());
    // Convert date format to mongoDB DateTime format
    const momentInstance = moment(newDate, "ddd MMM DD YYYY HH:mm:ss ZZ");
    const dateValue = momentInstance.format("YYYY-MM-DDTHH:mm:ss.SSS+00:00");
    // Chech if selected date is valid
    const currentDate = moment(
      new Date(),
      "ddd MMM DD YYYY HH:mm:ss ZZ"
    ).format("YYYY-MM-DDTHH:mm:ss.SSS+00:00");
    const isDateValid = dateValue > currentDate;
    if (!isDateValid) {
      setLoading(false);
      setError("Invalid date, Enter future date");
      return;
    }
    // Submit
    axios
      .post(
        baseUrl + "/events/addEvent",
        {
          title,
          description,
          location,
          date: dateValue,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => navigate(`/events/`))
      .catch( err => setError("Something went wrong"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="col-12 mt-3 p-3 shadow cardAdd bg-white rounded-3">
      <h2 className="text-center p-1">Add Event</h2>
      {/* line 1 : Title */}
      <div className="input-group mb-2">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Title
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {/* Desc */}
      <div className="input-group mb-2">
        <span className="input-group-text">description</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        {/* Location */}
        <div className="input-group mb-2 me-2">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Location
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {/* Date */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select a date"
          className="input-group-text"
        />
        {/* Time */}
        <DatePicker
          selected={selectedTime}
          onChange={(date) => setSelectedTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          placeholderText="Select a time"
          className="my-2 my-md- ms-md-2 input-group-text"
        />
      </div>
      {/* Btn & Error Msg */}
      <div className="d-flex justify-content-between align-items-center">
        <p className="p-o m-0 text-danger fw-bold">{error}</p>
        <button onClick={handleAddEvent} className="btn btn-primary px-5">
          {loading ? "Loading..." : "Add Event"}
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
