import React, { PureComponent, useEffect } from 'react';
import Layout from '../src/layouts/Layout';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { gql, useQuery } from '@apollo/client';

const BEST_SELLERS = gql`
  query bestSellers {
    bestSellers {
      seller {
        name
      }
      total
    }
  }
`;
const Sellers = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(BEST_SELLERS);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) {
    return 'Loading...';
  }
  const newBestSellers = data.bestSellers.map(({ seller, total }) => ({
    ...seller[0],
    total,
  }));
  console.log(data);

  return (
    <div>
      <Layout>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={newBestSellers}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Layout>
    </div>
  );
};

export default Sellers;
