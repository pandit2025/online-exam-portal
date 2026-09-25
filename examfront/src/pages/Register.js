import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // =========================
    // FIRST NAME VALIDATION
    // =========================

    if (!firstname.trim()) {
      setError("First Name is required.");
      return;
    }

    if (!/^[A-Za-z]+$/.test(firstname.trim())) {
      setError("First Name should contain only letters.");
      return;
    }

    // =========================
    // LAST NAME VALIDATION
    // =========================

    if (!lastname.trim()) {
      setError("Last Name is required.");
      return;
    }

    if (!/^[A-Za-z]+$/.test(lastname.trim())) {
      setError("Last Name should contain only letters.");
      return;
    }

    // =========================
    // EMAIL VALIDATION
    // =========================

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // =========================
    // PASSWORD VALIDATION
    // =========================

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    // =========================
    // CONFIRM PASSWORD
    // =========================

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    // =========================
    // REGISTER DATA
    // =========================

    const registerData = {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      password: password
    };

    console.log("Register Data:", registerData);

    // =========================
    // SEND TO BACKEND
    // =========================

    axios
      .post(API_URL + "/register", registerData)
      .then((response) => {
        console.log("Register Response:", response.data);

        setSuccess("Registration successful!");

        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        console.log("Register Error:", error);

        if (error.response) {
          setError(
            error.response.data.message || "Registration failed."
          );
        } else {
          setError("Unable to connect to backend.");
        }
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow">
            <div className="card-body p-4">

              <h1 className="text-center mb-4">
                Register
              </h1>

              {/* ERROR MESSAGE */}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {/* SUCCESS MESSAGE */}

              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* FIRST NAME */}

                <div className="mb-3">
                  <label className="form-label">
                    First Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={firstname}
                    onChange={(e) =>
                      setFirstname(e.target.value)
                    }
                    placeholder="Enter first name"
                  />
                </div>

                {/* LAST NAME */}

                <div className="mb-3">
                  <label className="form-label">
                    Last Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={lastname}
                    onChange={(e) =>
                      setLastname(e.target.value)
                    }
                    placeholder="Enter last name"
                  />
                </div>

                {/* EMAIL */}

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter email"
                  />
                </div>

                {/* PASSWORD */}

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter password"
                  />

                  <small className="text-muted">
                    Minimum 8 characters with uppercase,
                    lowercase, number and special character.
                  </small>
                </div>

                {/* CONFIRM PASSWORD */}

                <div className="mb-3">
                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm password"
                  />
                </div>

                {/* REGISTER BUTTON */}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Register
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}