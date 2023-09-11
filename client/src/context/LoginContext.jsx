import React, { createContext, useEffect, useReducer } from 'react'
import { start_login, login_success, login_failure, logout } from '../constants/actionTypes'

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
}

export const LoginContext = createContext(INITIAL_STATE)

const LoginReducer = (state, action) => {
    switch (action.type) {
        case start_login:
            return {
                user: null,
                loading: true,
                error: null
            }   
        case login_success:
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case login_failure:
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case logout:
            return {
                user: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

export const LoginContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE)

    useEffect(() => {
        // console.log(state)

        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <LoginContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            { children }
        </LoginContext.Provider>
    )
}