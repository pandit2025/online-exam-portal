import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

export default function Adminlogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .get(API_URL + "/admin/" + email + "/" + password)
      .then((response) => {

        console.log("Admin Login Response:", response.data);

        if (response.data.length > 0) {

          // Save Admin Login Status
          localStorage.setItem("adminLoggedIn", "true");
          localStorage.setItem("adminEmail", email);

          // Notify Navbar
          window.dispatchEvent(
            new Event("adminStatusChanged")
          );

          alert("Admin Login Successfully");

          // Go to Admin Result
          navigate("/adminresult");

        } else {

          alert("Invalid Admin Email or Password");

        }

      })
      .catch((error) => {

        console.log("Admin Login Error:", error);

        if (error.response) {

          alert(
            error.response.data.message ||
            "Admin Login Failed"
          );

        } else {

          alert("Unable to connect to backend");

        }

      });
  }

  return (
    <div className="container mt-5">

      <h1 className="text-center display-5 mb-4">
        Admin Login
      </h1>

      <form onSubmit={handleSubmit}>

        {/* Email */}
        <div className="mb-3">

          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
          >
            Email address
          </label>

          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>

        {/* Password */}
        <div className="mb-3">

          <label
            htmlFor="exampleInputPassword1"
            className="form-label"
          >
            Password
          </label>

          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>

      </form>

    </div>
  );
}