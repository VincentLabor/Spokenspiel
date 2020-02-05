import React from "react";
import Navbar from "../layout/Navbar";
// import Landing from "../layout/Landing";
// import Footer from "../layout/Footer";
function About() {
  return (
    <div className="about">
      <Navbar />
      <div className="about">
        <h1>About</h1>
        <h4>Spokenspiel Ver. 1</h4>
        <p>
          This is an app designed to make friends and chat with others around
          the world.{" "}
        </p>
        <h3>This website was made by Vincent Labor!</h3>
        <a
          href="https://www.freepik.com/free-photos-vectors/business"
          className="linkColor"
        >
          Business vector created by katemangostar - www.freepik.com
        </a>
        <div className="dot bottom1"></div>
        <div className="dot bottom2"></div>
        <div className="dot bottom3"></div>
        <div className="dot bottom4"></div>
        <div className="dot right1"></div>
        <div className="dot right2"></div>
      </div>
    </div>
  );
}

export default About;
