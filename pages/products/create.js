import React from 'react';
import Layout from '../../src/layouts/Layout';
import CreateProduct from '../../src/products/CreateProduct';

const Create = () => {
  return (
    <Layout>
      <h2 className="text-3xl font-bold">Create Product</h2>
      <div className="w-full">
        <CreateProduct />
      </div>
    </Layout>
  );
};

export default Create;
