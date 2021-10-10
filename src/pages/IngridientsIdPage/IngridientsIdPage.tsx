import React from "react";

import { useParams } from "react-router";

// Types
import { TIngridient } from "../../types/burgerIngridients";
// Types

// СТИЛИ
import ingridientsIdPageStyles from "./IngridientsIdPage.module.css";
// СТИЛИ

// Types
import { useSelector } from "../../types/typedHooks";
// Types

function IngridientsIdPage() {
  const [currentIng, setCurrentIng] = React.useState<TIngridient>();

  const { id } = useParams<{ id?: string }>();

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
