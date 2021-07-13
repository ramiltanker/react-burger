import React from "react";

// Стили
import orderModalStyles from './OrderModal.module.css';
// Стили

function OrderModal() {
    return (
        <div className={orderModalStyles.modal}>
            <p className={`${orderModalStyles.code} mb-10 text text_type_digits-default`}>#034533</p>
            <p className={`${orderModalStyles.name} mb-3 text text_type_main-medium`}>Black Hole Singularity острый бургер</p>
            <p className={`${orderModalStyles.status} mb-15 text text_type_main-small`}>Выполнен</p>
            <p className={`${orderModalStyles.structure_title} mb-6 text text_type_main-medium`}>Состав:</p>
        </div>
    )
}

export default OrderModal;