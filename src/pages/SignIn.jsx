import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from "../constants/constants";

import "../signIn.css"
import "bootstrap/dist/css/bootstrap.css";

const SignIn = () => {
   const navigate = useNavigate();
   const [email ,setEmail ] = useState('');
   const [password ,setPassword ] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   useEffect( () => {
      if (localStorage.getItem("user")) {
         navigate("/");
      }
   })

   const handleLogIn = () => {
      setLoading(true);
      axios.post(baseUrl + "/user/sign-in", {email, password})
         .then( res => {
            localStorage.setItem("user", JSON.stringify(res.data.data));
            window.location.reload();
         })
         .catch( err => setError(err.response.data.message))
         .finally( () => setLoading(false))
   }

   return (   
      <div className="grad1 position-relative login" >
         <div className="position-absolute top-50 start-50 translate-middle box p-2">  
            <h1>Log In</h1>
            {/* Email input */}
            <div className="input">
               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
               </svg>
               <input
               placeholder='Email' 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            {/* Password input */}
            <div className="pass">
               <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 14 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                  </svg>
               <input 
                  placeholder='password' 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            {/* Error message */}
            {error && <p className='text-danger fw-bold text-center'>{error}</p>}
            {/* Buttons */}
            <button className='btn btn-primary w-100' onClick={handleLogIn}>{loading ? "Loading.." : "Log in"}</button>
            <hr className='border-3 text-light' />
            <Link className='btn btn-outline-success w-100' to="/sign-up">Sign Up</Link>
         </div> 
      </div>
   )
}

export default SignIn