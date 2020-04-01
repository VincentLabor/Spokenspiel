import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import { connect } from "react-redux";
import FriendsList from "../dashboardLayout/friendsList/FriendsList";
// import addFriendModal from "../layout/addFriend/addFriendModal";
import ChatInput from "../dashboardLayout/chatMessages/ChatInput";
import ChatMessages from "../dashboardLayout/chatMessages/ChatMessages";
import Conversations from "../dashboardLayout/chatConversations/Conversations";
import io from "socket.io-client";
import { saveMsgs, saveSentMsgs} from "../../actions/chatroomActions";

let socket;

const Dashboard = ({ chatroom: { currentChatroomName }, saveMsgs, auth:{user} }) => {
  const [currentMsg, setCurrentMsg] = useState(""); //State of the current message
  const [messages, setMessages] = useState([]); //The whole array of messsages
  const [generalChatStatus, setGeneralChatStatus] = useState(true);

  const endpoint = "localhost:5000";

  useEffect(() => {
    socket = io(endpoint);

  }, [endpoint]); //if the endpoint is ever different, this will rerender. This will prevent multiple renders

  useEffect(() => {
    socket.on("chat message", currentMsg => {
      saveMsgs(currentMsg);
    });
  }, [messages]); //Check back on this

  const sendMessage = e => {
    if (currentMsg) {
      socket.emit("chat message", (user.userName + " : " + currentMsg), () => {
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
          <div className="chatting">
            Chat
            {currentChatroomName}
            <ChatMessages messages={messages} setMessages={setMessages} />
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

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});

export default connect(mapStateToProps, { saveMsgs, saveSentMsgs})(Dashboard);
