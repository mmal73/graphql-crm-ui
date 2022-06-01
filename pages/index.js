import { gql, useQuery } from '@apollo/client';
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
                    <tr key={client.id}>
                      <td className="p-4 text-slate-500">{client.name}</td>
                      <td className="p-4 text-slate-500">{client.lastname}</td>
                      <td className="p-4 text-slate-500">{client.company}</td>
                      <td className="p-4 text-slate-500">{client.email}</td>
                      <td className="p-4 text-slate-500">{client.phone}</td>
                      <td className="p-4 text-slate-500">
                        <button
                          className="mb-1 py-1 px-2 bg-red-600 text-white rounded-md uppercase flex justify-between items-center text-sm uppercase font-bold"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                        <button
                          className="mb-1 py-1 px-2 bg-blue-600 text-white rounded-md uppercase flex justify-between items-center text-sm uppercase font-bold"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                      </td>
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
