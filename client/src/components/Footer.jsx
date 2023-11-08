import React from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src="seatfinder.png" alt="Inizia Logo" className="footer-logo" />
        </div>
        <div className="footer-links">
          <ul className="footer-list">
            <li>
              <Link className="footer-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/terms">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/privacy">
                Privacy Policies
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/refund">
                Refund Policies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-crafted">
        Crafted with pain &amp; suffering <i className="bi bi-heartbreak-fill mx-2"></i> by{" "}
        <a className="footer-link" href="#">
          FTS
        </a>
      </div>
    </div>
  );
}

export default Footer;
