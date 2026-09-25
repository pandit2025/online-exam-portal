import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function Addquestions() {

  const [questionno, setQuestionno] = useState("");
  const [questiondet, setQuestiondet] = useState("");
  const [op1, setOp1] = useState("");
  const [op2, setOp2] = useState("");
  const [op3, setOp3] = useState("");
  const [op4, setOp4] = useState("");
  const [ans, setAns] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  // Fetch categories from backend
  useEffect(() => {

    axios
      .get(API_URL + "/category")
      .then((response) => {

        setCategories(response.data);

      })
      .catch((error) => {

        console.log("Category Fetch Error:", error);

      });

  }, []);


  function handleSubmit(e) {

    e.preventDefault();

    axios
      .post(API_URL + "/question", {

        questionno: Number(questionno),
        questiondet: questiondet,
        op1: op1,
        op2: op2,
        op3: op3,
        op4: op4,
        ans: ans,
        category: category

      })
      .then((response) => {

        alert(response.data.message);

        // Clear form
        setQuestionno("");
        setQuestiondet("");
        setOp1("");
        setOp2("");
        setOp3("");
        setOp4("");
        setAns("");
        setCategory("");

      })
      .catch((error) => {

        console.log("Question Error:", error);

        if (error.response) {

          alert(
            error.response.data.message ||
            "Question could not be added"
          );

        } else {

          alert("Unable to connect to backend");

        }

      });

  }


  return (
    <div className="container py-5">

      <h1 className="text-center display-5 mb-4">
        Add Question
      </h1>


      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow p-4">

            <form onSubmit={handleSubmit}>


              {/* Question Number */}
              <div className="mb-3">

                <label
                  htmlFor="questionno"
                  className="form-label"
                >
                  Question Number
                </label>

                <input
                  type="number"
                  className="form-control"
                  id="questionno"
                  value={questionno}
                  onChange={(e) =>
                    setQuestionno(e.target.value)
                  }
                  placeholder="Enter question number"
                  required
                />

              </div>


              {/* Question */}
              <div className="mb-3">

                <label
                  htmlFor="questiondet"
                  className="form-label"
                >
                  Question
                </label>

                <textarea
                  className="form-control"
                  id="questiondet"
                  rows="3"
                  value={questiondet}
                  onChange={(e) =>
                    setQuestiondet(e.target.value)
                  }
                  placeholder="Enter question"
                  required
                />

              </div>


              {/* Option 1 */}
              <div className="mb-3">

                <label
                  htmlFor="op1"
                  className="form-label"
                >
                  Option 1
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="op1"
                  value={op1}
                  onChange={(e) =>
                    setOp1(e.target.value)
                  }
                  placeholder="Enter option 1"
                  required
                />

              </div>


              {/* Option 2 */}
              <div className="mb-3">

                <label
                  htmlFor="op2"
                  className="form-label"
                >
                  Option 2
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="op2"
                  value={op2}
                  onChange={(e) =>
                    setOp2(e.target.value)
                  }
                  placeholder="Enter option 2"
                  required
                />

              </div>


              {/* Option 3 */}
              <div className="mb-3">

                <label
                  htmlFor="op3"
                  className="form-label"
                >
                  Option 3
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="op3"
                  value={op3}
                  onChange={(e) =>
                    setOp3(e.target.value)
                  }
                  placeholder="Enter option 3"
                  required
                />

              </div>


              {/* Option 4 */}
              <div className="mb-3">

                <label
                  htmlFor="op4"
                  className="form-label"
                >
                  Option 4
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="op4"
                  value={op4}
                  onChange={(e) =>
                    setOp4(e.target.value)
                  }
                  placeholder="Enter option 4"
                  required
                />

              </div>


              {/* Correct Answer */}
              <div className="mb-3">

                <label
                  htmlFor="ans"
                  className="form-label"
                >
                  Correct Answer
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="ans"
                  value={ans}
                  onChange={(e) =>
                    setAns(e.target.value)
                  }
                  placeholder="Enter correct answer"
                  required
                />

              </div>


              {/* Category */}
              <div className="mb-3">

                <label
                  htmlFor="category"
                  className="form-label"
                >
                  Category
                </label>

                <select
                  className="form-select"
                  id="category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map((cat) => (

                    <option
                      key={cat._id}
                      value={cat.catname}
                    >
                      {cat.catname}
                    </option>

                  ))}

                </select>

              </div>


              {/* Submit */}
              <div className="d-grid mt-4">

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                >
                  Add Question
                </button>

              </div>


            </form>

          </div>

        </div>

      </div>

    </div>
  );
}