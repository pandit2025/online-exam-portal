
import React from 'react'

export default function Services() {
  return (
    <div className="container py-4">

      <h1 className="text-center display-5 mb-2">
        Our Services
      </h1>

      <p className="text-center text-muted mb-5">
        Explore the features of our Online Exam Portal
      </p>

      <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">

        {/* Quiz Card */}
        <div className="col">
          <div className="card h-100 shadow-sm border">
            <div className="card-body text-center p-4">

              <div className="mb-3">
                <i className="bi bi-journal-check text-primary"
                   style={{ fontSize: "45px" }}></i>
              </div>

              <h4 className="card-title mb-3">
                Online Quiz
              </h4>

              <p className="card-text text-muted">
                Students can attempt online tests with multiple-choice
                questions from different categories. The portal provides
                an easy and convenient way to practice and improve
                their knowledge.
              </p>

            </div>
          </div>
        </div>

        {/* Result Card */}
        <div className="col">
          <div className="card h-100 shadow-sm border">
            <div className="card-body text-center p-4">

              <div className="mb-3">
                <i className="bi bi-clipboard-data text-success"
                   style={{ fontSize: "45px" }}></i>
              </div>

              <h4 className="card-title mb-3">
                Instant Result
              </h4>

              <p className="card-text text-muted">
                Students can view their test results immediately
                after completing the exam. The result displays
                obtained marks and correct answers, helping students
                understand their performance.
              </p>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}