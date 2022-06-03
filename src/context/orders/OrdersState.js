import React, { useReducer } from 'react';
import ORDER_ACTIONS from '../../types';
import OrdersContext from './OrdersContext';
import OrdersReducer from './OrdersReducer';

const OrdersState = ({ children }) => {
  const initialState = {
    client: null,
    products: [],
    total: 0,
  };

  const [ordersState, dispatch] = useReducer(OrdersReducer, initialState);

  const addClient = (client) => {
    dispatch({
      type: ORDER_ACTIONS.SELECT_CLIENT,
      payload: client,
    });
  };

  return (
    <OrdersContext.Provider value={{ addClient }}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersState;
