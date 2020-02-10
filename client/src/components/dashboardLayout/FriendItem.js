import React from 'react'


const FriendItem = ({friend}) => {
    return (
        <div>
           <p>{friend.userName}</p> 
        </div>
    )
}

export default FriendItem