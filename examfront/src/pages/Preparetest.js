import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function Preparetest() {

  const [testno, setTestno] = useState("");
  const [numque, setNumque] = useState("");
  const [marks, setMarks] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [tests, setTests] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editTestNo, setEditTestNo] = useState("");


  // Fetch categories and tests
  useEffect(() => {

    fetchCategories();
    fetchTests();

  }, []);


  function fetchCategories() {

    axios
      .get(API_URL + "/category")
      .then((response) => {

        setCategories(response.data);

      })
      .catch((error) => {

        console.log("Category Fetch Error:", error);

      });

  }


  function fetchTests() {

    axios
      .get(API_URL + "/test")
      .then((response) => {

        setTests(response.data);

      })
      .catch((error) => {

        console.log("Test Fetch Error:", error);

      });

  }


  // Create / Update Test
  function handleSubmit(e) {

    e.preventDefault();

    const testData = {
      testno: Number(testno),
      numque: Number(numque),
      marks: Number(marks),
      category: category
    };


    // Update
    if (editMode) {

      axios
        .put(API_URL + "/test/" + editTestNo, {
          numque: Number(numque),
          marks: Number(marks),
          category: category
        })
        .then((response) => {

          alert(response.data.message);

          resetForm();
          fetchTests();

        })
        .catch((error) => {

          console.log("Update Test Error:", error);

          alert(
            error.response?.data?.message ||
            "Test could not be updated"
          );

        });

    }

    // Create
    else {

      axios
        .post(API_URL + "/test", testData)
        .then((response) => {

          alert(response.data.message);

          resetForm();
          fetchTests();

        })
        .catch((error) => {

          console.log("Create Test Error:", error);

          alert(
            error.response?.data?.message ||
            "Test could not be created"
          );

        });

    }

  }


  // Edit test
  function handleEdit(test) {

    setEditMode(true);

    setEditTestNo(test.testno);

    setTestno(test.testno);
    setNumque(test.numque);
    setMarks(test.marks);
    setCategory(test.category);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  // Delete test
  function handleDelete(testno) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test?"
    );

    if (!confirmDelete) {
      return;
    }


    axios
      .delete(API_URL + "/test/" + testno)
      .then((response) => {

        alert(response.data.message);

        fetchTests();

      })
      .catch((error) => {

        console.log("Delete Test Error:", error);

        alert(
          error.response?.data?.message ||
          "Test could not be deleted"
        );

      });

  }


  // Add Questions button
  function handleAddQuestions(test) {

    alert(
      "Add Questions for Test " +
      test.testno +
      " (" +
      test.category +
      ")"
    );

  }


  // Reset form
  function resetForm() {

    setTestno("");
    setNumque("");
    setMarks("");
    setCategory("");

    setEditMode(false);
    setEditTestNo("");

  }


  return (
    <div className="container py-4">

      {/* Heading */}
      <h1 className="text-center display-5 mb-4">
        Prepare Test Here
      </h1>


      {/* Test Form */}
      <form onSubmit={handleSubmit}>

        {/* Test No */}
        <div className="mb-3">

          <label className="form-label">
            Test No
          </label>

          <input
            type="number"
            className="form-control"
            placeholder="Category Number"
            value={testno}
            onChange={(e) => setTestno(e.target.value)}
            disabled={editMode}
            required
          />

        </div>


        {/* Number Questions */}
        <div className="mb-3">

          <label className="form-label">
            Number Questions
          </label>

          <input
            type="number"
            className="form-control"
            placeholder="Number Questions"
            value={numque}
            onChange={(e) => setNumque(e.target.value)}
            min="1"
            required
          />

        </div>


        {/* Marks */}
        <div className="mb-3">

          <label className="form-label">
            Marks
          </label>

          <input
            type="number"
            className="form-control"
            placeholder="Marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            min="1"
            required
          />

        </div>


        {/* Category */}
        <div className="mb-3">

          <label className="form-label">
            Category
          </label>

          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >

            <option value="">
              --Select Category--
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


        {/* Buttons */}
        <button
          type="submit"
          className="btn btn-primary me-2"
        >
          {editMode ? "Update" : "Submit"}
        </button>


        {editMode && (

          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Cancel
          </button>

        )}

      </form>


      {/* Available Tests */}
      <h1 className="text-center display-5 mt-4 mb-3">
        Available Tests
      </h1>


      {tests.length === 0 ? (

        <div className="alert alert-info text-center">
          No tests available.
        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-light">

              <tr>

                <th>Test No</th>

                <th>Number of Questions</th>

                <th>Marks</th>

                <th>Category</th>

                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {tests.map((test) => (

                <tr key={test._id}>

                  <td>
                    {test.testno}
                  </td>

                  <td>
                    {test.numque}
                  </td>

                  <td>
                    {test.marks}
                  </td>

                  <td>
                    {test.category}
                  </td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() =>
                        handleDelete(test.testno)
                      }
                    >
                      Delete
                    </button>


                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        handleEdit(test)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() =>
                        handleAddQuestions(test)
                      }
                    >
                      Add Questions
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}