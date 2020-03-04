import React,{useState} from 'react'
import {Link} from 'react-router-dom';


const Conversations = ({generalChatStatus, setGeneralChatStatus}) => {

    const [name,setName] = useState('');
    const [conversation,setConversation] = useState('');


    // Link to= {/chat?name=${name}&room=${room}} 

    return (
        <div>
            Conversations
           {generalChatStatus ? (<h3 className="cursorChg">General Chat</h3>) : null}
            {/*TODO CSS class that makes a separate block for discerning different convos  */}
        </div>
    )
}

export default Conversations;
