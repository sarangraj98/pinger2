import { createStore, applyMiddleware, compose,combineReducers } from "redux";
import thunk from "redux-thunk";
import { userSignInReducer } from "./reducers/authReducer";
import { logReducer } from "./reducers/logReducer";
import { pingReducer } from "./reducers/pingReducer";
import Cookie from 'js-cookie'
const userInfo = Cookie.getJSON('userInfo') || null;
const logInfo = Cookie.getJSON('logs') || null;
const initialState = {userSignIn:{userInfo},logData:{logInfo}}; 
const reducer = combineReducers({
  userSignIn:userSignInReducer,
  checkURL:pingReducer,
  logData:logReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))
export default store;