import { createContext, useState, useEffect, useContext } from 'react'
import { LoadingContext } from './LoadingContext'

const UserContext = createContext({}) 

const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const {setLoading} = useContext(LoadingContext)

    useEffect(() => {
        fetch('http://localhost:5555/checksession')
        .then(resp => {
            if (resp.status == 200) {
                resp.json().then(data => {
                    login(data)
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
        })
    }, [])

    const login = (user) => {
        setCurrentUser(user)
        setLoggedIn(true)
    }

    const logout = () => {
        setCurrentUser(null)
        setLoggedIn(false)
    }
    
    return <UserContext.Provider value = {{currentUser, loggedIn, login, logout}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}