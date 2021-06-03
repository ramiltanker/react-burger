import React from "react";
import PropTypes from "prop-types";


// Стили
import inngredientDetailsStyles from "./IngredientDetails.module.css";
// Стили

function IngredientDetails(props) {
  return (
        <div className={inngredientDetailsStyles.ingridients}>
          <img
            src={props.ingridientInfo.image_large}
            alt={props.ingridientInfo.name}
            className={inngredientDetailsStyles.image}
          />
          <div className={`${inngredientDetailsStyles.container} mt-4 mb-15`}>
            <h2 className={inngredientDetailsStyles.title}>
              {props.ingridientInfo.name}
            </h2>
            <div className={`${inngredientDetailsStyles.nutrients} mt-8`}>
              <div className={`${inngredientDetailsStyles.nutrient} mr-5`}>
                <h3 className={inngredientDetailsStyles.nutrient_title}>
                  Калории,ккал
                </h3>
                <p className={inngredientDetailsStyles.nutrient_text}>
                  {props.ingridientInfo.calories}
                </p>
              </div>
              <div className={`${inngredientDetailsStyles.nutrient} mr-5`}>
                <h3 className={inngredientDetailsStyles.nutrient_title}>
                  Белки, г
                </h3>
                <p className={inngredientDetailsStyles.nutrient_text}>
                  {props.ingridientInfo.proteins}
                </p>
              </div>
              <div className={`${inngredientDetailsStyles.nutrient} mr-5`}>
                <h3 className={inngredientDetailsStyles.nutrient_title}>
                  Жиры, г
                </h3>
                <p className={inngredientDetailsStyles.nutrient_text}>
                  {props.ingridientInfo.fat}
                </p>
              </div>
              <div className={`${inngredientDetailsStyles.nutrient} mr-5`}>
                <h3 className={inngredientDetailsStyles.nutrient_title}>
                  Углеводы, г
                </h3>
                <p className={inngredientDetailsStyles.nutrient_text}>
                  {props.ingridientInfo.carbohydrates}
                </p>
              </div>
            </div>
          </div>
        </div>
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  ingridientInfo: PropTypes.shape({
    _id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.any,
    image_mobile: PropTypes.any,
    image_large: PropTypes.any,
    __v: PropTypes.number.isRequired,
  }),
};
