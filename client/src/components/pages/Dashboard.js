import React, { Fragment } from "react";
import Navbar from "../layout/Navbar";
import { connect } from "react-redux";
import FriendsList from "../dashboardLayout/FriendsList";

const Dashboard = ({}) => {
  return (
    <Fragment>
      <div className="containers">
        <Navbar />
        <div className="gridContainer">
          <FriendsList />
          {/* <div className="chat"> */}
            <div className="chatting">Chat</div>
            <div className="chatbox">chatbox</div>
          {/* </div> */}

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
