import React, { useEffect,useState } from "react";
import io from "socket.io-client";

let socket;

const ChatMessages = () => {
  const [newMsg,setNewMsg] = useState()
  const endpoint = "localhost:5000";

  useEffect(() => {
    socket = io(endpoint);
    socket.on("chat message", (msgs)=>{
      
    })

  }, [endpoint]); 
return <div></div>;
};

export default ChatMessages;

//41:43 passing in the room #
