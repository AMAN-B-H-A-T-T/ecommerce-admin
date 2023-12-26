import React from "react";
import PropTypes from 'prop-types';
import { createContext , useReducer } from "react";
export const Store = createContext()

const initialState = {
    accessToken: localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    :null
}

function reducer(state,action){
    switch(action.type){
        case 'ACCESS_TOKEN':
            return {...state,accessToken:action.payload}
        default:
            return state
    }
}
export function StoreProvider(props){
    const [state,dispactch] = useReducer(reducer,initialState)
    const value = {state,dispactch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
StoreProvider.prototype = {
    children: PropTypes.node.isRequired
}