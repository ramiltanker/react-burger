export type TBurgerIngridientsArrayOfId = Array<string>;

export type TIngridient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TBurgerIngridients = Array<TIngridient>;

export type TOrder = {
  number: number;
};

export type TBurgerIngridientsOrder = {
  name: string;
  order: {
    createdAt: string;
    ingredients: Array<TIngridient>;
    name: string;
    number: number;
    owner: {
      createdAt: string;
      email: string;
      name: string;
      updatedAt: string;
    };
    price: string;
    status: string;
    updatedAt: string;
    _id: string;
  };
  success: boolean;
};

export type TBurgerConstructorIngridients = TBurgerIngridients;
