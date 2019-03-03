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

const initialState = {
    scannedFreightFetching: false,
    scannedOutloading: [],
    scannedOutloadingError: null,
    scannedDelivery: [],
    scannedDeliveryError: null,
    scannedFreightNumber: [],
    userOutloadingRequest: false,
    userOutloadingFreights: [],
    userOutloadingFail: null,
    userDeliveredRequest: false,
    userDeliveredFreights: [],
    userDeliveredFail: null
}

export const scannedReducer = (state = initialState, action) => {
    switch(action.type) {
        case SCANNED_FREIGHT_REQUEST:
            state.scannedOutloading = [];
            state.scannedDelivery = [];
            return {
                ...state,
                scannedFreightFetching: true
            }
        case SCANNED_OUTLOADING_RECEIVE:
            return {
                ...state,
                scannedFreightFetching: false,
                scannedOutloading: action.payload
            }
        case SCANNED_OUTLOADING_FAIL:
            return {
                ...state,
                scannedOutloadingError: !action.payload
            }
        case SCANNED_DELIVERY_RECEIVE:
            return {
                ...state,
                scannedFreightFetching: false,
                scannedDelivery: action.payload
            }
        case SCANNED_DELIVERY_FAIL:
            return {
                ...state,
                scannedDeliveryError: !action.payload
            } 
        case SCANNED_FREIGHT_NUMBER:
            return {
                ...state,
                scannedFreightNumber: state.scannedFreightNumber.concat(action.payload)
            }
        case USER_OUTLOADING_FREIGHTS_REQUEST:
            return {
                ...state,
                userOutloadingRequest: true
            }   
        case USER_OUTLOADING_FREIGHTS_RECEIVE:
            return {
                ...state,
                userOutloadingRequest: false,
                userOutloadingFreights: action.payload
            }
        case USER_OUTLOADING_FREIGHTS_FAIL:
            return {
                ...state,
                userOutloadingRequest: false,
                userOutloadingFail: action.payload
            } 
        case USER_DELIVERED_FREIGHTS_REQUEST:
            return {
                ...state,
                userDeliveredRequest: true
            }   
        case USER_DELIVERED_FREIGHTS_RECEIVE:
            return {
                ...state,
                userDeliveredRequest: false,
                userDeliveredFreights: action.payload
            }
        case USER_DELIVERED_FREIGHTS_FAIL:
            return {
                ...state,
                userDeliveredRequest: false,
                userDeliveredFail: action.payload
            }                            
        default: 
            return state    
    }
}