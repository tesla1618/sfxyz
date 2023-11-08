import React from "react";
import EventCard from "./EventCard"; // Adjust the import path

const EventList = ({ events }) => {
  return <div className="event-card-grid">{events.map((event, index) => (!event.isPrivate ? <EventCard eventID={event.id} key={index} imageSrc={event.thumb} title={event.name} location={event.location} date={event.date} entryFee={event.entryFee} capacity={event.capacity} guests={event.host} buyTicketLink={event.link} eTags={event.tags} /> : null))}</div>;
};

export default EventList;
