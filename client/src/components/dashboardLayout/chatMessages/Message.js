import React from "react";
import { connect } from "react-redux";
import { saveSentMsgs } from "../../../actions/chatroomActions";
//we have to import users username here later

const Message = ({
  message,
}) => {

  return (
    <div className=" messageContainer">
      <p>{message}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chatroom: state.chatroom,
});
export default connect(mapStateToProps, { saveSentMsgs })(Message);



// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { saveSentMsgs } from "../../../actions/chatroomActions";
// //we have to import users username here later

// const Message = ({ message, auth:{user} }) => {

//   let slicer = () => {
//     let name = message.slice(); 
//     for (let i = 0; i < message.length; i++) {
//       if (name[i] === ":") {
//         return  message.slice(0, i);
//       }
//     }
//   };

//   let dicer = () => {
//     let name = message.slice();
//     for (let i = 0; i < message.length; i++) {
//       if (name[i] === ":") {
//         return name.slice(i, name.length);
//       }
//     }
//   };

//   return (
//     <div className=" messageContainer ">
//       <p className={user.userName === slicer() ? "userColor userText" : "userText" }>
//         <strong>{slicer()}</strong>
//       </p>
//       <p>{dicer()}</p>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   chatroom: state.chatroom,
// });
// export default connect(mapStateToProps, { saveSentMsgs })(Message);
