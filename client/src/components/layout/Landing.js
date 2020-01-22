import React from "react";

function Landing() {
  return (
    <div className="flexRight pd-2_5 ">
      <div className="landing">
        <h1 className="landingText inlineBlock">Speak Freely</h1>
        <h3 className=''>
          A chatting service that allows you to chat with others in real time.
        </h3>
      </div>
      <img src={require("./20671_1_25.jpg")} className="landingImg"></img>
    </div>
  );
}

export default Landing;
