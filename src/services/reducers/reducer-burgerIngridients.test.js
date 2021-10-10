import { burgerIngridientsReducer, initialState } from "./burgerIngridients";

import {
  GET_BURGER_INGRIDIENTS_REQUEST,
  GET_BURGER_INGRIDIENTS_SUCCESS,
  GET_BURGER_INGRIDIENTS_FAILED,
  GET_BURGER_CONSTRUCTOR_REQUEST,
  GET_BURGER_CONSTRUCTOR_SUCCESS,
  GET_BURGER_CONSTRUCTOR_FAILED,
  GET_BURGER_CONSTRUCTOR_ADD_ITEM,
  GET_BURGER_CONSTRUCTOR_DELETE_ITEM,
  MOVE_CONSTRUCTOR_ITEM,
  POST_SEND_ORDER_REQUEST,
  POST_SEND_ORDER_SUCCESS,
  POST_SEND_ORDER_FAILED,
  COST_TOTAL_PRICE,
  DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER,
} from "../actions/burgerIngridients";

describe("burgerIngridients reducer", () => {
  it("should return the initial state", () => {
    expect(burgerIngridientsReducer(undefined, {})).toEqual({
      burgerIngridientsArr: [],
      burgerIngridientsRequest: false,
      burgerIngridientsFailed: false,

      burgerConstructorIngridients: [],
      bun: {},
      burgerConstructorIngridientsFailed: false,
      burgerConstructorIngridientsRequest: false,

      currentIngridient: {},

      order: {},
      orderRequest: false,
      orderFailed: false,

      totalPrice: 0,
    });
  });

  it("should handle GET_BURGER_INGRIDIENTS_REQUEST", () => {
    expect(
      burgerIngridientsReducer(initialState, {
        type: GET_BURGER_INGRIDIENTS_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        burgerIngridientsRequest: true,
      })
    );
  });

  it("should handle GET_BURGER_INGRIDIENTS_SUCCESS", () => {
    expect(
      burgerIngridientsReducer(initialState, {
        type: GET_BURGER_INGRIDIENTS_SUCCESS,
        burgerIngridientsArr: [{ ingridient: 1 }],
      })
    ).toEqual(
      expect.objectContaining({
        burgerIngridientsArr: [{ ingridient: 1 }],
      })
    );
  });

  it("should handle GET_BURGER_INGRIDIENTS_FAILED", () => {
    expect(
      burgerIngridientsReducer(initialState, {
        type: GET_BURGER_INGRIDIENTS_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        burgerIngridientsFailed: true,
        burgerIngridientsRequest: false,
      })
    );
  });

  it("should handle GET_BURGER_CONSTRUCTOR_REQUEST", () => {
    expect(
      burgerIngridientsReducer(initialState, {
        type: GET_BURGER_CONSTRUCTOR_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        burgerConstructorIngridientsRequest: true,
      })
    );
  });

  it("should handle GET_BURGER_CONSTRUCTOR_SUCCESS", () => {
    expect(
      burgerIngridientsReducer(initialState, {
        type: GET_BURGER_CONSTRUCTOR_SUCCESS,
        burgerConstructorIngridients: [{ ingridient: 1 }],
      })
    ).toEqual(
      expect.objectContaining({
        burgerConstructorIngridientsFailed: false,
        burgerConstructorIngridients: [{ ingridient: 1 }],
        burgerConstructorIngridientsRequest: false,
      })
    );
  });

  it("should handle GET_BURGER_CONSTRUCTOR_FAILED", () => {
    expect(
      burgerIngridientsReducer(initialState, {
        type: GET_BURGER_CONSTRUCTOR_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        burgerConstructorIngridientsFailed: true,
        burgerConstructorIngridientsRequest: false,
      })
    );
  });

  it("should handle GET_BURGER_CONSTRUCTOR_ADD_ITEM(bun)", () => {
    expect(
      burgerIngridientsReducer(initialState, {
        type: GET_BURGER_CONSTRUCTOR_ADD_ITEM,
        ingType: "bun",
        item: { ingridient: 1 },
      })
    ).toEqual(
      expect.objectContaining({
        bun: { ingridient: 1 },
      })
    );
  });

  it("should handle GET_BURGER_CONSTRUCTOR_ADD_ITEM(main || sauce)", () => {
    expect(
      burgerIngridientsReducer(
        {
          burgerIngridientsArr: [
            { ingridient: 1, _id: 0 },
            { ingridient: 2, _id: 1 },
          ],

          burgerConstructorIngridients: [],
        },
        {
          type: GET_BURGER_CONSTRUCTOR_ADD_ITEM,
          ingType: "main",
          id: 0,
        }
      )
    ).toEqual({
      burgerIngridientsArr: [
        { ingridient: 1, _id: 0 },
        { ingridient: 2, _id: 1 },
      ],

      burgerConstructorIngridients: [{ ingridient: 1, _id: 0 }],
    });
  });

  it("should handle GET_BURGER_CONSTRUCTOR_DELETE_ITEM(bun)", () => {
    expect(
      burgerIngridientsReducer(
        {
          bun: { _id: 0 },
        },
        {
          type: GET_BURGER_CONSTRUCTOR_DELETE_ITEM,
          ingType: "bun",
          id: 0,
        }
      )
    ).toEqual(
      expect.objectContaining({
        bun: "",
      })
    );
  });

  it("should handle GET_BURGER_CONSTRUCTOR_DELETE_ITEM(main || sauce)", () => {
    expect(
      burgerIngridientsReducer(
        {
          burgerConstructorIngridients: [
            { ingridient: 1, _id: 0 },
            { ingridient: 2, _id: 1 },
          ],
        },
        {
          type: GET_BURGER_CONSTRUCTOR_DELETE_ITEM,
          ingType: "main",
          ingIndex: 0,
        }
      )
    ).toEqual({
      burgerConstructorIngridients: [{ ingridient: 2, _id: 1 }],
    });
  });

  it("should handle MOVE_CONSTRUCTOR_ITEM", () => {
    expect(
      burgerIngridientsReducer(
        {
          burgerConstructorIngridients: [
            { ingridient: 1, _id: 0 },
            { ingridient: 2, _id: 1 },
          ],
        },
        {
          type: MOVE_CONSTRUCTOR_ITEM,
          dragIndex: 0,
          replacedIndex: 1
        }
      )
    ).toEqual(
      {
        burgerConstructorIngridients: [
          { ingridient: 2, _id: 1 },
          { ingridient: 1, _id: 0 },
        ],
      }
    );
  });

  it("should handle POST_SEND_ORDER_REQUEST", () => {
    expect(
      burgerIngridientsReducer(initialState, {
        type: POST_SEND_ORDER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        orderRequest: true,
      })
    );
  });

  it("should handle POST_SEND_ORDER_SUCCESS", () => {
    expect(
      burgerIngridientsReducer(initialState, {
        type: POST_SEND_ORDER_SUCCESS,
        order: { order: 1 },
      })
    ).toEqual(
      expect.objectContaining({
        orderRequest: false,
        orderFailed: false,
        order: { order: 1 },
      })
    );
  });

  it("should handle POST_SEND_ORDER_FAILED", () => {
    expect(
      burgerIngridientsReducer(initialState, {
        type: POST_SEND_ORDER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        orderRequest: false,
        orderFailed: true,
      })
    );
  });

  it("should handle DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER", () => {
    expect(
      burgerIngridientsReducer(initialState, {
        type: DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER,
      })
    ).toEqual(
      expect.objectContaining({
        totalPrice: 0,
        burgerConstructorIngridients: [],
        bun: {},
      })
    );
  });

  it("should handle COST_TOTAL_PRICE", () => {
    expect(
      burgerIngridientsReducer(
        {
          bun: { price: 200 },
          burgerConstructorIngridients: [{ price: 200 }, { price: 100 }],
          totalPrice: 0,
        },
        {
          type: COST_TOTAL_PRICE,
        }
      )
    ).toEqual(
      expect.objectContaining({
        totalPrice: 700,
      })
    );
  });
});
