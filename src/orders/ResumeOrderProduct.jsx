import React, { useContext, useEffect, useState } from 'react';
import OrdersContext from '../context/orders/OrdersContext';

const ResumeOrderProduct = ({ product }) => {
  const { id, name, price } = product;
  const { updateProductQuantity } = useContext(OrdersContext);
  const [quantity, setQuantity] = useState(1);
  const updateProductsQuantity = (quantity) => {
    setQuantity(quantity);
  };

  useEffect(() => {
    updateProductQuantity(id, quantity);
  }, [quantity]);

  return (
    <div>
      <div className="md:flex md:justify-between md:items-center w-full">
        <div>
          <p className="text-thin">{name}</p>
          <p className="text-thin">${price}</p>
        </div>
        <div>
          <label htmlFor="">Quantity</label>
          <input
            value={quantity}
            onChange={(e) => updateProductsQuantity(e.target.value)}
            className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-gray-700 p-1 transition-colors duration-200 ease-in-out"
            type="number"
            placeholder="Quantity"
            min={1}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeOrderProduct;
