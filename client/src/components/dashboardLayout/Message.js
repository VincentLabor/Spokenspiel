import React from "react";
import { connect } from "react-redux";
//we have to import users username here later

const Message = ({ message, auth:{user} }) => {
  let sentByCurrentUser = false;

  return (
    <div className="messageContainer backgroundBlue">
      <p className="colorWhite"> {user.userName}: {message} </p>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Message);
