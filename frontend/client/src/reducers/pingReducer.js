import { GET_RESPONSE_TIME_FAIL, GET_RESPONSE_TIME_REQUEST, GET_RESPONSE_TIME_SUCCESS } from "../constants/UserConstants";


function pingReducer (state={},action){
  switch (action.type){
    case GET_RESPONSE_TIME_REQUEST:
      return {loading:true};
    case GET_RESPONSE_TIME_SUCCESS:
      return {loading:false,urlInfo:action.payload};
    case GET_RESPONSE_TIME_FAIL:
      return {loading:false,error:action.payload};
    default:
      return state;
  }
}

export {pingReducer}