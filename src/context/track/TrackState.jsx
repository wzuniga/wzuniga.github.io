import React, { useReducer } from "react";
import {
  TRACK_SET_STATE,
  TRACK_SEND_TRACK_BACK,
} from "./types";
import TrackReducer from "./TrackReducer";
import trackContext from "./TrackContext";

export default function TrackState(props) {

  const getIp = async () => {
    const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=f8e0b361e8f4405c94613ab534959fdf');
    const data = await response.json();
    return data;
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

  const defineUserLocal = () => {
    const userKeyLocal = getItemLocal("user-key-portfolio");
    if (userKeyLocal === "undefined" || userKeyLocal === null) {
      const new_key = Math.random().toString(36).substr(2);
      setItemLocal("user-key-portfolio", new_key)
      return new_key;
    } else {
      return userKeyLocal;
    }
  }

  const initalState = {
    userKey: defineUserLocal(),
    ip: getIp(),
  }

  const setTrackState = (state, newValue) => {
    dispatch({
      type: TRACK_SET_STATE,
      payload: {
        state: state,
        value: newValue,
      }
    })
  }

  const sendTrackBack = (page) => {
    console.log("$$$")
    dispatch({
      type: TRACK_SEND_TRACK_BACK,
      payload: {
        page: page,
      }
    })
  }

  const [state, dispatch] = useReducer(TrackReducer, initalState);

  return (
    <trackContext.Provider
      value={{
        userKey: state.userKey,
        ip: state.ip,
        setTrackState,
        sendTrackBack,
      }}
    >
      {props.children}
    </trackContext.Provider>
  );
}
