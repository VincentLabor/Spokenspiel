import React,{useState} from 'react'
import {Link} from 'react-router-dom';


const Conversations = () => {

    const [name,setName] = useState('');
    const [conversation,setConversation] = useState('');


    // Link to= {/chat?name=${name}&room=${room}} 

    return (
        <div>
            Conversations
        </div>
    )
}

export default Conversations;
