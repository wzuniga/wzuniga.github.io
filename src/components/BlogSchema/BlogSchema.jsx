import { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation"
//import StarrySky from "../sky/sky";
import "./BlogSchema.css"

export default function BlogSchema({ charDiv, description, pageDesc }) {
  const [userKey, setUserKey] = useState(undefined);
  const [ip, setIp] = useState({})

  const getIp = async () => {
    const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=f8e0b361e8f4405c94613ab534959fdf');
    const data = await response.json();
    setIp(data);
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
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return Math.random().toString(36).substr(2) + "--undefined";
    }
  }

  const setItemLocal = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.error("No set item")
    }
  }

  useEffect(() => {
    if (Object.keys(ip).length !== 0) {
      sendTrackBack(pageDesc);
    }
  }, [userKey, ip, pageDesc, sendTrackBack])

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
    <div>
      <Navigation sendTrackBack={sendTrackBack} external={true} />
      <div className="innerChar">
        {charDiv}
      </div>
      <div className="innerDescription">
        {description}
      </div>
    </div>
  )
}
