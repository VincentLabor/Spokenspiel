import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Fragment>
      <div className="flexAndCenter">
        <div className="landingWrapper ">
          <h1 className="landingText inlineBlock">Speak Freely</h1>
          <p>
            Join our chatting service that allows you to chat with others in
            real time with no costs.
          </p>
          <Link to="/login" className="linkColor">
            <button className="btn backgroundBlue whiteText">Get Started</button>
          </Link>
        </div>
        <img
          src={require("./20671_1_25.jpg")}
          className="landingImg "
          alt=""
        ></img>
      </div>
    </Fragment>
  );
};

export default Landing;
