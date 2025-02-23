import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import "./LoaderIcon.scss";

function LoaderIcon({ passInitial }) {
  const initialGreeting = "Welcome";
  const { theme } = useContext(ThemeContext);
  const containerStyle = { backgroundColor: theme === "day" ? "white" : "#2c3133" };

  return (
    <div style={containerStyle} className={`bodyContainer ${passInitial ? "bodyContainerHidden" : ""}`}>
      {initialGreeting.split("").map((value, index) =>
        <span key={`bodyContainer-${index}`}>
          {value === " " ? <>&nbsp;</> : value}
        </span>
      )}
    </div>
  );
}

export default LoaderIcon;
