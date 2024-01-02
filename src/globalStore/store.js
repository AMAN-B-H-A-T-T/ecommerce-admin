import React from "react";
import PropTypes from 'prop-types';
import { createContext , useReducer } from "react";
export const Store = createContext()

const initialState = {
    accessToken: localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    :null,
    category_list_global : []
}

function reducer(state,action){
    switch(action.type){
        case 'ACCESS_TOKEN':
            return {...state,accessToken:action.payload}
        case 'SET_CATEGORY_LIST':
            return {...state,category_list_global:action.payload}
        default:
            return state
    }
}


export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

// Add propTypes validation
StoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};