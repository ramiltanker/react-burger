import React from "react";
import PropTypes from "prop-types";

import { useParams } from "react-router";

// redux
import { useSelector, useDispatch } from "react-redux";

import { getIngridients } from "../../services/actions/burgerIngridients";
// redux

// Types
import { TIngridient } from "../../types/burgerIngridients";

import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import { RootState, AppThunk, AppDispatch } from "../../types/index";
// Types

// СТИЛИ
import ingridientsIdPageStyles from "./IngridientsIdPage.module.css";
// СТИЛИ

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader";
// Компоненты

function IngridientsIdPage() {
  // Теперь этот хук «знает» структуру хранилища
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  // Хук не даст отправить экшен, который ему не знаком
  const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

  const [currentIng, setCurrentIng] = React.useState<TIngridient>();

  const dispatch = useDispatch();

  const { id } = useParams<{ id?: string }>();

  React.useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  const { burgerIngridientsArr } = useSelector(
    (state) => state.burgerIngridients
  );

  React.useEffect(() => {
    let ingridient;
    burgerIngridientsArr.forEach((ing: TIngridient) => {
      if (ing._id === id) ingridient = ing;
    });

    setCurrentIng(ingridient);
  }, [burgerIngridientsArr, id]);

  return (
    <>
      <AppHeader />
      <div className={ingridientsIdPageStyles.ingridients}>
        <h2
          className={`${ingridientsIdPageStyles.title} text text_type_main-large`}
        >
          Детали ингредиента
        </h2>
        <img
          src={currentIng && currentIng.image_large}
          alt={currentIng && currentIng.name}
          className={ingridientsIdPageStyles.image}
        />
        <div className={`${ingridientsIdPageStyles.container} mt-4 mb-15`}>
          <h2 className={ingridientsIdPageStyles.title}>
            {currentIng && currentIng.name}
          </h2>
          <div className={`${ingridientsIdPageStyles.nutrients} mt-8`}>
            <div className={`${ingridientsIdPageStyles.nutrient} mr-5`}>
              <h3 className={ingridientsIdPageStyles.nutrient_title}>
                Калории,ккал
              </h3>
              <p className={ingridientsIdPageStyles.nutrient_text}>
                {currentIng && currentIng.calories}
              </p>
            </div>
            <div className={`${ingridientsIdPageStyles.nutrient} mr-5`}>
              <h3 className={ingridientsIdPageStyles.nutrient_title}>
                Белки, г
              </h3>
              <p className={ingridientsIdPageStyles.nutrient_text}>
                {currentIng && currentIng.proteins}
              </p>
            </div>
            <div className={`${ingridientsIdPageStyles.nutrient} mr-5`}>
              <h3 className={ingridientsIdPageStyles.nutrient_title}>
                Жиры, г
              </h3>
              <p className={ingridientsIdPageStyles.nutrient_text}>
                {currentIng && currentIng.fat}
              </p>
            </div>
            <div className={`${ingridientsIdPageStyles.nutrient} mr-5`}>
              <h3 className={ingridientsIdPageStyles.nutrient_title}>
                Углеводы, г
              </h3>
              <p className={ingridientsIdPageStyles.nutrient_text}>
                {currentIng && currentIng.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IngridientsIdPage;
