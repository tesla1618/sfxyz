import React, { Fragment } from "react";
import "../css/Navbar.css"; // Updated import path
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link
import { logout } from "../actions/auth";
import { connect } from "react-redux";

const Navbar = ({ logout, isAuthenticated }) => {
  const guestLinks = () => (
    <Fragment>
      <NavLink className={({ isActive }) => (isActive ? "sf-link active" : "sf-link")} exact to="/login">
        Login
      </NavLink>
      {/* <i className='text-white'>/</i> */}
      <NavLink className="sf-link" to="/signup">
        Signup
      </NavLink>
    </Fragment>
  );
  const authLinks = () => (
    <>
      <NavLink className={({ isActive }) => (isActive ? "sf-create-event active" : "sf-create-event")} to="/registered">
        <i class="bi bi-calendar2-check"></i>
      </NavLink>
      <NavLink className="sf-logout-2" onClick={logout}>
        <i class="bi bi-box-arrow-right"></i>
      </NavLink>
      {/* <span className="sf-uname">User</span> */}
    </>
  );
  console.log("isAuthenticated: ", isAuthenticated);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-blurry">
        <div className="container">
          <img src="/seatfinder.png" alt="SeatFinder Logo" className="navbar-logo" />
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")} exact to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")} to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")} to="/terms">
                  Terms
                </NavLink>
              </li>
              {isAuthenticated ? (
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")} to="/create">
                    Create
                  </NavLink>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="d-flex align-items-center ms-auto">{isAuthenticated ? authLinks() : guestLinks()}</div>
        </div>
      </nav>
      <div className="navbar-nav-mbl justify-content-center" id="">
        <span className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? "nav-link-mbl active-link-mbl" : "nav-link-mbl")} exact to="/">
            Home
          </NavLink>
        </span>
        <span className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? "nav-link-mbl active-link-mbl" : "nav-link-mbl")} to="/about">
            About
          </NavLink>
        </span>
        <span className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? "nav-link-mbl active-link-mbl" : "nav-link-mbl")} to="/terms">
            Terms
          </NavLink>
        </span>
        {isAuthenticated ? (
          <span className="nav-item">
            <NavLink className={({ isActive }) => (isActive ? "nav-link-mbl active-link-mbl" : "nav-link-mbl")} to="/create">
              Create
            </NavLink>
          </span>
        ) : null}
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
