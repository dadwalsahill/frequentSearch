// Page.js
import React from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

const Page = () => {
  const location = useLocation();
  const formData = location.state.formData;

  return (
    <div className="page-container">
      <h1>Registration Details</h1>
      {formData ? (
        <div className="details-container">
          <div className="section">
            <h3>Basic Details</h3>
            <p>
              <strong>First Name:</strong> {formData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
          </div>

          <div className="section">
            <h3>Location</h3>
            <p>
              <strong>Country:</strong> {formData.country}
            </p>
            <p>
              <strong>State:</strong> {formData.state}
            </p>
            <p>
              <strong>City:</strong> {formData.city}
            </p>
          </div>

          <div className="section">
            <h3>Personal Information</h3>
            <p>
              <strong>Gender:</strong> {formData.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong> {formData.dob}
            </p>
            <p>
              <strong>Age:</strong> {formData.age}
            </p>
          </div>
        </div>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default Page;
