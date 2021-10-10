export type TUserOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TUserOrders = {
  orders: Array<TUserOrder>;
  total: number;
  totalToday: number;
};
