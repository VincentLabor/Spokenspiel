import React, { Fragment, useEffect, useState, useRef } from "react";
import Navbar from "../layout/Navbar";
import { connect } from "react-redux";
import FriendsList from "../dashboardLayout/friendsList/FriendsList";
// import addFriendModal from "../layout/addFriend/addFriendModal";
import ChatInput from "../dashboardLayout/chatMessages/ChatInput";
import ChatMessages from "../dashboardLayout/chatMessages/ChatMessages";
import Conversations from "../dashboardLayout/chatConversations/Conversations";
import io from "../../../node_modules/socket.io-client/dist/socket.io";
import {
  saveMsgs,
  saveSentMsgs,
  getMessagesFromDB,  
  lastSender,
} from "../../actions/chatroomActions";

let socket;

const Dashboard = ({
  chatroom: { currentChatroomName, currentChatroomId },
  getMessagesFromDB,
  lastSender,
  chatroom: { msgs },
}) => {
  const [currentMsg, setCurrentMsg] = useState(""); //State of the current message
  const [generalChatStatus, setGeneralChatStatus] = useState(true);
  const [statusOfSending, setStatusOfSending] = useState(false);
  

  const endpoint = "localhost:5000";

  useEffect(() => {
    socket = io(endpoint);
  }, [endpoint]); //if the endpoint is ever different, this will rerender. This will prevent multiple renders. This will need to change in the far future?

  //This retrieves the messages and shuts off the socket before allowing the socket to reopen
  useEffect(() => {
    socket.once("sendTypedMsg", () => {
      if (currentChatroomId) {
        getMessagesFromDB(currentChatroomId);
      }
    });

    return () => {
      socket.off("sendTypedMsg");

      socket.once("sendTypedMsg", () => {
        if (currentChatroomId) {
          getMessagesFromDB(currentChatroomId);
        }
      });
    };
  }, [msgs]);

  useEffect(() => {
    setTimeout(()=>{
      setStatusOfSending(true);
      setStatusOfSending(false);
    }, 250) //This runs every 2 seconds

  }, [msgs]);

  const sendMessage = (e) => {
    //Message is sent to the server.
    if (currentMsg) {
      sendTheMessage();
    }
  };

  const sendTheMessage = () => {
    socket.emit("chat message");

    if (currentChatroomId) {
      lastSender(currentChatroomId);
    }
      
  };

  const scrollDown = useRef(null);

  let autoScrollDown = () => {
    scrollDown.current.scrollIntoView({behavior:"smooth", block: "end"})
  };

  useEffect(() => {
    autoScrollDown();
  }, [statusOfSending]); //If no bracket, clicking on conversation will auto scroll down


  return (
    <Fragment>
        <Navbar />
        <div className="gridContainer">
          <FriendsList />
          <div className="chatting chatboxDimens" >
            {currentChatroomName} {/*This currently does nothing*/}
            <ChatMessages />
            <div ref={scrollDown} className= "anchor"></div>
          </div>
          <div className="chatbox">
            <ChatInput /* Passing down the states into the chatinput component */
              currentMsg={currentMsg}
              setCurrentMsg={setCurrentMsg}
              sendMessage={sendMessage}
            />
          </div>
          <div className="conversations">
            <Conversations
              generalChatStatus={generalChatStatus}
              setGeneralChatStatus={setGeneralChatStatus}
            />
          </div>
        </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, {
  saveMsgs,
  saveSentMsgs,
  getMessagesFromDB,
  lastSender,
})(Dashboard);
