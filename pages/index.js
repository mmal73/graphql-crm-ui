import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import ClientItem from '../src/components/ClientItem';
import MyLink from '../src/components/MyLink';
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
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const tHeaders = ['Name', 'Lastname', 'Company', 'Email', 'Phone', ''];

  if (loading) return 'Loading...';
  if (error) {
    router.push('/signin');
    return (
      <div className="my-2 bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-1 mx-auto mt-5 text-center">
        <p>{error.message}</p>
      </div>
    );
  }
  const clients = data.getClients;

  return (
    <div>
      <Layout>
        {error && (
          <div className="my-2 bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-1 mx-auto mt-5 text-center">
            <p>{error.message}</p>
          </div>
        )}
        <h2 className="text-3xl font-bold mb-5">Clients</h2>
        <MyLink url="/clients/create" name="Create New" />
        <div className="relative rounded-xl bg-blue-500 overflow-auto mt-5">
          <div className="shadow-sm overflow-hidden py-5">
            {clients.length ? (
              <table className="border-collapse table-auto w-full bg-white">
                <thead>
                  <tr>
                    {tHeaders.map((title) => (
                      <th
                        key={title}
                        className={
                          'px-4 bg-blue-500 text-white border-b text-left '
                        }
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {clients.map((client) => (
                    <ClientItem key={client.id} client={client} />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-white">Empty</div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Home;
