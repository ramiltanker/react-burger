import React from "react";

// Стили
import modalOverlayStyles from "./ModalOverlay.module.css";
// Стили

function ModalOverlay(props) {
  return (
    <div
      className={modalOverlayStyles.overlay}
      onClick={(e) => {
        props.closeModal(e);
      }}
    ></div>
  );
}

export default ModalOverlay;
