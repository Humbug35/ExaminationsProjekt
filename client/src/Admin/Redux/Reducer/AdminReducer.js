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

const initialState = {
outloadingFreights: [],
outloadingIsFetching: false,
outloadingError: null,
deliveredFreights: [],
deliveredIsFetching: false,
deliveredError: null,
singleFreight: [],
singleFreightIsFetching: false,
singleFreightError: null,
newUserRequest: false,
newUserCreated: null,
newUserFail: null
}

export const freightsReducer = (state = initialState, action) => {
switch(action.type) {
   case OUTLOADING_FREIGHTS_REQUEST:
       state.outloadingFreights = []
       return {
               ...state,
               outloadingIsFetching: true
       }
   case OUTLOADING_FREIGHTS_RECEIVE:
       return {
           ...state,
           outloadingIsFetching: false,
           outloadingFreights: action.payload,
           outloadingError: false
       }
   case OUTLOADING_FREIGHTS_FAIL:
       return {
           ...state,
           outloadingIsFetching: false,
           outloadingError: !action.payload
       }
   case DELIVERED_FREIGHTS_REQUEST:
   state.deliveredFreights = []
       return {
           ...state,
           deliveredIsFetching: true
       }
   case DELIVERED_FREIGHTS_RECEIVE:
       return {
           ...state,
           deliveredIsFetching: false,
           deliveredFreights: action.payload,
           deliveredError: false
       }
   case DELIVERED_FREIGHTS_FAIL:
       return {
           ...state,
           deliveredIsFetching: false,
           deliveredError: !action.payload
       }    
   case SINGLE_FREIGHT_REQUEST:
       state.singleFreight = []
       return {
           ...state,
           singleFreightIsFetching: true
       }  
   case SINGLE_FREIGHT_RECEIVE:
       return {
           ...state,
           singleFreightIsFetching: false,
           singleFreight: action.payload
       } 
   case SINGLE_FREIGHT_FAIL:
       return {
           ...state,
           singleFreightIsFetching: false,
           singleFreightError: action.payload
       }
    case REGISTER_REQUEST:
       return {
            ...state,
            newUserRequest: true
       }
    case REGISTER_USER_CREATED:
        return {
            ...state,
            newUserRequest: false,
            newUserCreated: action.payload
        }
    case REGISTER_USER_EXISTS:
        return {
            ...state,
            newUserRequest: false,
            newUserCreated: action.payload
        }
    case REGISTER_NO_MESSAGE:
        return {
            ...state,
            newUserCreated: action.payload
        }    
    case REGISTER_FAIL: 
        return {
            ...state,
            newUserFail: action.payload
        }                                
   default:
       return state
}
}