import React from "react";
import Layout from "./Layout";
import "../css/LoginPage.css";
import EventRegistrationButton from "./EventRegistrationButton";

function PrivateEvent() {
  return (
    <Layout>
      <div className="pcontainer">
        <h2 className="mb-4 mt-3">Post an Event </h2>
        {/* <h6> Hello, ${username} </h6> */}
        <input type="text" placeholder="Event Name" className="form-field" />
        <input type="file" id="thumb" placeholder="Event Image" className="input-field form-control dark" />
        {/* <label for="thumb">Select file</label> */}
        <textarea rows="4" placeholder="Event Description" className="form-field" />
        <input type="text" placeholder="Event Location" className="form-field" />
        <input type="text" placeholder="Event Date" className="form-field" />
        <input type="text" placeholder="Event Time" className="form-field" />
        {/* <input type="text" placeholder="Event Image" className="form-field" /> */}
        <div class="form-check form-switch py-2">
          <input checked className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            This is a free event
          </label>
        </div>
        <input disabled type="text" placeholder="Ticket Price" className="form-field" />
        <div class="form-check form-switch py-2">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            This is a private event
          </label>
        </div>
        <input type="text" placeholder="Password" className="form-field" />
        <input type="text" placeholder="Link to the Event" className="form-field" />
        <div class="alert alert-info" role="alert" data-bs-theme="dark">
          This will set your event sharing link to <strong>seatfinder.xyz/your-link</strong>
        </div>
        <button type="submit" className="add-button">
          Add Event Images
        </button>
        <button type="submit" className="add-button">
          Add Event Speakers
        </button>
        <button type="submit" className="form-button">
          Post Event
        </button>
      </div>
    </Layout>
  );
}

export default PrivateEvent;
