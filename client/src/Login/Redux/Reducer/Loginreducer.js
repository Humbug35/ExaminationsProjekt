import {
    AUTHENTICATION_REQUEST ,
    AUTHENTICATION_USER_RECEIVE ,
    AUTHENTICATION_FAIL
} from '../../../Types/types';

const initialState = {
    authenticationLoading: null,
    authenticatedUser: [],
    authenticationError: null,
    isAuthenticated: false,
    isAdmin: false,
    isEmployee: false
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATION_REQUEST:
            return {
                ...state,
                authenticationLoading: true
            }
        case AUTHENTICATION_USER_RECEIVE:
            return {
                authenticationLoading: false,
                authenticatedUser: action.payload,
                authenticationError: false,
                isAuthenticated: true,
                isAdmin: action.admin,
                isEmployee: action.employee
            }
        case AUTHENTICATION_FAIL:
            return {
                authenticationLoading: false,
                authenticationError: action.payload
            }        
        default: 
            return state
    }
}