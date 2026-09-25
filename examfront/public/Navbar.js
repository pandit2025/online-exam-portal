import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );

  useEffect(() => {
    function checkUserLogin() {
      setIsLoggedIn(
        localStorage.getItem("isLoggedIn") === "true"
      );
    }

    function checkAdminLogin() {
      setIsAdminLoggedIn(
        localStorage.getItem("isAdminLoggedIn") === "true"
      );
    }

    window.addEventListener(
      "loginStatusChanged",
      checkUserLogin
    );

    window.addEventListener(
      "adminLoginStatusChanged",
      checkAdminLogin
    );

    return () => {
      window.removeEventListener(
        "loginStatusChanged",
        checkUserLogin
      );

      window.removeEventListener(
        "adminLoginStatusChanged",
        checkAdminLogin
      );
    };
  }, []);

  function handleUserLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    setIsLoggedIn(false);

    navigate("/");
  }

  function handleAdminLogout() {
    localStorage.removeItem("isAdminLoggedIn");

    setIsAdminLoggedIn(false);

    navigate("/");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/">
            Online Exam Portal
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarNav"
          >

            <ul className="navbar-nav">

              {/* ================= ADMIN NAVBAR ================= */}

              {isAdminLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/addcategory"
                    >
                      Add Category
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/addquestions"
                    >
                      Add Questions
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/preparetest"
                    >
                      Prepare Test
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/adminresult"
                    >
                      Result
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/contactdetails"
                    >
                      Contact Details
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleAdminLogout}
                    >
                      Log out
                    </button>
                  </li>
                </>
              ) : isLoggedIn ? (

                /* ================= STUDENT NAVBAR ================= */

                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/tests"
                    >
                      Test
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/appeartest"
                    >
                      Appear Test
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/result"
                    >
                      Result
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleUserLogout}
                    >
                      Log out
                    </button>
                  </li>
                </>

              ) : (

                /* ================= BEFORE LOGIN ================= */

                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/services"
                    >
                      Services
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/contact"
                    >
                      Contact Us
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>

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

      <Outlet />
    </div>
  );
}