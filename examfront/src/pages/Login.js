import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

     axios
    .get(
      API_URL + "/register/login/" + email + "/" + password
    )
      .then((response) => {

        if (response.data.length > 0) {

          // Save login status
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", email);

          // Tell Navbar that login status changed
          window.dispatchEvent(
            new Event("loginStatusChanged")
          );

          alert("Login Successfully");

          // Go to Home page
          navigate("/");

        } else {

          alert("Invalid Email or Password");

        }

      })
      .catch((error) => {

        console.log("Login Error:", error);

        if (error.response) {
          alert(
            error.response.data.message ||
            "Login failed"
          );
        } else {
          alert("Unable to connect to backend");
        }

      });
  }

  return (
    <div>

      <h1 className="text-center display-5">
        Login
      </h1>

      <section className="vh-100 gradient-custom">

        <div className="container py-5 h-100">

          <div className="row d-flex justify-content-center align-items-center h-100">

            <div className="col-12 col-md-8 col-lg-6 col-xl-5">

              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >

                <div className="card-body p-5 text-center">

                  <form onSubmit={handleSubmit}>

                    <div className="mb-md-5 mt-md-4 pb-5">

                      <h2 className="fw-bold mb-2 text-uppercase">
                        Login
                      </h2>

                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>

                      {/* Email */}

                      <div className="form-outline form-white mb-4">

                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          placeholder="Email"
                          required
                        />

                        <label
                          className="form-label"
                          htmlFor="typeEmailX"
                        >
                          Email
                        </label>

                      </div>

                      {/* Password */}

                      <div className="form-outline form-white mb-4">

                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                          placeholder="Password"
                          required
                        />

                        <label
                          className="form-label"
                          htmlFor="typePasswordX"
                        >
                          Password
                        </label>

                      </div>

                      <p className="small mb-5 pb-lg-2">
                        <a
                          className="text-white-50"
                          href="#!"
                        >
                          Forgot password?
                        </a>
                      </p>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>

                      <div className="d-flex justify-content-center text-center mt-4 pt-1">

                        <a href="#!" className="text-white">
                          <i className="fab fa-facebook-f fa-lg" />
                        </a>

                        <a href="#!" className="text-white">
                          <i className="fab fa-twitter fa-lg mx-4 px-2" />
                        </a>

                        <a href="#!" className="text-white">
                          <i className="fab fa-google fa-lg" />
                        </a>

                      </div>

                    </div>

                  </form>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}