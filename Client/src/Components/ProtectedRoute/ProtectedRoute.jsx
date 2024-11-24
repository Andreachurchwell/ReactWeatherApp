import React, { useEffect } from 'react'
import { useData } from '../../hooks/contextHook'

import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProtectedRoute = () => {

    const { authedUser, handleLoggedInUser } = useData()
    let nav = useNavigate()

    useEffect(() => {
        axios(
            {
                method: 'get',
                withCredentials: true,
                url: 'http://localhost:3002/api/authed',

            }
        )
            .then((res) => {
                console.log('res==', res)
                console.warn("PROT ROUTE auth res", res)
                if (res.data._id) {
                    console.log("protectedRoute.then.axios = res.data.username", res.data.username)
                    handleLoggedInUser(res.data)
                    // console.log("log", loggedIn)
                    // setLoggedIn(true)
                }else {
                    nav("/")
                }
            })
    }, [])

    return (
        <div>
            {console.log('ProtectedRoute HIT', authedUser)}
            {authedUser._id ? <Outlet /> : nav('/')}

        </div>
    )
}

export default ProtectedRoute
