import React from 'react'


const FriendItem = ({friend}) => {
    return (
        <div>
            {friend.friendStatus !== 3 ? (null):(<p>{friend.userName}</p>) }
        </div>
    )
}

export default FriendItem