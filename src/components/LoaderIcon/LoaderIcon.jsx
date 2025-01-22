import React from "react";
import "./LoaderIcon.scss";

function LoaderIcon({ passInitial }) {
  const initialGreeting = "Welcome";

  return (
    <>
      <div className={`bodyContainer ${passInitial ? "bodyContainerHidden" : ""}`}>
        {initialGreeting.split("").map(
          (value, index) =>
            <span key={`bodyContainer-${index}`} >{value === " " ? <>&nbsp;</> : value}</span>)}
      </div>
    </>
  )
}

export default LoaderIcon;
