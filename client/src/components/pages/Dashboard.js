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
  returnToMobileFriendslist,
} from "../../actions/chatroomActions";

let socket;

const Dashboard = ({
  chatroom: { currentChatroomName, currentChatroomId, mobileFriendslistIsOn },
  getMessagesFromDB,
  lastSender,
  returnToMobileFriendslist,
  chatroom: { msgs },
}) => {
  const [currentMsg, setCurrentMsg] = useState(""); //State of the current message
  const [generalChatStatus, setGeneralChatStatus] = useState(true);
  const [statusOfSending, setStatusOfSending] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const endpoint = "localhost:5000";

  useEffect(() => {
    socket = io(endpoint);
  }, []);

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
    setTimeout(() => {
      setStatusOfSending(true);
      setStatusOfSending(false);
    }, 25); //This runs every 2 seconds
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
    scrollDown.current.scrollIntoView({ behavior: "auto", block: "end" });
  };

  useEffect(() => {
    autoScrollDown();
  }, [statusOfSending]); //If no bracket, clicking on conversation will auto scroll down

  ////////////////////////////////////////////////////////////
  ///Dectection of page width and changing views for mobile///
  ////////////////////////////////////////////////////////////

  const [pageSize, setPageSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const resizeScreen = (fn, delay) => {
    let timeOutId;

    return function (...args) {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      //There needs to be an id for setTimeout so i can cancel it if clicked.
      timeOutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      resizeScreen((e) => {
        setPageSize({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      }, 1000)
    );
    console.log(pageSize.width);
  }, [pageSize.width]);

  useEffect(() => {
    if (pageSize.width < 321 && currentChatroomId) {
      setShowMobileChat(true);
    } else {
      setShowMobileChat(false);
    }
  }, [pageSize, currentChatroomId]);

  useEffect(() => {
    if (mobileFriendslistIsOn === true) {
      setShowMobileChat(false);
    }
    if (!currentChatroomId && mobileFriendslistIsOn === true) {
      returnToMobileFriendslist();
    }
  }, [mobileFriendslistIsOn]);

  return (
    <Fragment>
      <div className="fullscreenHeight">
        <Navbar />
        <div className="gridContainer">
          {/* The ternary works but need to show the chatroom. */}
          {showMobileChat ? null : <FriendsList />}

          <div
            className={
              showMobileChat
                ? "chatting chatboxDimens"
                : "chatting chatboxDimens hideOnSmallMedia"
            }
          >
            {currentChatroomName} {/*This currently does nothing*/}
            <ChatMessages />
            <div ref={scrollDown} className="anchor"></div>
          </div>
          <div
            className={showMobileChat ? "chatbox" : "chatbox hideOnSmallMedia"}
          >
            <ChatInput /* Passing down the states into the chatinput component */
              currentMsg={currentMsg}
              setCurrentMsg={setCurrentMsg}
              sendMessage={sendMessage}
            />
          </div>
          <div className="conversations hideOnSmallMedia">
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

export default connect(mapStateToProps, {
  saveMsgs,
  saveSentMsgs,
  getMessagesFromDB,
  returnToMobileFriendslist,
  lastSender,
})(Dashboard);
