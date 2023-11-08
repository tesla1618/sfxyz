import React from "react";
import Navbar from "./Navbar";
import "../css/page.css";
import "../css/style.css";
import "../css/LoginPage.css";
import Layout from "./Layout";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useCurrentUser } from "./userState";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { checkAuthenticated, loadUser } from "../actions/auth";

const LOCALHOST = `${API_URL}`;

const client = axios.create({
  baseURL: `${LOCALHOST}`,
});

const LoginPage = ({ login, isAuthenticated }) => {
  let invalid = false;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    invalid = true;
  }
  return (
    <>
      <Layout>
        {/* <button className="btn btn-gradient" onClick={() => setCurrentUser(true)}>
          sds
        </button> */}
        <div className="container mt-5 login-pc-block">
          <div className="row">
            <div className="col-md-5 col-12">
              <img src="/assets/images/login-banner.png" className="danceImg" alt="" width="500" />
            </div>
            <div className="col-md-5 col-12 pcontainer login-pc-v">
              <form className="login-form" onSubmit={(e) => onSubmit(e)}>
                <div class="info-box" role="alert">
                  Welcome back! Please enter your credentials to log in.
                </div>
                <input required type="email" name="email" className="login-field" placeholder="Email" value={email} onChange={(e) => onChange(e)} />
                <input required type="password" name="password" className="login-field" placeholder="Password" value={password} onChange={(e) => onChange(e)} />
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
              <div className="text-white mt-4">
                New to SeatFinder?{" "}
                <Link className="text-white" to="/signup">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mbl-container login-mbl-block">
          <div className="pcontainer login-pc-v">
            <form className="login-form" onSubmit={(e) => onSubmit(e)}>
              <div class="info-box" role="alert">
                {invalid ? "Welcome back! Please enter your credentials to log in." : "Invalid credentials"}
              </div>
              <input name="email" type="email" className="login-field" placeholder="Email" value={email} onChange={(e) => onChange(e)} />
              <input name="password" type="password" className="login-field" placeholder="Password" value={password} onChange={(e) => onChange(e)} />
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <div className="text-white mt-4">
              New to SeatFinder?{" "}
              <Link className="text-white" to="/signup">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginPage);
