import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import { connect } from "react-redux";
import FriendsList from "../dashboardLayout/FriendsList";
import addFriendModal from "../layout/addFriend/addFriendModal";
import ChatInput from "../dashboardLayout/ChatInput";
import ChatMessages from "../dashboardLayout/ChatMessages";
import Conversations from "../dashboardLayout/Conversations";
import io from "socket.io-client";

let socket;

const Dashboard = ({}) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const endpoint = "localhost:5000";

  useEffect(() => {
    socket = io(endpoint);
    socket.emit("join", "potatoes");

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [endpoint]); //if the endpoint is ever different, this will rerender. This will prevent multiple renders

  const sendMessage = e => {
    e.preventDefault();

    if (currentMsg) {
      socket.emit("chat message", currentMsg, () => {
        setCurrentMsg("");
      });
    }
  };

  return (
    <Fragment>
      <div className="containers">
        <Navbar />
        <div className="gridContainer">
          <FriendsList />
          {/* <div className="chat"> */}
          <div className="chatting">
            Chat
            <ChatMessages />
          </div>
          <div className="chatbox">
            <ChatInput
              currentMsg={currentMsg}
              setCurrentMsg={setCurrentMsg}
              sendMessage={sendMessage}
            />
          </div>
          <div className="conversations">
            <Conversations />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Dashboard);
