import React from "react";
import { Link } from "react-router-dom";
import '../style/navigation.css'
import Cookie from 'js-cookie'
import { useSelector } from "react-redux";
export default function Navbar() {
  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn
  const logout = () => {
    Cookie.remove('token');
    Cookie.remove('userInfo');
    window.location.reload()
  }
  return (
    <>
      <div className="navigation">
        <Link to="/user" className="navbar-brand">Pinger</Link>
        <ul style={{ float: "right" }}>
          {userInfo ?
            <>
              <li style={{ display: "inline-block" }}>
                <Link to="/user">Home</Link>
              </li>
              <li style={{ display: "inline-block" }}>
                <Link to="/monitor">Monitor</Link>
              </li>
              <li style={{ display: "inline-block" }} onClick={logout}>
                <div className="logout">
                  <Link onClick={logout} style={{ color: "white" }}>Logout</Link>
                </div>
              </li>
            </> :
            <>
              <li style={{ display: "inline-block" }}>
                <Link to="/login">Login</Link>
              </li>
              <li style={{ display: "inline-block" }}>
                <Link to="/register">Register</Link>
              </li>
            </>
          }
        </ul>
      </div>
    </>
  );

}