import React, { FunctionComponent } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

// DND
import { useDrop, useDrag } from "react-dnd";
// DND

// Redux
import { MOVE_CONSTRUCTOR_ITEM } from "../../services/actions/burgerIngridients";
// Redux

//   Стили
import constructorBurgerStyles from "./ConstructorBurgerCard.module.css";
// Стили

// Types
import { useDispatch as dispatchHook } from "react-redux";
import { AppThunk, AppDispatch } from "../../types/index";
// Types

interface IConstructorBurgerCard {
  key: number;
  item: any;
  ingIndex: number;
  close: () => void;
}

type FC<P = IConstructorBurgerCard> = FunctionComponent<P>;

const ConstructorBurgerCard: FC<IConstructorBurgerCard> = (props) => {
  // Хук не даст отправить экшен, который ему не знаком
  const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

  const ref = React.useRef<any | null>(null);

  const dispatch = useDispatch();
  // DND
  const [{ opacity }, dragRef] = useDrag({
    type: "constructor",
    item: {
      id: props.item._id,
      type: props.item.type,
      ing: props.item,
      ingIndex: props.ingIndex,
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, dropTarget] = useDrop({
    accept: "constructor",
    hover(item: any, monitor) {
      const dragIndex = item.ingIndex;
      const replacedIndex = props.ingIndex;

      if (dragIndex === replacedIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset: any = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < replacedIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > replacedIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({ type: MOVE_CONSTRUCTOR_ITEM, dragIndex, replacedIndex });

      item.ingIndex = replacedIndex;
    },
  });
  // DND

  dragRef(dropTarget(ref));

  return (
    <div
      className={constructorBurgerStyles.box}
      ref={ref}
      style={{ opacity: opacity }}
      data-testid="ingridient-card"
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={props.item.name}
        handleClose={props.close}
        price={props.item.price}
        thumbnail={props.item.image}
      />
    </div>
  );
};

export default ConstructorBurgerCard;
