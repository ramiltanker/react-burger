export type TFeedOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  number: number;
};

export type TFeedData = {
  orders: Array<TFeedOrder>;
  total: number;
  totalToday: number;
};
