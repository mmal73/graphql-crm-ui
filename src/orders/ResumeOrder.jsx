import React, { useContext } from 'react';
import OrdersContext from '../context/orders/OrdersContext';
import ResumeOrderProduct from './ResumeOrderProduct';

const ResumeOrder = () => {
  const ordersContext = useContext(OrdersContext);
  const {
    ordersState: { products, total },
  } = ordersContext;

  return (
    <>
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-400 "></div>
        <h2 className="font-bold text-center p-2">Resume order</h2>
        <div className="flex-grow border-t border-gray-400 "></div>
      </div>
      {products &&
        products.map((product) => (
          <ResumeOrderProduct key={product.id} product={product} />
        ))}
      <div className="flex justify-around mt-3 text-xl">
        <h2 className="font-bold">Total</h2>
        <p>${total}</p>
      </div>
    </>
  );
};

export default ResumeOrder;
