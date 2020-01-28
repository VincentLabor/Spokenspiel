import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Fragment>
      <div className="flexRight pd-2_5 ">
        <div className="landing">
          <div className="dot right"></div>
          <div className="dot right1"></div>
          <div className="dot right2"></div>
          <h1 className="landingText inlineBlock">Speak Freely</h1>
          <h3 className="">
            Join our chatting service that allows you to chat with others in
            real time with no costs.
          </h3>
          <div className="dot bottom1"></div>
          <div className="dot bottom2"></div>
          <div className="dot bottom3"></div>
          <div className="dot bottom4"></div>
          <div className="dot bottom5"></div>

          <button className="btn">
            <Link to="/login" className="linkColor">
              Get Started
            </Link>
          </button>
        </div>
        <img src={require("./20671_1_25.jpg")} className="landingImg" alt=""></img>
        <div className="dot"></div>
        <div className="dot botRight"></div>
        <div className="dot top"></div>
      </div>
    </Fragment>
  );
};

export default Landing;
