import {
    SCANNED_FREIGHT_REQUEST ,
    SCANNED_OUTLOADING_RECEIVE ,
    SCANNED_OUTLOADING_FAIL ,
    SCANNED_DELIVERY_RECEIVE ,
    SCANNED_DELIVERY_FAIL ,
    SCANNED_FREIGHT_NUMBER ,
    USER_OUTLOADING_FREIGHTS_REQUEST ,
    USER_OUTLOADING_FREIGHTS_RECEIVE ,
    USER_OUTLOADING_FREIGHTS_FAIL ,
    USER_DELIVERED_FREIGHTS_REQUEST ,
    USER_DELIVERED_FREIGHTS_RECEIVE ,
    USER_DELIVERED_FREIGHTS_FAIL
} from '../../../Types/types';

export const scannedFreightRequest = () => ({
    type: SCANNED_FREIGHT_REQUEST
})

export const scannedOutloadingReceive = freight => ({
    type: SCANNED_OUTLOADING_RECEIVE,
    payload: freight
})

export const scannedOutloadingFail = error => ({
    type: SCANNED_OUTLOADING_FAIL,
    payload: error
})

export const scannedDeliveryReceive = freight => ({
    type: SCANNED_DELIVERY_RECEIVE,
    payload: freight
})

export const scannedDeliveryFail = error => ({
    type: SCANNED_DELIVERY_FAIL,
    payload: error
})

export const scannedFreightNumber = freightNumber => ({
    type: SCANNED_FREIGHT_NUMBER,
    payload: freightNumber
})

export const userOutloadingRequest = () => ({
    type: USER_OUTLOADING_FREIGHTS_REQUEST
})

export const userOutloadingReceive = freights => ({
    type: USER_OUTLOADING_FREIGHTS_RECEIVE,
    payload: freights
})

export const userOutloadingFail = error => ({
    type: USER_OUTLOADING_FREIGHTS_FAIL,
    payload: error
})

export const userDeliveredRequest = () => ({
    type: USER_DELIVERED_FREIGHTS_REQUEST
})

export const userDeliveredReceive = freights => ({
    type: USER_DELIVERED_FREIGHTS_RECEIVE,
    payload: freights
})

export const userDeliveredFail = error => ({
    type: USER_DELIVERED_FREIGHTS_FAIL,
    payload: error
})


export const scannedFreight = (freightNumber, path, user) => {
    return dispatch => {
        dispatch(scannedFreightRequest())
            if(path === '/employee/outloading') {
                return fetch(`http://localhost:5000/outloading/gotoouloading`, {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        freightNumber: freightNumber,
                        user: user
                    })
                })
                .then(res => res.json())
                .then(result => {
                    if(result.success) {
                        dispatch(scannedOutloadingReceive(result.user))
                        dispatch(scannedFreightNumber(freightNumber))
                    } else {
                        dispatch(scannedOutloadingFail(result.success))
                    }
                })
                .catch(error => {
                    dispatch(scannedOutloadingFail(error))
                })
            } else {
                return fetch(`http://localhost:5000/delivered/gotodelivery`, {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        freightNumber: freightNumber,
                        user: user
                    })
                })
                    .then(res => res.json())
                    .then(result => {
                        if(result.success) {
                            dispatch(scannedDeliveryReceive(result.user))
                        } else {
                            dispatch(scannedDeliveryFail(result.success))
                        }
                    })
                    .catch(error => {
                        dispatch(scannedDeliveryFail(error))
                    })
            }
    }
}

export const userOutloadingFreights = user => {
    return dispatch => {
        dispatch(userOutloadingRequest())
        return fetch(`http://localhost:5000/outloading/user/${user}`)
            .then(res => res.json())
            .then(results => {
                if(results.success) {
                    dispatch(userOutloadingReceive(results.freights))
                } else {
                    dispatch(userOutloadingFail(results.success))
                }
            })
            .catch(error => dispatch(userOutloadingFail(error)))
    }
}

export const userDeliveredFreights = user => {
    return dispatch => {
        dispatch(userDeliveredRequest())
        return fetch(`http://localhost:5000/delivered/user/${user}`)
            .then(res => res.json())
            .then(results => {
                if(results.success) {
                    dispatch(userDeliveredReceive(results.freights))
                } else {
                    dispatch(userDeliveredFail(results.success))
                }
            })
            .catch(error => dispatch(userDeliveredFail(error)))
    }
}