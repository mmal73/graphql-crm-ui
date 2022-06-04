import ORDER_ACTIONS from '../../types';

const calculateTotal = (products) => {
  return products.reduce(function (accumulator, curValue) {
    return accumulator + curValue.price * curValue.quantity;
  }, 0);
};
const OrdersReducer = (state, action) => {
  switch (action.type) {
    case ORDER_ACTIONS.SELECT_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case ORDER_ACTIONS.SELECT_PRODUCT:
      const products = action.payload;
      let total = state.total;
      if (products) {
        total = calculateTotal(products);
      }
      return {
        ...state,
        products,
        total,
      };
    default:
      throw Error;
  }
};

export default OrdersReducer;
