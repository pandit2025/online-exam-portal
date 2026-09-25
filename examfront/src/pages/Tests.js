import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function Tests() {

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get(API_URL + "/test")
      .then((response) => {
        console.log("Tests:", response.data);
        setTests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Test Fetch Error:", error);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary"></div>
        <h5 className="mt-3">Loading Tests...</h5>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Header */}

      <div className="text-center mb-5">

        <h1 className="fw-bold display-5">
          Available Tests
        </h1>

        <p className="text-muted fs-5">
          Explore the available online examinations
        </p>

      </div>

      {/* No Tests */}

      {tests.length === 0 ? (

        <div className="alert alert-info text-center shadow-sm">
          No Tests Available
        </div>

      ) : (

        <div className="row g-4 justify-content-center">

          {tests.map((test) => (

            <div
              className="col-xl-4 col-lg-4 col-md-6 col-sm-10"
              key={test._id}
            >

              <div
                className="card h-100 border-0 shadow"
                style={{
                  borderRadius: "18px",
                  overflow: "hidden"
                }}
              >

                {/* Card Header */}

                <div
                  className="bg-primary text-white text-center py-4"
                >

                  <div
                    className="mx-auto mb-2 d-flex align-items-center justify-content-center"
                    style={{
                      width: "65px",
                      height: "65px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      fontSize: "25px",
                      fontWeight: "bold"
                    }}
                  >
                    {test.testno}
                  </div>

                  <h4 className="mb-0">
                    Test {test.testno}
                  </h4>

                </div>

                {/* Card Body */}

                <div className="card-body p-4">

                  <div className="text-center mb-4">

                    <span className="badge bg-light text-primary border px-3 py-2 fs-6">
                      {test.category}
                    </span>

                  </div>

                  {/* Questions */}

                  <div className="d-flex justify-content-between align-items-center border-bottom py-3">

                    <span className="text-muted">
                      Number of Questions
                    </span>

                    <strong>
                      {test.numque}
                    </strong>

                  </div>

                  {/* Marks */}

                  <div className="d-flex justify-content-between align-items-center border-bottom py-3">

                    <span className="text-muted">
                      Total Marks
                    </span>

                    <strong>
                      {test.marks}
                    </strong>

                  </div>

                  {/* Type */}

                  <div className="d-flex justify-content-between align-items-center py-3">

                    <span className="text-muted">
                      Test Type
                    </span>

                    <span className="badge bg-success">
                      Online
                    </span>

                  </div>

                </div>

                {/* Footer */}

                <div className="card-footer bg-white border-0 text-center pb-4">

                  <div className="text-muted small">
                    Go to <strong>Appear Test</strong> to start this examination.
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}