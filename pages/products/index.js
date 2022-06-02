import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Layout from '../../src/layouts/Layout';
import MyLink from '../../src/components/MyLink';
import ProductItem from '../../src/products/ProductItem';

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      stock
      price
    }
  }
`;
const Products = () => {
  const tHeaders = ['id', 'name', 'stock', 'price', ''];

  const { data, loading, error } = useQuery(GET_PRODUCTS);
  if (loading) return 'Loading...';
  if (error) {
    router.push('/signin');
    return (
      <div className="my-2 bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-1 mx-auto mt-5 text-center">
        <p>{error.message}</p>
      </div>
    );
  }

  const products = data.getProducts;

  return (
    <div>
      <Layout>
        {error && (
          <div className="my-2 bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-1 mx-auto mt-5 text-center">
            <p>{error.message}</p>
          </div>
        )}
        <h2 className="text-3xl font-bold mb-5">Products</h2>
        <MyLink url="/products/create" name="Create New" />
        <div className="relative rounded-xl bg-blue-500 overflow-auto mt-5">
          <div className="shadow-sm overflow-hidden py-5">
            {products.length ? (
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
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Products;
