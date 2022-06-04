import Layout from '../../src/layouts/Layout';
import MyLink from '../../src/components/MyLink';
import { gql, useQuery } from '@apollo/client';

const GET_ORDERS = gql`
  query getOrders {
    getOrders {
      id
      client
      status
    }
  }
`;
const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS);
  const tHeaders = ['Client', 'Status'];
  if (loading) {
    return 'Loading...';
  }
  const orders = data.getOrders;
  return (
    <div>
      <Layout>
        <h2 className="text-3xl font-bold">Orders</h2>
        <MyLink url="/orders/create" name="Create New" />
        <div className="relative rounded-xl bg-blue-500 overflow-auto mt-5">
          <div className="shadow-sm overflow-hidden py-5">
            {orders.length ? (
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
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="p-1 text-slate-500">{order.client}</td>
                      <td className="p-1 text-slate-500">{order.status}</td>
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
export default Orders;
