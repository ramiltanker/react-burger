import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";

// Стили
import inngredientDetailsStyles from "./IngredientDetails.module.css";
// Стили

// Types
import { TIngridient } from "../../types/burgerIngridients";
// Types

interface IIngredientDetailsProps {
  ingridientInfo?: TIngridient;
}

type FC<P = IIngredientDetailsProps> = FunctionComponent<P>;

const IngredientDetails: FC<IIngredientDetailsProps> = (props) => {
  return (
    <div className={inngredientDetailsStyles.ingridients}>
      <img
        src={props.ingridientInfo && props.ingridientInfo.image_large}
        alt={props.ingridientInfo && props.ingridientInfo.name}
        className={inngredientDetailsStyles.image}
      />
      <div className={`${inngredientDetailsStyles.container} mt-4 mb-15`}>
        <h2 className={inngredientDetailsStyles.title}>
          {props.ingridientInfo && props.ingridientInfo.name}
        </h2>
        <div className={`${inngredientDetailsStyles.nutrients} mt-8`}>
          <div className={`${inngredientDetailsStyles.nutrient} mr-5`}>
            <h3 className={inngredientDetailsStyles.nutrient_title}>
              Калории,ккал
            </h3>
            <p className={inngredientDetailsStyles.nutrient_text}>
              {props.ingridientInfo && props.ingridientInfo.calories}
            </p>
          </div>
          <div className={`${inngredientDetailsStyles.nutrient} mr-5`}>
            <h3 className={inngredientDetailsStyles.nutrient_title}>
              Белки, г
            </h3>
            <p className={inngredientDetailsStyles.nutrient_text}>
              {props.ingridientInfo && props.ingridientInfo.proteins}
            </p>
          </div>
          <div className={`${inngredientDetailsStyles.nutrient} mr-5`}>
            <h3 className={inngredientDetailsStyles.nutrient_title}>Жиры, г</h3>
            <p className={inngredientDetailsStyles.nutrient_text}>
              {props.ingridientInfo && props.ingridientInfo.fat}
            </p>
          </div>
          <div className={`${inngredientDetailsStyles.nutrient} mr-5`}>
            <h3 className={inngredientDetailsStyles.nutrient_title}>
              Углеводы, г
            </h3>
            <p className={inngredientDetailsStyles.nutrient_text}>
              {props.ingridientInfo && props.ingridientInfo.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
