import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import HomePage from './HomePage';


export default function Dashboard(props) {
    const userSignIn = useSelector(state => state.userSignIn)
    const {  userInfo } = userSignIn
    useEffect(() => {
        if (userInfo) {
        }
        else {
            props.history.push('/login');
        }
        return () => {

        }
    }, [userInfo])

    return (
        <>
        <HomePage/>
        </>
    )
}
