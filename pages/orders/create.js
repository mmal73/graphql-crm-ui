import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import OrdersContext from '../../src/context/orders/OrdersContext';
import Layout from '../../src/layouts/Layout';
import AssignClient from '../../src/orders/AssignClient';
import AssignProducts from '../../src/orders/AssignProducts';
import ResumeOrder from '../../src/orders/ResumeOrder';

const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;
const Create = () => {
  const router = useRouter();
  const [newOrder, { data, loading, error }] = useMutation(NEW_ORDER);
  const [formValid, setFormValid] = useState(false);
  const {
    ordersState: { products, client, total },
  } = useContext(OrdersContext);

  useEffect(() => {
    if (products.length && client) {
      setFormValid(true);
    }
  }, [products, client]);

  const handleCreateOrder = async () => {
    const { id } = client;
    const order = products.map(
      ({ __typename, name, price, stock, ...product }) => ({ ...product })
    );
    try {
      await newOrder({
        variables: {
          input: {
            order,
            client: id,
            total: total,
            status: 'PENDING',
          },
        },
      });
      router.push('/orders');
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return 'Loading...';
  }
  return (
    <Layout>
      <h2 className="text-3xl font-bold">Create Order</h2>
      <form className="flex flex-col items-center">
        <div className="w-2/3 mb-3 shadow p-2">
          <AssignClient />
        </div>
        <div className="w-2/3 mb-3 shadow p-2">
          <AssignProducts />
        </div>
        <div className="w-2/3 mb-3 shadow p-2">
          <ResumeOrder />
        </div>
        <div className="mt-3">
          <button
            disabled={!formValid}
            onClick={handleCreateOrder}
            type="button"
            className={
              'text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg ' +
              (!formValid ? 'disabled:opacity-75' : '')
            }
          >
            Create
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Create;
