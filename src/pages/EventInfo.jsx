import axios from "axios";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom"

import { baseUrl } from "../constants/constants";
import image from "../assets/DSC07349_zikwky.jpg"
import image1 from "../assets/images.jpg";

const EventInfo = () => {
  const [eventInfo, setEventInfo] = useState([]);
  const {id} = useParams();

  useEffect((_) => {
    axios
      .get(baseUrl + "/events/" +id)
      .then((res) => setEventInfo(res.data.data))
      // .catch((err) => console.log(err));
  }, [id]);


  const [dateAndTime, setDateAndTime] = useState(null);
    useEffect(() => {
      setDateAndTime(eventInfo.date);
    }, [eventInfo.date]);
    const eventDate = new Date(dateAndTime);

    const getTimeLeft = () => {
      const totalTimeLeft = eventDate - new Date();
      var days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
      var hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
      var minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
      var seconds = Math.floor((totalTimeLeft / 1000) % 60);
      if (seconds < 0){
        days="00";
        hours="00";
        minutes="00";
        seconds="00";
      }
        return { days, hours, minutes, seconds };
    };
    
	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

	useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateAndTime]);

  return (
    <div className="eventInfo">
      <div className="imageContainer">
        <h1 className="titleOfEventFant">{eventInfo.title}</h1>
        <h1 className="titleOfEvent">{eventInfo.title}</h1>
        <img
          src={image}
          alt="imageTest"
          className="imageSize"
        />
        <div className="counter">
          <div className="d-flex justify-content-center">
            <div className="pe-2 d-flex flex-column border border-white border-start-0 border-top-0 border-bottom-0 border-4">
              <div className="ps-2">
                <h1 className="time">{timeLeft.days}</h1>
              </div>
              <div className="p">
                <h2 className="timeType">days</h2>
              </div>
            </div>
            <div className="pe-2 ps-2 d-flex flex-column border border-white border-start-0 border-top-0 border-bottom-0 border-4">
              <div className="ps-2">
                <h1 className="time">{timeLeft.hours}</h1>
              </div>
              <div className="p">
                <h2 className="timeType">hours</h2>
              </div>
            </div>

            <div className="pe-2 ps-2 d-flex flex-column border border-white border-start-0 border-top-0 border-bottom-0 border-4">
              <div className="ps-1">
                <h1 className="time">{timeLeft.minutes}</h1>
              </div>
              <div className="p">
                <h2 className="timeType">min</h2>
              </div>
            </div>

            <div className="pe-2 ps-2 d-flex flex-column">
              <div className="ps-1">
                <h1 className="time">{timeLeft.seconds}</h1>
              </div>
              <div className="p">
                <h2 className="timeType">sec</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutEvent p-3">
        <h2 className="aboutTitle p-3">Details</h2>
        <p className="details p-3 rounded text-center">{eventInfo.desc}</p>
        <div className="imageAndCounter">
          <div className="row align-items-center">
            <div className="col text-center">
              <div className="likesCount eventCounterLocation">
                <h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="#FF3636"
                    className="bi bi-geo-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="evenodd"
                      d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"
                    />
                  </svg>
                  Location :{" " + eventInfo.location}
                </h2>
              </div>
            </div>
            <img src={image1} alt="123" className="m-2 float-end col" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
