import React from "react";
import PropTypes from "prop-types";

import { useLocation, useHistory, useParams } from "react-router";

// redux
import { useSelector, useDispatch } from "react-redux";

import { getIngridients } from "../../services/actions/burgerIngridients";
// redux

// СТИЛИ
import ingridientsIdPageStyles from "./IngridientsIdPage.module.css";
// СТИЛИ

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader";
// Компоненты

function IngridientsIdPage() {
  const [currentIng, setCurrentIng] = React.useState({});

  const dispatch = useDispatch();

  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  const { burgerIngridientsArr } = useSelector(
    (state) => state.burgerIngridients
  );



  React.useEffect(() => {
    let ingridient;
    burgerIngridientsArr.forEach((ing) => {
      if (ing._id === id) ingridient = ing;
    });

    
    setCurrentIng(ingridient);

  }, [burgerIngridientsArr, id]);


  return (
    <>
    <AppHeader />
    <div className={ingridientsIdPageStyles.ingridients}>
      <h2 className={`${ingridientsIdPageStyles.title} text text_type_main-large`}>Детали ингредиента</h2>
      <img
        src={currentIng && currentIng.image_large}
        alt={currentIng && currentIng.name}
        className={ingridientsIdPageStyles.image}
      />
      <div className={`${ingridientsIdPageStyles.container} mt-4 mb-15`}>
        <h2 className={ingridientsIdPageStyles.title}>{currentIng && currentIng.name}</h2>
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
            <h3 className={ingridientsIdPageStyles.nutrient_title}>Белки, г</h3>
            <p className={ingridientsIdPageStyles.nutrient_text}>
              {currentIng && currentIng.proteins}
            </p>
          </div>
          <div className={`${ingridientsIdPageStyles.nutrient} mr-5`}>
            <h3 className={ingridientsIdPageStyles.nutrient_title}>Жиры, г</h3>
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

IngridientsIdPage.propTypes = {
  ingridientInfo: PropTypes.shape({
    _id: PropTypes.any,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.any,
    image_mobile: PropTypes.any,
    image_large: PropTypes.any,
    __v: PropTypes.number,
  }),
};

export default IngridientsIdPage;
