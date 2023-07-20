import React, { useReducer } from 'react'
import { createContext } from 'react'
import { new_options, reset_options } from '../constants/actionTypes'

const INITIAL_STATE = {
    city: "",
    date: [],
    options: {
        adult: 1,
        child: 0,
        room: 1,
    },
    lowestPrice: 0,
    highestPrice: 9999,
    dispatch: () => {}
}

export const OptionsContext = createContext(INITIAL_STATE)

const OptionsReducer = (state, action) => {
    switch (action.payload) {
        case new_options:
            return action.payload
        case reset_options:
            return INITIAL_STATE
        default:
            return state
    }
}

export const OptionsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(OptionsReducer, INITIAL_STATE)
    return (
        <OptionsContext.Provider
            value={{
                city:state.city,
                date: state.date,
                options: state.options,
                lowestPrice: state.lowestPrice,
                highestPrice: state.highestPrice,
                dispatch,
            }}
        >
            {children}
        </OptionsContext.Provider>
    )
}