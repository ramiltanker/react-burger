import React, { FunctionComponent } from "react";

// Стили
import modalOverlayStyles from "./ModalOverlay.module.css";
// Стили

interface IModalOverlayProps {
  closeModal: (e: any) => void;
}

type FC<P = IModalOverlayProps> = FunctionComponent<P>;

const ModalOverlay: FC<IModalOverlayProps> = (props) => {
  return (
    <div
      className={modalOverlayStyles.overlay}
      onClick={(e) => {
        props.closeModal(e);
      }}
    ></div>
  );
};

export default ModalOverlay;
