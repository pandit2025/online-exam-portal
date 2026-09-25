import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function Contactdetails() {

  const [contacts, setContacts] = useState([]);

  // Fetch Contact Details
  useEffect(() => {

    axios
      .get(API_URL + "/contact")
      .then((response) => {

        setContacts(response.data);

      })
      .catch((error) => {

        console.log("Contact Details Error:", error);

      });

  }, []);


  return (
    <div className="container py-4">

      <h1 className="text-center display-5 mb-4">
        Contact Details
      </h1>

      {contacts.length === 0 ? (

        <div className="alert alert-info text-center">
          No Contact Details Available
        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-light">

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Message</th>
              </tr>

            </thead>

            <tbody>

              {contacts.map((contact) => (

                <tr key={contact._id}>

                  <td>
                    {contact.name}
                  </td>

                  <td>
                    {contact.email}
                  </td>

                  <td>
                    {contact.phone || contact.contact}
                  </td>

                  <td>
                    {contact.message}
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