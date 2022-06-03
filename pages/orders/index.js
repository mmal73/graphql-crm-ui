import Layout from '../../src/layouts/Layout';
import MyLink from '../../src/components/MyLink';

const Orders = () => {
  return (
    <div>
      <Layout>
        <h2 className="text-3xl font-bold">Orders</h2>
        <MyLink url="/orders/create" name="Create New" />
        <div className="relative rounded-xl bg-blue-500 overflow-auto mt-5">
          <div className="shadow-sm overflow-hidden py-5">
            {/* products.length ? (
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
                  {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-white">Empty</div>
            ) */}
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Orders;
