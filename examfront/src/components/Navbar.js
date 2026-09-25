import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  // =========================
  // USER LOGIN STATUS
  // =========================

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // =========================
  // ADMIN LOGIN STATUS
  // =========================

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  // =========================
  // CHECK LOGIN STATUS
  // =========================

  useEffect(() => {

    function checkUserLogin() {

      setIsLoggedIn(
        localStorage.getItem("isLoggedIn") === "true"
      );

    }

    function checkAdminLogin() {

      setIsAdminLoggedIn(
        localStorage.getItem("adminLoggedIn") === "true"
      );

    }

    // User login event
    window.addEventListener(
      "loginStatusChanged",
      checkUserLogin
    );

    // Admin login event
    window.addEventListener(
      "adminStatusChanged",
      checkAdminLogin
    );

    return () => {

      window.removeEventListener(
        "loginStatusChanged",
        checkUserLogin
      );

      window.removeEventListener(
        "adminStatusChanged",
        checkAdminLogin
      );

    };

  }, []);

  // =========================
  // USER LOGOUT
  // =========================

  function handleUserLogout() {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    setIsLoggedIn(false);

    navigate("/");

  }

  // =========================
  // ADMIN LOGOUT
  // =========================

  function handleAdminLogout() {

    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");

    setIsAdminLoggedIn(false);

    navigate("/");

  }

  return (

    <div>

      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

      <nav
        className="navbar navbar-expand-lg bg-primary"
        data-bs-theme="dark"
      >

        <div className="container-fluid">

          {/* Logo */}
          <Link
            className="navbar-brand"
            to="/"
          >
            Online Exam Portal
          </Link>


          {/* Mobile Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >

            <span className="navbar-toggler-icon"></span>

          </button>


          <div
            className="collapse navbar-collapse"
            id="navbarNav"
          >

            <ul className="navbar-nav">


              {/* ================================= */}
              {/* ADMIN LOGIN */}
              {/* ================================= */}

              {isAdminLoggedIn ? (

                <>

                  {/* Home */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/"
                    >
                      Home
                    </Link>

                  </li>


                  {/* Add Category */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/addcategory"
                    >
                      Add Category
                    </Link>

                  </li>


                  {/* Add Questions */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/addquestions"
                    >
                      Add Questions
                    </Link>

                  </li>


                  {/* Prepare Test */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/preparetest"
                    >
                      Prepare Test
                    </Link>

                  </li>


                  {/* Admin Result */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/adminresult"
                    >
                      Result
                    </Link>

                  </li>


                  {/* Contact Details */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/contactdetails"
                    >
                      Contact Details
                    </Link>

                  </li>


                  {/* Admin Logout */}
                  <li className="nav-item">

                    <button
                      type="button"
                      className="nav-link btn btn-link"
                      onClick={handleAdminLogout}
                      style={{
                        textDecoration: "none",
                        paddingLeft: "8px",
                        paddingRight: "8px"
                      }}
                    >
                      Log out
                    </button>

                  </li>

                </>


              ) : isLoggedIn ? (

                <>
                  
                  {/* ================================= */}
                  {/* STUDENT LOGIN */}
                  {/* ================================= */}

                  {/* Home */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/"
                    >
                      Home
                    </Link>

                  </li>


                  {/* Test */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/tests"
                    >
                      Test
                    </Link>

                  </li>


                  {/* Appear Test */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/appeartest"
                    >
                      Appear Test
                    </Link>

                  </li>


                  {/* Student Result */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/result"
                    >
                      Result
                    </Link>

                  </li>


                  {/* Student Logout */}
                  <li className="nav-item">

                    <button
                      type="button"
                      className="nav-link btn btn-link"
                      onClick={handleUserLogout}
                      style={{
                        textDecoration: "none",
                        paddingLeft: "8px",
                        paddingRight: "8px"
                      }}
                    >
                      Log out
                    </button>

                  </li>

                </>


              ) : (

                <>
                  
                  {/* ================================= */}
                  {/* BEFORE LOGIN */}
                  {/* ================================= */}

                  {/* Home */}
                  <li className="nav-item">

                    <Link
                      className="nav-link active"
                      to="/"
                    >
                      Home
                    </Link>

                  </li>


                  {/* Services */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/services"
                    >
                      Services
                    </Link>

                  </li>


                  {/* Contact */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/contact"
                    >
                      Contact Us
                    </Link>

                  </li>


                  {/* Register */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/register"
                    >
                      Register
                    </Link>

                  </li>


                  {/* Student Login */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/login"
                    >
                      Login
                    </Link>

                  </li>


                  {/* Admin Login */}
                  <li className="nav-item">

                    <Link
                      className="nav-link"
                      to="/adminlogin"
                    >
                      Admin Login
                    </Link>

                  </li>

                </>

              )}

            </ul>

          </div>

        </div>

      </nav>


      {/* ========================= */}
      {/* CHILD PAGES */}
      {/* ========================= */}

      <Outlet />

    </div>

  );

}