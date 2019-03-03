import { createStore , applyMiddleware , combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { freightsReducer as admin }  from '../Admin/Redux/Reducer/AdminReducer';
import { scannedReducer as employee } from '../Employee/Redux/Reducer/EmployeeReducer';
import { authReducer as authentication } from '../Login/Redux/Reducer/Loginreducer';

const rootReducer = combineReducers({
    admin,
    employee,
    authentication
})


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;