import React from "react";

function Property({user}){
    return (
        <div>
        <h1>Property page</h1>
        <h3>{user.username}</h3>
        </div>
    )
}

export default Property