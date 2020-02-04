import React from "react";
import Navbar from "../layout/Navbar";
import Landing from "../layout/Landing";
import Footer from "../layout/Footer";
import {connect} from "react-redux";
import Dashboard from "./Dashboard";

const Home = ({ auth: { isAuthenticated, token } }) => {
  return token !== null ? (
    <Dashboard />
  ) : (
    <div className="fullSize">
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
