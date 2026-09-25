import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function AdminResult() {

  const [results, setResults] = useState([]);
  const [tests, setTests] = useState([]);

  const [searchEmail, setSearchEmail] = useState("");
  const [selectedTest, setSelectedTest] = useState("All");

  const [loading, setLoading] = useState(true);


  // ===============================
  // FETCH RESULTS
  // ===============================

  function fetchResults() {

    setLoading(true);

    axios
      .get(API_URL + "/result")
      .then((resultResponse) => {

        console.log(
          "All Student Results:",
          resultResponse.data
        );

        setResults(resultResponse.data);

        return axios.get(API_URL + "/test");

      })
      .then((testResponse) => {

        console.log(
          "All Tests:",
          testResponse.data
        );

        setTests(testResponse.data);

        setLoading(false);

      })
      .catch((error) => {

        console.log(
          "Admin Result Error:",
          error
        );

        setLoading(false);

      });
  }


  // ===============================
  // LOAD DATA
  // ===============================

  useEffect(() => {

    fetchResults();

  }, []);


  // ===============================
  // DELETE RESULT
  // ===============================

  function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmDelete) {
      return;
    }


    axios
      .delete(API_URL + "/result/" + id)

      .then((response) => {

        alert(response.data.message);

        fetchResults();

      })

      .catch((error) => {

        console.log(
          "Delete Result Error:",
          error
        );

        alert(
          error.response?.data?.message ||
          "Result could not be deleted."
        );

      });
  }


  // ===============================
  // FILTER RESULTS
  // ===============================

  const filteredResults = results.filter(
    (result) => {

      // EMAIL FILTER

      const emailMatch =
        result.email
          .toLowerCase()
          .includes(
            searchEmail.toLowerCase()
          );


      // TEST FILTER

      const testMatch =
        selectedTest === "All" ||
        Number(result.testno) ===
        Number(selectedTest);


      return emailMatch && testMatch;

    }
  );


  // ===============================
  // RESET FILTER
  // ===============================

  function handleReset() {

    setSearchEmail("");

    setSelectedTest("All");

  }


  // ===============================
  // LOADING
  // ===============================

  if (loading) {

    return (
      <div className="container text-center mt-5">

        <div className="spinner-border text-primary"></div>

        <h4 className="mt-3">
          Loading Results...
        </h4>

      </div>
    );

  }


  // ===============================
  // PAGE
  // ===============================

  return (

    <div className="container py-5">

      {/* PAGE TITLE */}

      <div className="text-center mb-4">

        <h1 className="display-5">
           Result Details
        </h1>

        

      </div>


      {/* FILTER CARD */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-3">


            {/* EMAIL SEARCH */}

            <div className="col-md-5">

              <label className="form-label fw-bold">
                Search Student Email
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter student email"
                value={searchEmail}
                onChange={(e) =>
                  setSearchEmail(e.target.value)
                }
              />

            </div>


            {/* TEST FILTER */}

            <div className="col-md-4">

              <label className="form-label fw-bold">
                Select Test
              </label>

              <select
                className="form-select"
                value={selectedTest}
                onChange={(e) =>
                  setSelectedTest(e.target.value)
                }
              >

                <option value="All">
                  All Tests
                </option>

                {tests.map((test) => (

                  <option
                    key={test._id}
                    value={test.testno}
                  >
                    Test {test.testno} - {test.category}
                  </option>

                ))}

              </select>

            </div>


            {/* RESET */}

            <div className="col-md-3 d-flex align-items-end">

              <button
                className="btn btn-secondary w-100"
                onClick={handleReset}
              >
                Reset Filter
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* RESULT COUNT */}

      <div className="mb-3">

        <strong>
          Results Found: {filteredResults.length}
        </strong>

      </div>


      {/* RESULTS TABLE */}

      {filteredResults.length === 0 ? (

        <div className="alert alert-info text-center">

          No Student Results Found

        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-primary">

              <tr>

                <th>Student Email</th>

                <th>Test No</th>

                <th>Category</th>

                <th>Total Questions</th>

                <th>Total Marks</th>

                <th>Obtained Marks</th>

                <th>Percentage</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {filteredResults.map(
                (result) => {

                  const test =
                    tests.find(
                      (item) =>
                        Number(item.testno) ===
                        Number(result.testno)
                    );


                  const totalQuestions =
                    test
                      ? Number(test.numque)
                      : 0;


                  const category =
                    test
                      ? test.category
                      : "-";


                  const totalMarks =
                    Number(
                      result.totalmarks
                    );


                  const obtainedMarks =
                    Number(
                      result.obtainedmarks
                    );


                  const percentage =
                    totalMarks > 0
                      ? (
                          (obtainedMarks /
                            totalMarks) *
                          100
                        ).toFixed(2)
                      : 0;


                  return (

                    <tr key={result._id}>

                      {/* EMAIL */}

                      <td>
                        {result.email}
                      </td>


                      {/* TEST */}

                      <td>
                        {result.testno}
                      </td>


                      {/* CATEGORY */}

                      <td>
                        {category}
                      </td>


                      {/* QUESTIONS */}

                      <td>
                        {totalQuestions}
                      </td>


                      {/* TOTAL MARKS */}

                      <td>
                        {totalMarks}
                      </td>


                      {/* OBTAINED */}

                      <td>
                        {obtainedMarks}
                      </td>


                      {/* PERCENTAGE */}

                      <td>
                        {percentage}%
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            result.status ===
                            "Pass"
                              ? "badge bg-success"
                              : "badge bg-danger"
                          }
                        >
                          {result.status}
                        </span>

                      </td>


                      {/* DELETE */}

                      <td>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(
                              result._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}