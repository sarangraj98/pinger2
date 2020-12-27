import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckSpeed } from '../actions/userActions'
import '../style/homepage.css'
import { getlogs } from '../actions/userActions'
export default function HomePage() {
    const checkURL = useSelector(state => state.checkURL)
    const { loading, urlInfo } = checkURL
    const logData = useSelector(state => state.logData)
    const { loader, logInfo } = logData
    const dispatch = useDispatch()
    const [url, seturl] = useState('')
    const [time, setTime] = useState('')
    useEffect(() => {
        if (!(logInfo)) {
            dispatch(getlogs())
        }

        return () => {

        }
    }, [logInfo])
    const submitHandler = (e) => {
        e.preventDefault();
        if (url === '' || time === '') {
            alert('Please fill the required fields')
        } else {
            dispatch(CheckSpeed(url, time))
            dispatch(getlogs())
        }


    }
    return (
        <div className="col-md-6">
            <div className="content">

                <form noValidate onSubmit={submitHandler}>
                    <div className="input-field col s12">
                        <input
                            onChange={(e) => seturl(e.target.value)}
                            value={url}
                            placeholder="Enter URL"
                            required
                        />

                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                            type="number"
                            placeholder="Enter time"
                            required
                        />

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
                            CheckSpeed
                </button>
                    </div>
                </form>
                <div className="response-section">
                    {loading ? <div class="loader"></div> : <></>}
                    {urlInfo ? <>
                        {urlInfo.message} <br></br>
                        Responded in <strong>{urlInfo.responseTime} ms</strong>

                    </> : <></>}
                </div>
            </div>

        </div>
    )
}