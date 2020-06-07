import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import { connect } from "react-redux";
import FriendsList from "../dashboardLayout/friendsList/FriendsList";
// import addFriendModal from "../layout/addFriend/addFriendModal";
import ChatInput from "../dashboardLayout/chatMessages/ChatInput";
import ChatMessages from "../dashboardLayout/chatMessages/ChatMessages";
import Conversations from "../dashboardLayout/chatConversations/Conversations";
import io from "../../../node_modules/socket.io-client/dist/socket.io";
import { saveMsgs, saveSentMsgs, getMessagesFromDB } from "../../actions/chatroomActions";

let socket;

const Dashboard = ({
  chatroom: { currentChatroomName, currentChatroomId },
  getMessagesFromDB,
  saveMsgs,
  auth: { user },
}) => {
  const [currentMsg, setCurrentMsg] = useState(""); //State of the current message
  const [messages, setMessages] = useState([]); //The whole array of messsages
  const [generalChatStatus, setGeneralChatStatus] = useState(true);

  const endpoint = "localhost:5000";

  useEffect(() => {
    socket = io(endpoint);
  }, [endpoint]); //if the endpoint is ever different, this will rerender. This will prevent multiple renders. This will need to change in the far future?

  const sendMessage = (e) => {
    //Message is sent to the server.
    if (currentMsg) {
      socket.emit("chat message", user.userName + " : " + currentMsg, () => {
        setCurrentMsg("");
      });
    }
    socket.on("sendTypedMsg", (typedMsg) => {
      if (currentChatroomId) {
        getMessagesFromDB(currentChatroomId);
      }
    });
  };

  return (
    <Fragment>
      <div className="containers">
        <Navbar />
        <div className="gridContainer">
          <FriendsList />
          <div className="chatting">
            Chat
            {currentChatroomName} {/*This currently does nothing*/}
            <ChatMessages messages={messages} setMessages={setMessages} />
            {/* <p>{currentMsg}</p> turns out this contributes nothing. */}
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
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, { saveMsgs, saveSentMsgs, getMessagesFromDB })(Dashboard);
