import { TUserOrder } from "../types/userOrders";
import { TFeedOrder } from "../types/feed";

export type TReturnObj = {
  todayDay: number;
  time: string;
  day: number;
};

const getTimeAndDay = (obj: TUserOrder | TFeedOrder | undefined) => {
  const date = new Date();
  const todayDay: number = date.getDate();

  const createdTime: string = obj! && obj!.createdAt!;

  const time: string = createdTime && createdTime.match(/\d\d:\d\d/gm)![0];

  const dayString: string =
    createdTime && createdTime.match(/\d\dT/gm)![0].match(/\d\d/gm)![0];

  const day: number = Number.parseInt(dayString);

  const returnObj: TReturnObj = {
    todayDay,
    time,
    day,
  };

  return returnObj;
};

export default getTimeAndDay;
