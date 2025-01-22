import {
  TRACK_SET_STATE,
  TRACK_SEND_TRACK_BACK,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case TRACK_SET_STATE: {
      return {
        ...state,
        [action.payload.state]: action.payload.value
      }
    }
    case TRACK_SEND_TRACK_BACK: {
      console.log("1111")
      state.ip.then((data) => {
        console.log("2222")
        /*fetch("http://" + process.env.REACT_APP_BACKEND_TRACK_URL, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            ...data,
            region: data.state_prov,
            country: data.country_code2,
            version: data.isp,
            page: action.payload.page,
            user: state.userKey
          })
        });*/
      })
      return state;
    }
    default:
      break;
  }
};
