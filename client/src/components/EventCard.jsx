import React from "react";
import PropTypes from "prop-types";
import "../css/EventCard.css";
import { Link } from "react-router-dom";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const EventCard = ({ imageSrc, title, location, date, entryFee, guests, buyTicketLink, eventID, eTags }) => {
  const truncatedTitle = truncateText(title, 30);
  const ticketIcon = <i className="bi bi-ticket"></i>;
  return (
    <div className="event-card danceCard">
      <div className="event-card-image">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="event-card-details">
        <h2 className="event-card-title">{truncatedTitle}</h2>
        <div className="event-card-info">
          <div className="event-info">
            <i className="bi bi-geo-alt"></i>
            <span>{location}</span>
          </div>
          <div className="event-info">
            <i className="bi bi-calendar"></i>
            <span>{date}</span>
          </div>
          {entryFee ? (
            <div className="event-info">
              <i className="bi bi-currency-dollar"></i>
              <span>{entryFee} BDT</span>
            </div>
          ) : (
            <div className="event-info">
              <i className="bi bi-currency-dollar"></i>
              <span>Free of Cost</span>
            </div>
          )}

          <div className="event-info">
            <i className="bi bi-person"></i>
            <span>{guests}</span>
          </div>
        </div>
        <Link key={eventID} to={buyTicketLink} eTags className="btn btn-gradient">
          {entryFee ? "Buy Ticket" : "Register"}
        </Link>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  entryFee: PropTypes.string, // entryFee is optional
  guests: PropTypes.string, // guests is optional
  buyTicketLink: PropTypes.string.isRequired,
};

export default EventCard;
