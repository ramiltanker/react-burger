import React from "react";

// Стили
import modalStyles from "./Modal.module.css";
// Стили

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

// Компоненты
import ModalOverlay from '../ModalOverlay/ModalOverlay.js';
// Компоненты

function Modal(props) {
  return (
    <section className={props.isOpen ? modalStyles.modal : modalStyles.modal_hidden}>
      <div className={modalStyles.modal_wrapper}>
        <div className={`${modalStyles.header} mt-10`}>
          <h2 className={`${modalStyles.title} ml-10`}>{props.title}</h2>
          <button className={`${modalStyles.closeButton} mr-10`} type="button" onClick={props.handleCloseModal}><CloseIcon type="primary" /></button>
        </div>
        {props.children}
      </div>
      <ModalOverlay closeModal={props.handleCloseModal} />
    </section>
  );
}

export default Modal;