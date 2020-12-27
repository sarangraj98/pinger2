import Axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Register(props) {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const submitHandler = async (e) => {
    e.preventDefault()
    const { data } = await Axios.post('/user/register', { email, password });
    if (data == 'Success') {
      props.history.push('/login');
    } else {
      alert('Please try again !')
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Register</b> below
              </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form onSubmit={submitHandler}>
            <div className="input-field col s12">
              <input
                onChange={(e) => setemail(e.target.value)}
                value={email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Sign up
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;