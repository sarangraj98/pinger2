import { GET_LOG_FAIL, GET_LOG_REQUEST, GET_LOG_SUCCESS } from "../constants/UserConstants";


function logReducer (state={},action){
  switch (action.type){
    case GET_LOG_REQUEST:
      return {loader:true};
    case GET_LOG_SUCCESS:
      return {loader:false,logInfo:action.payload};
    case GET_LOG_FAIL:
      return {loader:false,error:action.payload};
    default:
      return state;
  }
}

export {logReducer}