import React from 'react';
//we have to import users username here later

const Message = ({message}) => {

    let sentByCurrentUser = false;

    return (
        <div className="messageContainer backgroundBlue">
          <p className="colorWhite"> {message} </p>  
        </div>
    )
}

export default Message
