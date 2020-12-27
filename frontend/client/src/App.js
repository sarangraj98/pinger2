import './App.css';
import Landing from './components/LandingPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import { Provider } from 'react-redux'
import store from './store'
import Dashboard from './components/Dashboard';
import axios from 'axios';
import Cookie from 'js-cookie'
import { useEffect } from 'react';
import Navbar from './components/Navber';
import Log from './components/Log';


function App() {
  useEffect(() => {
    async function getAlerts() {
      const {data}=await axios.get('/url/intervelCheck',{
        headers:{
          Autherization:'Bearer '+ Cookie.getJSON('token')
        }

      });
    }
    getAlerts()
    const interval = setInterval(() => getAlerts(), 300000)
    return () => {
      clearInterval(interval);
    }
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Landing} />
          <Route  path="/register" component={Register} />
          <Route  path="/login" component={Login} />
          <Route  path="/user" component={Dashboard} />
          <Route exact path="/monitor" component={Log} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
