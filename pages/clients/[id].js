import React from 'react';
import { useRouter } from 'next/router';
import EditClient from '../../src/clients/EditClient';
import Layout from '../../src/layouts/Layout';

const Edit = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <Layout>
      <h2 className="text-3xl font-bold">Edit Client</h2>
      <div className="w-full">{id && <EditClient id={id} />}</div>
    </Layout>
  );
};

export default Edit;
