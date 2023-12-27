import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import "../css/page.css";
import "../css/LoginPage.css";
// import { jwt } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
// import { userID } from "./GetUserID";
import { useEffect } from "react";

const LOCALHOST = `${API_URL}`;
// Inside the PvtBtn component

const PvtBtn = ({ eventId, onRegistration }) => {
  const [regD, setregD] = useState(null);
  const [buttonText, setButtonText] = useState("Register");
  const [buttonClass, setButtonClass] = useState("reg-btn");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [regBtnClicked, setRegBtnClicked] = useState(false);
  const [buttonIcon, setButtonIcon] = useState("bi bi-person-plus");
  axios
    .get(`${LOCALHOST}/api/events/${eventId}/registered/`)
    .then((response) => {
      const apiResponse = response.data; // Assuming the response is an array of objects
      const targetUser = 1; // The user you want to compare

      // Use the Array.prototype.some() method to check if targetUser exists in the response
      const userExistsInResponse = apiResponse.some((item) => item.user === userId);
      setregD(userExistsInResponse);
      console.log("userExistsInResponse: ", userExistsInResponse);
      console.log("regD: ", regD);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  const token = localStorage.getItem("access");
  let userId = null; // Initialize userId to null

  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.user_id; // Set userId to the decoded user ID
  }

  console.log("userID: ", userId);

  const handleRegistration = (e) => {
    // e.preventDefault();
    onRegistration();

    setButtonText("Registered");
    setButtonClass("reg-btn-success");
    setButtonDisabled(true);
    setButtonIcon("bi bi-check-lg");
    setRegBtnClicked(true);
    const data = {
      event: eventId,
      user: userId,
    };
    axios
      .post(`${LOCALHOST}/api/events/${eventId}/register/`, data)
      .then((response) => {
        // Handle a successful response
        console.log("Registration successful", response.data);
        // You can also update your component's state or perform other actions here.
      })
      .catch((error) => {
        // Handle errors, such as validation errors or network issues
        console.error("Registration failed", error);
      });
  };

  return (
    <>
      {regD ? (
        <button disabled className="reg-btn-success">
          <i className="bi bi-check-lg"></i>Registered
        </button>
      ) : (
        <button className={buttonClass} onClick={handleRegistration} disabled={buttonDisabled}>
          <i className={buttonIcon}></i> {buttonText}
        </button>
      )}
    </>
  );
};

export default PvtBtn;
