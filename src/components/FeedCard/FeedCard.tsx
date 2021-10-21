import React, { FunctionComponent } from "react";

// Стили
import feedCardStyles from "./FeedCard.module.css";
// Стили

// UI
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// UI

import { Link, useLocation } from "react-router-dom";

// Types
import { TLocation } from "../../types";
import { TFeedOrder } from "../../types/feed";
import { TImages, TPriceArr } from "../../types";
// Types

interface IFeedCardProps {
  order: TFeedOrder;
  day: number;
  time: string;
  key: string;
  images: TImages;
  price: number;
  handleOpenFeedModal: () => void;
}

type FC<P = {}> = FunctionComponent<P>;

const FeedCard: FC<IFeedCardProps> = (props) => {
  const [imageArr, setImageArr] = React.useState<TImages>();

  const location = useLocation<TLocation>();
  const date = new Date();
  const todayDay = date.getDate();

  React.useEffect(() => {
    if (props.images) {
      props.images.length > 5
        ? setImageArr(props.images.slice(0, 6))
        : setImageArr(props.images);
    }
  }, [props.images]);

  return (
    <Link
      className={feedCardStyles.link}
      onClick={props.handleOpenFeedModal}
      to={{
        pathname: `/feed/${props.order._id}`,
        state: { background: location },
      }}
    >
      <div className={feedCardStyles.card}>
        <div className={feedCardStyles.box}>
          <p className={`${feedCardStyles.code} text text_type_digits-default`}>
            #{props.order.number}
          </p>
          <p
            className={`${feedCardStyles.time} text text_type_main-default text_color_inactive`}
          >
            {todayDay === props.day
              ? `Сегодня, `
              : todayDay - props.day === 1
              ? `${todayDay - props.day} день назад, `
              : `${todayDay - props.day} дня назад, `}
            {props.time} i-GMT+3
          </p>
        </div>
        <p className={`${feedCardStyles.name} text text_type_main-medium`}>
          {props.order.name}
        </p>
        <div className={feedCardStyles.burger_info}>
          <ul className={feedCardStyles.images_list}>
            {imageArr &&
              imageArr.map((src, index) => {
                let leftMove;

                if (index) {
                  leftMove = -10 * index;
                }

                const lastImage =
                  index === 5 && props.images.length > 6 ? true : false;

                return (
                  <li
                    className={feedCardStyles.image_li}
                    style={{ left: leftMove }}
                    key={index}
                  >
                    <img
                      src={src}
                      alt="test"
                      className={`
                    ${feedCardStyles.image}
                      ${
                        lastImage
                          ? feedCardStyles.lastImage
                          : feedCardStyles.image
                      }`}
                    />
                    <p
                      className={`text text_type_digits-default ${
                        lastImage
                          ? feedCardStyles.image_number
                          : feedCardStyles.image_number_none
                      }`}
                    >
                      +
                      {props.images &&
                        imageArr &&
                        props.images.length - imageArr.length}
                    </p>
                  </li>
                );
              })}
          </ul>
          <div className={feedCardStyles.price_box}>
            <p
              className={`${feedCardStyles.price} text text_type_digits-default`}
            >
              {props.price}
            </p>
            <CurrencyIcon type={"secondary"} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeedCard;
