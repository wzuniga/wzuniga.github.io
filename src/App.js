import React, { useEffect } from "react";
import Home from "./home";
import { useState } from "react";
import LoaderIcon from "./components/LoaderIcon/LoaderIcon";
import '@coreui/coreui/dist/css/coreui.min.css'

function App() {

  const [passInitial, setPassInitial] = useState(false);
  const [changeState, setChangeState] = useState(0);
  const [userKey, setUserKey] = useState(undefined);
  const [ip, setIp] = useState({})

  const timeoutId = setInterval(function () {
    if (changeState <= 1) {
      setChangeState(changeState + 1);
    }
  }, 4000);

  const getIp = async () => {
    // const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=c88615217b5e4c5d819f13193b856c3e');
    // const data = await response.json();
    // setIp(data);
  }

  const sendTrackBack = (page) => {
    /*fetch("http://" + process.env.REACT_APP_BACKEND_TRACK_URL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        ...ip,
        region: ip.state_prov,
        country: ip.country_code2,
        version: ip.isp,
        page: page,
        user: userKey
      })
    });*/
  }

  const getItemLocal = (key) => {
    try{
      return localStorage.getItem(key);
    } catch(err) {
      return Math.random().toString(36).substr(2) + "--undefined";
    }
  }

  const setItemLocal = (key, value) => {
    try{
      localStorage.setItem(key, value);
    } catch(err) {
      console.error("No set item")
    }
  }

  useEffect(() => {
    if (changeState === 1) {
      setPassInitial(true);
      clearTimeout(timeoutId);
    }
  }, [changeState, timeoutId]);

  useEffect(() => {
    if (Object.keys(ip).length !== 0){
      sendTrackBack("HOME");
    }
  }, [userKey, ip])

  if (userKey === undefined) {
    const userKeyLocal = getItemLocal("user-key-portfolio");
    getIp();
    if (userKeyLocal === "undefined" || userKeyLocal === null) {
      const new_key = Math.random().toString(36).substr(2);
      setItemLocal("user-key-portfolio", new_key)
      setUserKey(new_key);
    } else {
      setUserKey(userKeyLocal);
    }
  }

  return (
    <>
      <Home passInitial={passInitial} sendTrackBack={sendTrackBack}/>
      <LoaderIcon passInitial={passInitial} />
    </>
  );
}

export default App;
