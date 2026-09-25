import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

export default function Appeartest() {

  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get(API_URL + "/test")
      .then((response) => {

        console.log("Tests for Exam:", response.data);

        setTests(response.data);
        setLoading(false);

      })
      .catch((error) => {

        console.log(
          "Appear Test Error:",
          error
        );

        setLoading(false);

      });

  }, []);

  function handleStartTest(testno) {

    navigate("/testpaper/" + testno);

  }

  if (loading) {

    return (
      <div className="container text-center mt-5">
        <h3>Loading Exams...</h3>
      </div>
    );

  }

  return (

    <div className="container py-5">

      <h1 className="text-center display-5 mb-2">
        Appear Test
      </h1>

      <p className="text-center text-muted mb-5">
        Select a test and start your examination
      </p>

      {tests.length === 0 ? (

        <div className="alert alert-info text-center">
          No Tests Available
        </div>

      ) : (

        <div className="row justify-content-center">

          {tests.map((test) => (

            <div
              className="col-lg-4 col-md-6 col-sm-10 mb-4"
              key={test._id}
            >

              <div className="card shadow h-100">

                <div className="card-body text-center p-4">

                  <div className="mb-3">

                    <span className="badge bg-primary fs-6">
                      Test {test.testno}
                    </span>

                  </div>

                  <h3 className="card-title mb-4">
                    {test.category}
                  </h3>

                  <div className="mb-2">
                    <strong>
                      Questions:
                    </strong>{" "}
                    {test.numque}
                  </div>

                  <div className="mb-4">
                    <strong>
                      Total Marks:
                    </strong>{" "}
                    {test.marks}
                  </div>

                  <button
                    className="btn btn-success btn-lg w-100"
                    onClick={() =>
                      handleStartTest(test.testno)
                    }
                  >
                    START TEST
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}