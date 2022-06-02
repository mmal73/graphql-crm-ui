import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/layouts/Layout';
import EditProduct from '../../src/products/EditProduct';

const Edit = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <Layout>
      <h2 className="text-3xl font-bold">Edit Product</h2>
      <div className="w-full">{id && <EditProduct id={id} />}</div>
    </Layout>
  );
};

export default Edit;
