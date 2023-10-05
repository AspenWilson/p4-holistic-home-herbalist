import React from "react"

function Home({user}) {
    return(
        <div>
            <header>Welcome to Holistic Home Herbalist</header>
            <h1>space for what herbalism is</h1>
            <h1>space for why it's important</h1>
            <h1>space for what the site is and how to use it</h1>
            <h3>User = {user.username}</h3>
        </div>
    )
}

export default Home