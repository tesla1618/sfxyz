import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FadeEffect from "./FadeEffect";
import ScrollFix from "./ScrollFix";
import { useEffect } from "react";
import { checkAuthenticated, loadUser } from "../actions/auth";
import { connect } from "react-redux";

const Layout = (props) => {
  useEffect(() => {
    props.checkAuthenticated();
    props.loadUser();
  }, []);
  return (
    <>
      <ScrollFix />
      <Navbar />
      <FadeEffect>{props.children}</FadeEffect>
      <Footer />
    </>
  );
};

export default connect(null, { checkAuthenticated, loadUser })(Layout);
