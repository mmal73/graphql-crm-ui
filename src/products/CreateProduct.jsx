import React from 'react';
import Router from 'next/router';
import { gql, useMutation } from '@apollo/client';
import FormProduct from './FormProduct';

const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      stock
      price
    }
  }
`;
const CreateProduct = () => {
  const [newProduct, { error }] = useMutation(NEW_PRODUCT, {
    update(cache, { data: { newProduct } }) {
      cache.modify({
        fields: {
          getProducts(existingProductsRefs = [], { readField }) {
            const newProductRef = cache.writeFragment({
              data: newProduct,
              fragment: gql`
                fragment newProduct on Product {
                  id
                  name
                  stock
                  price
                }
              `,
            });

            if (
              existingProductsRefs.some(
                (ref) => readField('id', ref) === newProduct.id
              )
            ) {
              return existingProductsRefs;
            }

            return [...existingProductsRefs, newProductRef];
          },
        },
      });
    },
  });

  const initialValues = {
    name: '',
    stock: '',
    price: '',
  };

  const handleSubmit = async ({ name, stock, price }) => {
    try {
      await newProduct({
        variables: {
          input: {
            name,
            stock,
            price,
          },
        },
      });
      Router.push('/products');
    } catch (error) {}
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
        method="Create"
      />
    </>
  );
};

export default CreateProduct;
