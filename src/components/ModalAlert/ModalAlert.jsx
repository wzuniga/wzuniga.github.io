import React, { useState } from "react";
import "./ModalAlert.scss";

function ModalAlert() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-alert">
        <h2>Version 1.2.6 - Updates</h2>
        <ul>
          <li>Enhanced modal design with smoother transitions and updated layout.</li>
          <li>Improved mobile navigation.</li>
          <li>Refined theme toggle switch featuring sliding labels for Day and Night.</li>
          <li>Updated work experience details based on recent improvements.</li>
        </ul>
        <button onClick={() => setVisible(false)}>Close</button>
      </div>
    </div>
  );
}

export default ModalAlert;
