import React from "react";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const userID = null;

const token = localStorage.getItem("access");
if (token) {
  const decoded = jwtDecode(token);
  const userId = decoded.user_id;
  //   setUserID(userID);
  userID = userID;
} else {
  const userID = null;
}

export { userID };
