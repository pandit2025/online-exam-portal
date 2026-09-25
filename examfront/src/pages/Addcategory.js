import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function Addcategory() {

  const [catno, setCatno] = useState("");
  const [catname, setCatname] = useState("");

  function handleSubmit(e) {

    e.preventDefault();

    axios
      .post(API_URL + "/category", {
        catno: Number(catno),
        catname: catname
      })
      .then((response) => {

        alert(response.data.message);

        setCatno("");
        setCatname("");

      })
      .catch((error) => {

        console.log("Category Error:", error);

        if (error.response) {

          alert(
            error.response.data.message ||
            "Category could not be added"
          );

        } else {

          alert("Unable to connect to backend");

        }

      });
  }

  return (
    <div className="container py-5">

      <h1 className="text-center display-5 mb-4">
        Add Category
      </h1>

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <form onSubmit={handleSubmit}>

              {/* Category Number */}
              <div className="mb-3">

                <label
                  htmlFor="catno"
                  className="form-label"
                >
                  Category Number
                </label>

                <input
                  type="number"
                  className="form-control"
                  id="catno"
                  value={catno}
                  onChange={(e) => setCatno(e.target.value)}
                  placeholder="Enter category number"
                  required
                />

              </div>


              {/* Category Name */}
              <div className="mb-3">

                <label
                  htmlFor="catname"
                  className="form-label"
                >
                  Category Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="catname"
                  value={catname}
                  onChange={(e) => setCatname(e.target.value)}
                  placeholder="Enter category name"
                  required
                />

              </div>


              {/* Submit Button */}
              <div className="d-grid">

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                >
                  Add Category
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}