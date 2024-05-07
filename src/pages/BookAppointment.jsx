import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { baseUrl } from '../constants/constants';
import axios from 'axios';
import moment from 'moment';

const BookAppointment = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [existingBookings, setExistingBookings] = useState(null);
    const [error, setError] = useState(null);

    useEffect( () => {
        axios.get(baseUrl + "/appointments/myAppointments", {headers: {Authorization: user ? token : undefined}})
            .then( res => setExistingBookings(res.data.data))
            // .catch( err => console.log(err.response.data.message));
    })

    const handleBooking = () => {
        if (!selectedDate || !selectedTime) {
            setError('Please fill in all fields.');
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
        const momentInstance = moment(newDate, 'ddd MMM DD YYYY HH:mm:ss ZZ');
        const dateValue = momentInstance.format('YYYY-MM-DDTHH:mm:ss.SSS+00:00');
        // Chech if selected date is valid
        const currentDate = moment(new Date(), 'ddd MMM DD YYYY HH:mm:ss ZZ').format('YYYY-MM-DDTHH:mm:ss.SSS+00:00');
        const isDateValid = dateValue > currentDate;
        if(!isDateValid) {
            setError("Invalid date, Enter future date");
            return;
        }
        // Submit
        axios.post(baseUrl + "/appointments/addAppointment", {userId: token, date: dateValue})
            .then( _ => window.location.reload())
            // .catch( err => setError(err.response.data.message));
        // Reset 
        setSelectedDate(null);
        setSelectedTime(null);
        setError(null);
    };

    function getDayName(date = new Date(), locale = 'en-US') {
        return date.toLocaleDateString(locale, {weekday: 'long'}) +" - "+ date.toLocaleDateString(locale, {month: 'short', day: '2-digit'})+" - "+ date.toLocaleDateString(locale, {year: "numeric"}) +" - "+ date.toLocaleTimeString(locale, {hour: 'numeric', minute: '2-digit'});    }

    return (
        <div className="booking-container">
            {/* Page title */}
            <div className='text-light'>
                <h1>Book Appointment</h1>
            </div>
            <div className="booking-content">
                {/* Form */}
                <form>
                    {/* Date */}
                    <label>
                        Date&nbsp;
                        <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select a date"
                        />
                    </label>
                    <br />
                    {/* Time */}
                    <label>
                        Time&nbsp;
                        <DatePicker
                        selected={selectedTime}
                        onChange={(date) => setSelectedTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Select a time"
                        />
                    </label>
                    <br />
                    {/* Book button */}
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="button" onClick={handleBooking} className="form-button">
                            Book Appointment
                        </button>
                    </div>
                </form>
                {/* Error message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <hr />
                {/* My Appointments */}
                <h2>{existingBookings ? (existingBookings.length > 0 ? "Existing Bookings" : "No booked appointments") : "Loading..."}</h2>
                <ul>
                {
                    existingBookings &&
                    existingBookings.map((booking, index) => (
                        <li key={index}>{getDayName(new Date(booking.date))}</li>
                    ))
                }
                </ul>
            </div>
        </div>
    );
};

export default BookAppointment;