import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import OrdersContext from '../../src/context/orders/OrdersContext';
import GET_PRODUCTS from '../products/queries';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const AssignProducts = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState();
  const { addProduct } = useContext(OrdersContext);

  useEffect(() => {
    addProduct(products);
  }, [products]);

  const handleChangeProduct = (product) => {
    setProducts(product);
  };

  if (loading) return 'Loading...';
  const allProducts = data.getProducts;

  return (
    <>
      <p className="m-1">Select products</p>
      <Select
        isMulti
        components={animatedComponents}
        id="products-select"
        instanceId="products-select"
        name="products"
        onChange={(product) => handleChangeProduct(product)}
        options={allProducts}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select a product"
        noOptionsMessage={() => 'No results'}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) => `${options.name} ${options.stock}`}
        makeAnimated
      />
    </>
  );
};

export default AssignProducts;
