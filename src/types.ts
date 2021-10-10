import { TIngridient } from "./types/burgerIngridients";

export type TLocationItem = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: null;
};

export type TLocation = {
  hash: string;
  key: string;
  pathname: string;
  from: TLocationItem;
  search: string;
  state: { background: TLocationItem } | null;
  background: TLocationItem;
};

export type TBurgerIngridient = {
  _id: string;
  type: string;
  ing: TIngridient;
  ingIndex?: number;
};

export type TCounter = {
  [key: string]: number;
};

export type TIngridients = Array<string>;

export type TImages = Array<string>;

export type TPriceArr = Array<TIngridient>;

export type TClientOffset = {
  x: number;
  y: number;
};
