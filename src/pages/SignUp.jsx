import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/constants";

const SignUp = () => {
  const navigate = useNavigate();
  const [Fn, setFn] = useState("");
  const [Ls, setLs] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  const handleLogIn = () => {
    if (!Fn || !Ls || !password || !username) {
      setError("Invalid credentials");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    setLoading(true);
    axios
      .post(baseUrl + "/auth/register", {
        firstName: Fn,
        lastName: Ls,
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.userData));
        window.location.reload();
      })
      .catch((err) => setError("Invalid credentials"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="grad1 position-relative signUp">
      <div className="position-absolute top-50 start-50 translate-middle box p-2">
        <h1>Sign Up</h1>
        {/* first name input */}
        <div className="input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <input
            placeholder="First name"
            type="text"
            required
            value={Fn}
            onChange={(e) => setFn(e.target.value)}
          />
        </div>
        {/* last name input */}
        <div className="input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <input
            placeholder="Last name"
            type="text"
            required
            value={Ls}
            onChange={(e) => setLs(e.target.value)}
          />
        </div>
        {/* Email input */}
        <div className="input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-envelope-open-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.314l6.709 3.932L8 8.928l1.291.718L16 5.714V5.4a2 2 0 0 0-1.059-1.765l-6-3.2ZM16 6.873l-5.693 3.337L16 13.372v-6.5Zm-.059 7.611L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516M0 13.373l5.693-3.163L0 6.873v6.5Z" />
          </svg>
          <input
            placeholder="Username"
            type="text"
            required
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        {/* Password input */}
        <div className="pass">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-lock-fill"
            viewBox="0 0 14 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
          </svg>
          <input
            placeholder="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Error message */}
        {error && <p className="text-danger fw-bold text-center">{error}</p>}
        {/* Buttons */}
        <button className="btn btn-primary w-100" onClick={handleLogIn}>
          {loading ? "Loading.." : "Sign Up"}
        </button>
        <hr className="border-3 text-light" />
        <Link className="btn btn-outline-success w-100" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
