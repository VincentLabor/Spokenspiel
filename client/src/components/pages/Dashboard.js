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
  const [messages, setMessages] = useState([]);
  const endpoint = "localhost:5000";

  useEffect(() => {
    socket = io(endpoint);
     socket.emit("join", ()=>{
       
     });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [endpoint]); //if the endpoint is ever different, this will rerender. This will prevent multiple renders

  useEffect(()=>{
    socket.on("sendMessage", (message)=>{
      setMessages([...messages, currentMsg])
    })
    console.log(messages)
  },[currentMsg])
  
  const sendMessage = e => {
    e.preventDefault();
    if (currentMsg) {
      socket.emit("chat message", currentMsg, () => {
        setMessages([...messages, currentMsg])
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
            <ChatMessages messages={messages} setMessages={setMessages}/>
          </div>

          <div className="chatbox">
            <ChatInput /* Passing down the states into the chatinput component */
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
