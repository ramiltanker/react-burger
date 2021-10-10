export type TFeedOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  number: number;
};

export type TFeedData = {
  orders: Array<TFeedOrder>;
  total: number;
  totalToday: number;
};
