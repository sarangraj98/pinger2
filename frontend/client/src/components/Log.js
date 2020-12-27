import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getlogs } from '../actions/userActions'
import Axios from 'axios'
import '../style/card.css'
import Cookie from 'js-cookie'

export default function Log() {
    const logData = useSelector(state => state.logData)
    const { loader, logInfo } = logData
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getlogs())
        return () => {

        }
    }, []);
    const deleteHandler = async (e) => {
        let id = e.currentTarget.id
        const { data } = await Axios.post('/user/deleteLog', { id }, {
            headers: {
                Autherization: 'Bearer ' + Cookie.getJSON('token')
            }
        });
        if (data == 'Success') {
            dispatch(getlogs());
        } else {
            alert('Something went wrong !')
            dispatch(getlogs());
        }
    }

    return (
        <>

            {loader ? <>loading</> : <>{
                logInfo.logs.map(item => {
                    return (
                        <div className="card card-2">
                            <strong style={{ textAlign: 'left' }}>URL</strong> : {item.url}<br />
                            <strong style={{ textAlign: 'left' }}>Configured Time</strong> : {item.time}<br />
                            <strong style={{ textAlign: 'left' }}>Last responded in</strong> : {item.lastResponded} ms<br />
                            <a id={item._id} onClick={deleteHandler}><img src="https://img.icons8.com/ios-filled/50/000000/delete-trash.png" className="delete-icon" /></a>
                        </div>
                    )
                })
            }</>}
        </>
    )
}