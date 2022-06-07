import React, { useEffect } from 'react';
import Layout from '../src/layouts/Layout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { gql, useQuery } from '@apollo/client';

const BEST_CLIENTS = gql`
  query bestClients {
    bestClients {
      client {
        name
      }
      total
    }
  }
`;
const BestClients = () => {
  const { data, loading, startPolling, stopPolling } = useQuery(BEST_CLIENTS);

  useEffect(() => {
    startPolling(3000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling, loading]);

  if (loading) {
    return 'Loading...';
  }

  const newBestClients = data.bestClients.map(({ client, total }) => ({
    ...client[0],
    total,
  }));

  return (
    <div>
      <Layout>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={newBestClients}
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

export default BestClients;
