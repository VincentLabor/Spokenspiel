import React, { Fragment } from "react";
import Navbar from "../layout/Navbar";
import { connect } from "react-redux";

const Dashboard = ({}) => {
  return (
    <Fragment>
      <div className="containers">
        <Navbar />
        <div className="gridContainer">
          <div className="friendsList">FriendsList</div>
          <div className="chatting">Chat</div>
          <div className="chatbox"></div>
          <div className="conversations">Conversations</div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Dashboard);
