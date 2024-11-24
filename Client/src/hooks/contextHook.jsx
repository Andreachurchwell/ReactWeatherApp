import React, { createContext, useState, useContext } from "react"



const MyContext = createContext()


export const useData = () => useContext(MyContext)

export function MyProvider({ children }) {

    const [authedUser, setAuthedUser] = useState({})

    const handleLoggedInUser = (input) => {

        console.log("input", input)

        setAuthedUser(input)

    }



    return (



        <MyContext.Provider
            value={{
                handleLoggedInUser,
                authedUser
            }}
        >
            {children}
        </MyContext.Provider>



    )
}


export default MyProvider