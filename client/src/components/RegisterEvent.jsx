import React from "react";
import { useParams } from "react-router-dom";
import "../css/page.css";
import { useState, useEffect } from "react";
import "../css/LoginPage.css";
import Layout from "./Layout";
import { Link, Navigate, useNavigate } from "react-router-dom";

const RegisterEvent = ({ events, isAuthenticated }) => {
  const navigate = useNavigate();
  const { eventLink } = useParams();
  const selectedEvent = events.find((event) => event.link === eventLink);

  if (selectedEvent) {
    return (
      <Layout>
        <div className="pcontainer">
          <img src="/bk.png" alt="" width="700" />
        </div>
      </Layout>
    );
  }
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default RegisterEvent;
