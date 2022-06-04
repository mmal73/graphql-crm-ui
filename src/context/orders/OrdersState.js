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
    if (!client) {
      return;
    }
    dispatch({
      type: ORDER_ACTIONS.SELECT_CLIENT,
      payload: client,
    });
  };

  const addProduct = (products) => {
    if (!products) {
      return;
    }
    let stateProducts = ordersState.products;
    let newSchemaProducts;
    if (!stateProducts) {
      newSchemaProducts = products.map((product) => ({
        ...product,
        quantity: 1,
      }));
    } else {
      newSchemaProducts = products.map((product) => {
        const findProduct = stateProducts.find((p) => p.id == product.id);
        if (!findProduct) {
          return {
            ...product,
            quantity: 1,
          };
        } else {
          return findProduct;
        }
      });
    }
    dispatch({
      type: ORDER_ACTIONS.SELECT_PRODUCT,
      payload: newSchemaProducts,
    });
  };

  const updateProductQuantity = (productId, quantity) => {
    const stateProducts = ordersState.products;
    if (!stateProducts) {
      return;
    }
    const newStateProducts = stateProducts.map((product) =>
      product.id == productId
        ? { ...product, quantity: Number(quantity) }
        : product
    );

    dispatch({
      type: ORDER_ACTIONS.SELECT_PRODUCT,
      payload: newStateProducts,
    });
  };

  return (
    <OrdersContext.Provider
      value={{
        ordersState,
        addClient,
        addProduct,
        updateProductQuantity,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersState;
