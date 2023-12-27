import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { API_URL } from "../config";

const LOCALHOST = `${API_URL}`;

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    // Fetch event names from the /api/events/ endpoint
    axios
      .get(`${LOCALHOST}/api/events/`)
      .then((response) => {
        const apiResponse = response.data; // Assuming the response is an array of event objects

        // Extract event names from the response
        const eventNames = apiResponse.map((event) => event.name);

        // Set the event names in your state
        setMyEvents(eventNames);
      })
      .catch((error) => {
        console.error("Error fetching event names:", error);
      });
  }, []); // The empty dependency array ensures that this effect runs once, like componentDidMount

  return (
    <Layout>
      {/* Display the event names */}
      <div>
        <h2>Registered Events:</h2>
        <ul>
          {myEvents.map((eventName, index) => (
            <li key={index}>{eventName}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default MyEvents;
