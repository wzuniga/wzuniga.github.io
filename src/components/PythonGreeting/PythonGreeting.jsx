import React from "react";
import Draggable from "react-draggable";
import "./PythonGreeting.scss";

function PythonGreeting() {
  return (
    <div className="python-greeting-wrapper">
      <Draggable>
        <div className="python-greeting" title="Arrástrame">
          <div className="corner-top-right"></div>
          <div className="corner-bottom-left"></div>
          <div className="python-line python-line-1">
            <span className="python-keyword">print</span>
            <span className="python-parenthesis">(</span>
            <span className="python-string">"Hello I'm Walter"</span>
            <span className="python-parenthesis">)</span>
          </div>
          <div className="python-line python-line-2">
            <span className="python-keyword">print</span>
            <span className="python-parenthesis">(</span>
            <span className="python-string">"I'm a </span>
            <span className="python-string python-bold">Fullstack developer</span>
            <span className="python-string">"</span>
            <span className="python-parenthesis">)</span>
          </div>
        </div>
      </Draggable>
     </div>
  );
}

export default PythonGreeting;
