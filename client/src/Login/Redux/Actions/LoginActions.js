import {
    AUTHENTICATION_REQUEST ,
    AUTHENTICATION_USER_RECEIVE ,
    AUTHENTICATION_FAIL
} from '../../../Types/types';

export const authenticationRequest = () => ({
    type: AUTHENTICATION_REQUEST
})

export const authenticationReceiveUser = (user, admin, employee) => ({
    type: AUTHENTICATION_USER_RECEIVE,
    payload: user,
    admin: admin,
    employee: employee
})

export const authenticationFail = error => ({
    type: AUTHENTICATION_FAIL,
    payload: error
})


export const authenticate = () => {
    return dispatch => {
        dispatch(authenticationRequest())
        return fetch('http://localhost:5000/checktoken', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(result => {
                if(result.isAuthenticated) {
                    dispatch(authenticationReceiveUser(result.user, result.user.isAdmin, !result.user.isAdmin))
                } else {
                    dispatch(authenticationFail(result.isAuthenticated))
                }
            })
            .catch(error => {
                dispatch(authenticationFail(error))
            })
    }
}