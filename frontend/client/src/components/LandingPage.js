import React, { Component, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookie from 'js-cookie'
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
function Landing (props) {
    const userSignIn = useSelector(state => state.userSignIn)
    const{loading,userInfo,error}  = userSignIn
    useEffect(() => {
      if(!userInfo){
        props.history.push('/login')
      }
      return () => {
        //cleanup
      }
    }, [userInfo])
    return (
      <>
      {userInfo?<><Dashboard/></>:
      <>
      <Router>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </Router>
      </>
      }
      </>
    );
  
}
export default Landing;