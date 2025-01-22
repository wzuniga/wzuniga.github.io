import React from "react";
import './Paragraph.css';

function Paragraph({ children, style, className}) {

  return (
    <div className={`custom-paragraph ${className}`} style={style}>
      {children}
    </div>
  );
}

export default Paragraph;
