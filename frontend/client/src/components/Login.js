import React, {  useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import { useSelector, useDispatch } from 'react-redux';
function Login(props) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('')
    const userSignIn = useSelector(state => state.userSignIn)

    const {loading,error,userInfo} = userSignIn
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email,password))
        //console.log(email,password)
    }
    useEffect(() => {
        if(userInfo){
            props.history.push('/user');
        }
        return () => {
           // cleanup
        }
    }, [userInfo])
   console.log(userInfo,loading)
    return (
        <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Login</b> below
              </h4>
                        <p className="grey-text text-darken-1">
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={submitHandler}>
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
                                Login
                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Login;