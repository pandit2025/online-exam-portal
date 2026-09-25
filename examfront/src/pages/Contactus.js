import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config";
import "./Contactus.css";

export default function Contactus() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(API_URL + "/contact", {
        name: name,
        email: email,
        contact: contact,
        message: message
      })
      .then((response) => {

        alert(response.data.message);

        // Clear form after successful submission
        setName("");
        setEmail("");
        setContact("");
        setMessage("");

      })
      .catch((error) => {

        console.log("Contact Error:", error);

        if (error.response) {
          alert(
            error.response.data.message ||
            "Contact submission failed"
          );
        } else {
          alert("Unable to connect to backend");
        }

      });
  }

  return (
    <div className="contact3 py-5">

      <div className="row no-gutters">

        <div className="container">

          <div className="row">

            {/* =========================
                LEFT IMAGE
            ========================= */}

            <div className="col-lg-6">

              <div className="card-shadow">

                <img
                  src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxjYWxsfGVufDB8MHx8fDE3MjEwMzg4OTV8MA&ixlib=rb-4.0.3&q=80&w=1080"
                  className="img-fluid"
                  alt="Contact"
                />

              </div>

            </div>


            {/* =========================
                CONTACT FORM
            ========================= */}

            <div className="col-lg-6">

              <div className="contact-box ml-3">

                <h1 className="font-weight-light mt-2">
                  Quick Contact
                </h1>

                <form
                  className="mt-4"
                  onSubmit={handleSubmit}
                >

                  <div className="row">

                    {/* NAME */}

                    <div className="col-lg-12">

                      <div className="form-group mt-2">

                        <input
                          className="form-control"
                          type="text"
                          placeholder="Name"
                          value={name}
                          onChange={(e) =>
                            setName(e.target.value)
                          }
                          required
                        />

                      </div>

                    </div>


                    {/* EMAIL */}

                    <div className="col-lg-12">

                      <div className="form-group mt-2">

                        <input
                          className="form-control"
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          required
                        />

                      </div>

                    </div>


                    {/* PHONE */}

                    <div className="col-lg-12">

                      <div className="form-group mt-2">

                        <input
                          className="form-control"
                          type="text"
                          placeholder="Phone"
                          value={contact}
                          onChange={(e) =>
                            setContact(e.target.value)
                          }
                          required
                        />

                      </div>

                    </div>


                    {/* MESSAGE */}

                    <div className="col-lg-12">

                      <div className="form-group mt-2">

                        <textarea
                          className="form-control"
                          rows={3}
                          placeholder="Message"
                          value={message}
                          onChange={(e) =>
                            setMessage(e.target.value)
                          }
                          required
                        />

                      </div>

                    </div>


                    {/* SUBMIT BUTTON */}

                    <div className="col-lg-12">

                      <button
                        type="submit"
                        className="btn btn-danger-gradiant mt-3 text-white border-0 px-3 py-2"
                      >
                        <span>SUBMIT</span>
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>


            {/* =========================
                CONTACT DETAILS
            ========================= */}

            <div className="col-lg-12">

              <div className="card mt-4 border-0 mb-4">

                <div className="row">


                  {/* =========================
                      ADDRESS
                  ========================= */}

                  <div className="col-lg-4 col-md-4">

                    <div className="card-body d-flex align-items-center c-detail pl-0">

                      <div className="contact-icon">

                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>

                      </div>

                      <div>

                        <h6 className="font-weight-medium">
                          Address
                        </h6>

                        <p>
                          601 Sherwood Ave.
                          <br />
                          San Bernandino
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* =========================
                      PHONE
                  ========================= */}

                  <div className="col-lg-4 col-md-4">

                    <div className="card-body d-flex align-items-center c-detail">

                      <div className="contact-icon">

                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.15 5.18 2 2 0 0 1 5.15 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.13 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>

                      </div>

                      <div>

                        <h6 className="font-weight-medium">
                          Phone
                        </h6>

                        <p>
                          251 546 9442
                          <br />
                          630 446 8851
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* =========================
                      EMAIL
                  ========================= */}

                  <div className="col-lg-4 col-md-4">

                    <div className="card-body d-flex align-items-center c-detail">

                      <div className="contact-icon">

                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                          />

                          <polyline points="3,7 12,13 21,7" />

                        </svg>

                      </div>

                      <div>

                        <h6 className="font-weight-medium">
                          Email
                        </h6>

                        <p>
                          info@wrappixel.com
                          <br />
                          123@wrappixel.com
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}