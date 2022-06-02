import React from 'react';
import CreateClient from '../../src/clients/CreateClient';
import Layout from '../../src/layouts/Layout';

const Create = () => {
  return (
    <Layout>
      <h2 className="text-3xl font-bold">Create Client</h2>
      <div className="w-full">
        <CreateClient />
      </div>
    </Layout>
  );
};

export default Create;
