import ORDER_ACTIONS from '../../types';

const OrdersReducer = (state, action) => {
  switch (action.type) {
    case ORDER_ACTIONS.SELECT_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    default:
      throw Error;
  }
};

export default OrdersReducer;
