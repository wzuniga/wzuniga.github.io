import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import "./ThemeToggleSwitch.scss";

function ThemeToggleSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`theme-toggle-switch ${theme}`}>
      <span className={`toggle-label toggle-right toggle-${theme}`}>Day</span>
      <input 
        type="checkbox" 
        id="themeToggle" 
        onChange={toggleTheme} 
        checked={theme === "night"} 
      />
      <label htmlFor="themeToggle"></label>
      <span className={`toggle-label toggle-left toggle-${theme}`}>Night</span>
    </div>
  );
}

export default ThemeToggleSwitch;
