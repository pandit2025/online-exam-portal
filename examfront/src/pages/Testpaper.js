import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../config";

export default function Testpaper() {
  const { testno } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [startTest, setStartTest] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // =========================
  // FETCH TEST DETAILS
  // =========================

  useEffect(() => {
    axios
      .get(API_URL + "/test/" + testno)
      .then((response) => {
        console.log("Test Details:", response.data);

        if (response.data.length > 0) {
          setTest(response.data[0]);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Test Details Error:", error);
        setLoading(false);
      });
  }, [testno]);

  // =========================
  // FETCH QUESTIONS
  // =========================

  useEffect(() => {
    if (!test) {
      return;
    }

    axios
      .get(API_URL + "/question")
      .then((response) => {
        console.log("All Questions:", response.data);

        // Test category नुसार questions filter
        const categoryQuestions = response.data.filter(
          (question) =>
            question.category.toLowerCase() ===
            test.category.toLowerCase()
        );

        console.log(
          "Category Questions:",
          categoryQuestions
        );

        // Test ला लागणारे questions
        const selectedQuestions = categoryQuestions.slice(
          0,
          Number(test.numque)
        );

        console.log(
          "Selected Questions:",
          selectedQuestions
        );

        setQuestions(selectedQuestions);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Question Fetch Error:", error);
        setLoading(false);
      });
  }, [test]);

  // =========================
  // SELECT ANSWER
  // =========================

  function handleAnswer(answer) {
    const questionNumber =
      questions[currentQuestion].questionno;

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionNumber]: answer,
    }));
  }

  // =========================
  // NEXT QUESTION
  // =========================

  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  // =========================
  // PREVIOUS QUESTION
  // =========================

  function handlePrevious() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  // =========================
  // SUBMIT TEST
  // =========================

  async function handleSubmit() {
    const email = localStorage.getItem("userEmail");

    // Check login
    if (!email) {
      alert(
        "User email not found. Please login again."
      );

      navigate("/login");
      return;
    }

    // Check unanswered questions
    const unansweredQuestions = questions.filter(
      (question) =>
        !answers[question.questionno]
    );

    if (unansweredQuestions.length > 0) {
      alert(
        "Please answer all questions before submitting the test."
      );

      return;
    }

    setSubmitting(true);

    try {
      // ==================================
      // STEP 1: SAVE ALL STUDENT ANSWERS
      // ==================================

      for (const question of questions) {
        const answerData = {
          email: email,
          testno: Number(testno),
          queno: question.questionno,
          ansgiven:
            answers[question.questionno],
        };

        console.log(
          "Saving Answer:",
          answerData
        );

        await axios.post(
          API_URL + "/testanswer",
          answerData
        );
      }

      // ==================================
      // STEP 2: CHECK CORRECT ANSWERS
      // ==================================

      let correctAnswers = 0;

      questions.forEach((question) => {
        const studentAnswer =
          answers[question.questionno];

        const correctAnswer = question.ans;

        console.log(
          "Question:",
          question.questionno
        );

        console.log(
          "Student Answer:",
          studentAnswer
        );

        console.log(
          "Correct Answer:",
          correctAnswer
        );

        if (
          studentAnswer.trim().toLowerCase() ===
          correctAnswer.trim().toLowerCase()
        ) {
          correctAnswers++;
        }
      });

      console.log(
        "Correct Answers:",
        correctAnswers
      );

      // ==================================
      // STEP 3: CALCULATE MARKS
      // ==================================

      const totalMarks = Number(test.marks);

      const totalQuestions =
        Number(test.numque);

      const marksPerQuestion =
        totalMarks / totalQuestions;

      const obtainedMarks =
        correctAnswers * marksPerQuestion;

      // Round marks
      const finalObtainedMarks =
        Number(obtainedMarks.toFixed(2));

      // ==================================
      // STEP 4: CALCULATE PERCENTAGE
      // ==================================

      const percentage =
        (finalObtainedMarks / totalMarks) * 100;

      const finalPercentage =
        Number(percentage.toFixed(2));

      // ==================================
      // STEP 5: PASS / FAIL
      // ==================================

      let status = "";

      if (finalPercentage >= 40) {
        status = "Pass";
      } else {
        status = "Fail";
      }

      console.log(
        "Total Marks:",
        totalMarks
      );

      console.log(
        "Obtained Marks:",
        finalObtainedMarks
      );

      console.log(
        "Percentage:",
        finalPercentage
      );

      console.log(
        "Status:",
        status
      );

      // ==================================
      // STEP 6: CREATE RESULT DATA
      // ==================================

      const resultData = {
        email: email,
        testno: Number(testno),
        totalmarks: totalMarks,
        obtainedmarks: finalObtainedMarks,
        status: status,
      };

      console.log(
        "Final Result Data:",
        resultData
      );

      // ==================================
      // STEP 7: SAVE RESULT IN MONGODB
      // ==================================

      const resultResponse = await axios.post(
        API_URL + "/result",
        resultData
      );

      console.log(
        "Result Response:",
        resultResponse.data
      );

      // ==================================
      // STEP 8: SHOW RESULT MESSAGE
      // ==================================

      alert(
        "Test Submitted Successfully!\n\n" +
        "Correct Answers: " +
        correctAnswers +
        "/" +
        totalQuestions +
        "\n" +
        "Obtained Marks: " +
        finalObtainedMarks +
        "/" +
        totalMarks +
        "\n" +
        "Percentage: " +
        finalPercentage +
        "%\n" +
        "Status: " +
        status
      );

      // ==================================
      // STEP 9: GO TO RESULT PAGE
      // ==================================

      navigate("/result");

    } catch (error) {
      console.log(
        "Submit Test Error:",
        error
      );

      if (error.response) {
        console.log(
          "Backend Error:",
          error.response.data
        );

        alert(
          error.response.data.message ||
          "Unable to submit test."
        );
      } else {
        alert(
          "Unable to connect to backend."
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading Test...</h3>
      </div>
    );
  }

  // =========================
  // TEST NOT FOUND
  // =========================

  if (!test) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger">
          <h3>Test Not Found</h3>
        </div>
      </div>
    );
  }

  // =========================
  // NOT ENOUGH QUESTIONS
  // =========================

  if (
    questions.length <
    Number(test.numque)
  ) {
    return (
      <div className="container text-center mt-5">

        <div className="alert alert-danger">

          <h4>
            Not Enough Questions
          </h4>

          <p>
            This test requires{" "}
            <strong>{test.numque}</strong>{" "}
            questions.
          </p>

          <p>
            Available questions:{" "}
            <strong>
              {questions.length}
            </strong>
          </p>

          <p>
            Category:{" "}
            <strong>
              {test.category}
            </strong>
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // START TEST SCREEN
  // =========================

  if (!startTest) {
    return (
      <div className="container mt-5">

        <div className="card shadow">

          <div className="card-body text-center p-5">

            <h1 className="mb-4">
              Online Exam
            </h1>

            <h3 className="mb-4">
              Test No: {test.testno}
            </h3>

            <p className="fs-5">
              Category:{" "}
              <strong>
                {test.category}
              </strong>
            </p>

            <p className="fs-5">
              Number of Questions:{" "}
              <strong>
                {test.numque}
              </strong>
            </p>

            <p className="fs-5">
              Total Marks:{" "}
              <strong>
                {test.marks}
              </strong>
            </p>

            <hr />

            <p className="text-muted">
              Read each question carefully
              and select the correct answer.
            </p>

            <button
              className="btn btn-success btn-lg mt-3"
              onClick={() =>
                setStartTest(true)
              }
            >
              START TEST
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =========================
  // CURRENT QUESTION
  // =========================

  const question =
    questions[currentQuestion];

  const selectedAnswer =
    answers[question.questionno] || "";

  // =========================
  // TEST PAPER
  // =========================

  return (
    <div className="container mt-4">

      <h1 className="text-center mb-4">
        Test Paper
      </h1>

      <div className="card shadow">

        <div className="card-body">

          {/* Test Information */}

          <div className="d-flex justify-content-between mb-4">

            <h5>
              Test No: {test.testno}
            </h5>

            <h5>
              Question{" "}
              {currentQuestion + 1}{" "}
              of{" "}
              {questions.length}
            </h5>

          </div>

          <hr />

          {/* Question */}

          <h4 className="mb-4">

            Q{currentQuestion + 1}.{" "}

            {question.questiondet}

          </h4>

          {/* Option 1 */}

          <div className="form-check mb-3">

            <input
              className="form-check-input"
              type="radio"
              name={
                "question-" +
                question.questionno
              }
              value={question.op1}
              checked={
                selectedAnswer ===
                question.op1
              }
              onChange={() =>
                handleAnswer(
                  question.op1
                )
              }
            />

            <label className="form-check-label">
              {question.op1}
            </label>

          </div>

          {/* Option 2 */}

          <div className="form-check mb-3">

            <input
              className="form-check-input"
              type="radio"
              name={
                "question-" +
                question.questionno
              }
              value={question.op2}
              checked={
                selectedAnswer ===
                question.op2
              }
              onChange={() =>
                handleAnswer(
                  question.op2
                )
              }
            />

            <label className="form-check-label">
              {question.op2}
            </label>

          </div>

          {/* Option 3 */}

          <div className="form-check mb-3">

            <input
              className="form-check-input"
              type="radio"
              name={
                "question-" +
                question.questionno
              }
              value={question.op3}
              checked={
                selectedAnswer ===
                question.op3
              }
              onChange={() =>
                handleAnswer(
                  question.op3
                )
              }
            />

            <label className="form-check-label">
              {question.op3}
            </label>

          </div>

          {/* Option 4 */}

          <div className="form-check mb-3">

            <input
              className="form-check-input"
              type="radio"
              name={
                "question-" +
                question.questionno
              }
              value={question.op4}
              checked={
                selectedAnswer ===
                question.op4
              }
              onChange={() =>
                handleAnswer(
                  question.op4
                )
              }
            />

            <label className="form-check-label">
              {question.op4}
            </label>

          </div>

          <hr />

          {/* Buttons */}

          <div className="d-flex justify-content-between mt-4">

            {/* Previous */}

            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={
                currentQuestion === 0
              }
            >
              Previous
            </button>

            {/* Next / Submit */}

            {currentQuestion ===
            questions.length - 1 ? (

              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Test"}
              </button>

            ) : (

              <button
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next
              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}