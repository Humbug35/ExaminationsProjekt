import { OUTLOADING_FREIGHTS_REQUEST ,
         OUTLOADING_FREIGHTS_RECEIVE ,
         OUTLOADING_FREIGHTS_FAIL ,
         DELIVERED_FREIGHTS_REQUEST ,
         DELIVERED_FREIGHTS_RECEIVE , 
         DELIVERED_FREIGHTS_FAIL ,
         SINGLE_FREIGHT_REQUEST ,
         SINGLE_FREIGHT_RECEIVE ,
         SINGLE_FREIGHT_FAIL ,
         REGISTER_REQUEST ,
         REGISTER_USER_CREATED ,
         REGISTER_USER_EXISTS ,
         REGISTER_NO_MESSAGE ,
         REGISTER_FAIL
} from '../../../Types/types';


export const fetchOutloadingFreightsRequest = () => ({
type: OUTLOADING_FREIGHTS_REQUEST
})

export const fetchOutloadingFreightsReceive = freights => ({
type: OUTLOADING_FREIGHTS_RECEIVE,
payload: freights
})

export const fetchOutloadingFreightsFail = error => ({
type: OUTLOADING_FREIGHTS_FAIL,
payload: error
})

export const fetchDeliveredFreightsRequest = () => ({
type: DELIVERED_FREIGHTS_REQUEST
})

export const fetchDeliveredFreightsReceive = freights => ({
type: DELIVERED_FREIGHTS_RECEIVE,
payload: freights
})

export const fetchDeliveredFreightsFail = error => ({
type: DELIVERED_FREIGHTS_FAIL,
payload: error
})

export const fetchSingleFreightRequest = () => ({
type: SINGLE_FREIGHT_REQUEST
})

export const fetchSingleFreightReceive = freight => ({
type: SINGLE_FREIGHT_RECEIVE,
payload: freight
})

export const fetchSingleFreightFail = error => ({
type: SINGLE_FREIGHT_FAIL,
payload: error
})

export const registerRequest = () => ({
    type: REGISTER_REQUEST
})

export const registerUserCreated = success => ({
    type: REGISTER_USER_CREATED,
    payload: success
})

export const registerUserExists = success => ({
    type: REGISTER_USER_EXISTS,
    payload: success
})

export const registerNoMessage = () => ({
    type: REGISTER_NO_MESSAGE,
    payload: null
})

export const registerFail = error => ({
    type: REGISTER_FAIL,
    payload: error
})

export const fetchOutloadingFreights = (user = '', freightnumber = '', status = '') => {
return dispatch => {
   dispatch(fetchOutloadingFreightsRequest())
   return fetch(`http://localhost:5000/outloading?user=${user}&freightnumber=${freightnumber}&status=${status}`)
       .then(res => res.json())
       .then(freigths => {
           if(freigths.success) {
               dispatch(fetchOutloadingFreightsReceive(freigths.result))
           } else {
               dispatch(fetchOutloadingFreightsFail(freigths.success))
           }
       })
       .catch(error => {
           dispatch(fetchOutloadingFreightsFail(error))
       })
}
}

export const fetchDeliveredFreights = (user = '', freightnumber = '', status = '') => {
    return dispatch => {
        dispatch(fetchDeliveredFreightsRequest())
        return fetch(`http://localhost:5000/delivered?user=${user}&freightnumber=${freightnumber}&status=${status}`)
            .then(res => res.json())
            .then(freights => {
                if(freights.success) {
                    dispatch(fetchDeliveredFreightsReceive(freights.result))
                } else {
                    dispatch(fetchDeliveredFreightsFail(freights.success))
                }
            })
            .catch(error => {
                dispatch(fetchDeliveredFreightsFail(error))
            })
    }
}

export const fetchSingleFreight = (notenumber, status) => {
    return dispatch => {
        dispatch(fetchSingleFreightRequest())
        if(status === 'On the way') {
            return fetch(`http://localhost:5000/outloading/${notenumber}`)
                .then(res => res.json())
                .then(freight => {
                    if(freight.success) {
                        dispatch(fetchSingleFreightReceive(freight.result))
                    } else {
                        dispatch(fetchSingleFreightFail(freight.success))
                    }
                })
                .catch(error => {
                    dispatch(fetchSingleFreightFail(error))
                })
        } else {
            return fetch(`http://localhost:5000/delivered/${notenumber}`)
                .then(res => res.json())
                .then(freight => {
                    if(freight.success) {
                        dispatch(fetchSingleFreightReceive(freight.result))
                    } else {
                        dispatch(fetchSingleFreightFail(freight.success))
                    }
                })
                .catch(error => {
                    dispatch(fetchSingleFreightFail(error))
                })
        }
    }
}

export const userRegister = newUser => {
    return dispatch => {
        dispatch(registerRequest())
        return fetch('http://localhost:5000/register', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(result => {
            if(result.success) {
                dispatch(registerUserCreated(result.success))
            } else {
                dispatch(registerUserExists(result.success))
            }
        })
        .catch(error => {
            dispatch(registerFail(error))
        })
    }
}

export const noMessageRegister = () => {
    return dispatch => {
        return dispatch(registerNoMessage())
    }
}