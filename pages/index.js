import { gql, useQuery } from '@apollo/client';
import Layout from '../src/layouts/Layout';

const GET_CLIENTS = gql`
  query getClients {
    getClients {
      id
      name
      lastname
      company
      email
      phone
    }
  }
`;
const Home = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);

  if (loading || data) return 'Loading...';

  return (
    <div>
      <Layout>
        <h2 className="text-3xl font-bold">Home</h2>
      </Layout>
    </div>
  );
};
export default Home;
