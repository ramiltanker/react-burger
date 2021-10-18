import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
// Стили
import modalStyles from "./Modal.module.css";
// Стили

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Компоненты
import ModalOverlay from "../ModalOverlay/ModalOverlay";
// Компоненты

const modalRoot = document.getElementById("react-modals")!;

interface IModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  children?: ReactNode;
}

class Modal extends React.Component<IModalProps> {
  handleCloseModal = () => {
    if (this.props.handleCloseModal) this.props.handleCloseModal();
  };

  render() {
    const { isOpen, handleCloseModal, children } = this.props;
    return ReactDOM.createPortal(
      <section
        className={isOpen ? modalStyles.modal : modalStyles.modal_hidden}
      >
        <div className={modalStyles.modal_wrapper}>
          <div className={`${modalStyles.header} mt-10`}>
            <h2 className={`${modalStyles.title} ml-10`}>{}</h2>
            <button
              className={`${modalStyles.closeButton} mr-10`}
              type="button"
              onClick={handleCloseModal}
            >
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
        <ModalOverlay closeModal={handleCloseModal} />
      </section>,
      modalRoot
    );
  }
}

export default Modal;
