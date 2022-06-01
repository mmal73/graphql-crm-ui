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

  console.log(data);

  const tHeaders = ['Name', 'Lastname', 'Company', 'Email', 'Phone'];

  if (loading) return 'Loading...';
  const clients = data.getClients;

  return (
    <div>
      <Layout>
        {error && (
          <div className="my-2 bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-1 mx-auto mt-5 text-center">
            <p>{error.message}</p>
          </div>
        )}
        <h2 className="text-3xl font-bold">Clients</h2>
        <div className="relative rounded-xl bg-blue-500 overflow-auto mt-8">
          <div className="shadow-sm overflow-hidden py-5">
            {clients.length ? (
              <table className="border-collapse table-auto w-full bg-white">
                <thead>
                  <tr>
                    {tHeaders.map((title, index) => (
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
                    <tr key={client.id}>
                      <td className="p-4 text-slate-500">{client.name}</td>
                      <td className="p-4 text-slate-500">{client.lastname}</td>
                      <td className="p-4 text-slate-500">{client.company}</td>
                      <td className="p-4 text-slate-500">{client.email}</td>
                      <td className="p-4 text-slate-500">{client.phone}</td>
                    </tr>
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
