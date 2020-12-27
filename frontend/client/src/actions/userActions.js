import { GET_LOG_FAIL, GET_LOG_REQUEST, GET_LOG_SUCCESS, GET_RESPONSE_TIME_FAIL, GET_RESPONSE_TIME_REQUEST, GET_RESPONSE_TIME_SUCCESS, USER_SIGN_IN_FAIL, USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS } from "../constants/UserConstants"
import axios from 'axios'
import Cookie from 'js-cookie'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
const signin = (email,password) => async(dispatch) =>{
  dispatch({type:USER_SIGN_IN_REQUEST,payload:{email,password}});
  try {
      const {data} = await axios.post('/user/login',{email,password});
      const result = jwt_decode(data.token)
      dispatch({type:USER_SIGN_IN_SUCCESS,payload:result});
      Cookie.set('userInfo',JSON.stringify(result));
      Cookie.set('token',JSON.stringify(data.token))
      setAuthToken(data.token)
  } catch (error) {
    dispatch({type:USER_SIGN_IN_FAIL,payload:error.message})
  }
}

const CheckSpeed = (url,time)=>async (dispatch)=>{
  dispatch({type:GET_RESPONSE_TIME_REQUEST,payload:{time,url}});
  try {
    const {data} = await axios.get(`/url/checkTime?url=${url}&&time=${time}`,{headers:{
      Autherization:'Bearer '+Cookie.getJSON('token') 
    }});
    dispatch({type:GET_RESPONSE_TIME_SUCCESS,payload:data});
    dispatch(getlogs())
  } catch (error) {
    dispatch({type:GET_RESPONSE_TIME_FAIL,payload:error.message});
  }

}

const getlogs = () => async(dispatch)=>{
  
  try {
    Cookie.remove('logs')
    dispatch({type:GET_LOG_REQUEST,payload:{}});
    const {data} = await axios.get('/user/getLogs',{headers:{
      Autherization:'Bearer '+Cookie.getJSON('token') 
    }});
    dispatch({type:GET_LOG_SUCCESS,payload:data})
    Cookie.set('logs',JSON.stringify(data))
  } catch (error) {
    dispatch({type:GET_LOG_FAIL,payload:error.message});
  }
}

export  {signin,CheckSpeed,getlogs};