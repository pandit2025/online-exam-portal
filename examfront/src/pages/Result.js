import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function Result() {

  const [results, setResults] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const email = localStorage.getItem("userEmail");

    if (!email) {
      setLoading(false);
      return;
    }

    // Fetch Results
    axios
      .get(API_URL + "/result")
      .then((resultResponse) => {

        console.log("All Results:", resultResponse.data);

        const myResults = resultResponse.data.filter(
          (result) =>
            result.email.toLowerCase() ===
            email.toLowerCase()
        );

        setResults(myResults);

        // Fetch Tests
        return axios.get(API_URL + "/test");
      })
      .then((testResponse) => {

        console.log("All Tests:", testResponse.data);

        setTests(testResponse.data);

        setLoading(false);
      })
      .catch((error) => {

        console.log("Result Error:", error);

        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading Result...</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <h1 className="text-center display-5 mb-4">
        My Result
      </h1>

      {results.length === 0 ? (

        <div className="alert alert-info text-center">
          No Result Available
        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-light">

              <tr>
                <th>Test No</th>
                <th>Total Questions</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
                <th>Percentage</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {results.map((result) => {

                // Find test details
                const test = tests.find(
                  (item) =>
                    Number(item.testno) ===
                    Number(result.testno)
                );

                const totalQuestions = test
                  ? Number(test.numque)
                  : 0;

                const totalMarks =
                  Number(result.totalmarks);

                const obtainedMarks =
                  Number(result.obtainedmarks);

                // Percentage
                const percentage =
                  totalMarks > 0
                    ? (
                        (obtainedMarks /
                          totalMarks) *
                        100
                      ).toFixed(2)
                    : 0;

                // Correct answers
                const correctAnswers =
                  totalQuestions > 0 &&
                  totalMarks > 0
                    ? Math.round(
                        (obtainedMarks /
                          totalMarks) *
                          totalQuestions
                      )
                    : 0;

                // Wrong answers
                const wrongAnswers =
                  totalQuestions -
                  correctAnswers;

                return (

                  <tr key={result._id}>

                    <td>
                      {result.testno}
                    </td>

                    <td>
                      {totalQuestions}
                    </td>

                    <td>
                      {totalMarks}
                    </td>

                    <td>
                      {obtainedMarks}
                    </td>

                    <td>
                      {percentage}%
                    </td>

                    <td>
                      <span className="badge bg-success">
                        {correctAnswers}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-danger">
                        {wrongAnswers}
                      </span>
                    </td>

                    <td>

                      <span
                        className={
                          result.status === "Pass"
                            ? "badge bg-success"
                            : "badge bg-danger"
                        }
                      >
                        {result.status}
                      </span>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}