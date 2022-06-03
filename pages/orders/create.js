import React from 'react';
import Layout from '../../src/layouts/Layout';
import AssignClient from '../../src/orders/AssignClient';

const Create = () => {
  return (
    <Layout>
      <h2 className="text-3xl font-bold">Create Order</h2>
      <form className="flex flex-col items-center">
        <div className="w-2/3">
          <AssignClient />
        </div>
        <div className="w-2/3"></div>
        <div className="w-2/3"></div>
        <div className="mt-3">
          <input
            type="button"
            className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
            value="Create"
          />
        </div>
      </form>
    </Layout>
  );
};

export default Create;
