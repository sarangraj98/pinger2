import { USER_SIGN_IN_FAIL, USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS } from "../constants/UserConstants";


function userSignInReducer (state={},action){
  switch (action.type){
    case USER_SIGN_IN_REQUEST:
      return {loading:true};
    case USER_SIGN_IN_SUCCESS:
      return {loading:false,userInfo:action.payload};
    case USER_SIGN_IN_FAIL:
      return {loading:false,error:action.payload};
    default:
      return state;
  }
}

export {userSignInReducer}