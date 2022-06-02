import React from 'react';
import Router from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import FormProduct from './FormProduct';

const GET_PRODUCTS = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      stock
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      stock
      price
    }
  }
`;
const EditProduct = ({ id }) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      id,
    },
  });
  const [updateProduct, { errorM }] = useMutation(UPDATE_PRODUCT);

  if (loading) return 'Loading...';

  if (error || errorM) {
    return (
      <div className="my-2 bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-1 mx-auto mt-5 text-center">
        <p>{error.message}</p>
      </div>
    );
  }

  const { name, stock, price } = data.getProduct;
  const initialValues = {
    name,
    stock,
    price,
  };

  const handleSubmit = async ({ name, stock, price }) => {
    try {
      await updateProduct({
        variables: {
          id,
          input: { name, stock, price },
        },
      });
      Router.push('/products');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {error && (
        <div className="my-2 bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-1 mx-auto mt-5 text-center">
          <p>{error.message}</p>
        </div>
      )}
      <FormProduct
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        method="Edit"
      />
    </>
  );
};

export default EditProduct;
