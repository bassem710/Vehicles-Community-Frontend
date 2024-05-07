import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../constants/constants';

const Appointments = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    const [appointments, setAppointments] = useState(null);

    useEffect( () => {
        axios.get(baseUrl + "/appointments/all", {headers: {Authorization:  token}})
            .then( res => setAppointments(res.data.data))
            // .catch( err => console.log(err.response.data.message));
    }, [user])

    function getDayName(date = new Date(), locale = 'en-US') {
        return date.toLocaleDateString(locale, {weekday: 'long'}) +" - "+ date.toLocaleDateString(locale, {month: 'short', day: '2-digit'})+" - "+ date.toLocaleDateString(locale, {year: "numeric"}) +" - "+ date.toLocaleTimeString(locale, {hour: 'numeric', minute: '2-digit'})
    }

    return (
        <div className="booking-container">
        {/* Page title */}
        <div className='text-light'>
            <h1>Appointments</h1>
        </div>
        <div className="booking-content">
            <ul>
            {
                appointments && appointments.length > 0 ?
                appointments.map((booking, index) => (
                    <li key={index}>{booking.user.firstName + " " + booking.user.lastName + "   ⟹  "} {getDayName(new Date(booking.date))}</li>
                ))
                : <h4 className='text-center'>{appointments === null ? "Loading..." : "No appointments found"}</h4>
            }
            </ul>
        </div>
    </div>
    )
}

export default Appointments