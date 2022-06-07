import { useRouter } from 'next/router';
import Link from 'next/link';

import React from 'react';

const Sidebar = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const items = [
    {
      name: 'Clients',
      url: '/',
      active: pathname === '/' || pathname.includes('/clients/'),
    },
    {
      name: 'Orders',
      url: '/orders',
      active: pathname === '/orders' || pathname.includes('/orders/'),
    },
    {
      name: 'Products',
      url: '/products',
      active: pathname === '/products' || pathname.includes('/products/'),
    },
    {
      name: 'Best Sellers',
      url: '/sellers',
      active: pathname === '/sellers' || pathname.includes('/sellers/'),
    },
  ];

  return (
    <aside className="bg-slate-50 w-full md:min-h-screen md:w-1/5 p-5 border-r">
      <div className="mb-5">
        <p className="text-2xl text-blue-500 text-center font-bold">
          CRM GraphQL
        </p>
      </div>
      <nav>
        <ul className="list-none">
          {items.map(({ name, url, active }) => (
            <li
              key={url}
              className={
                active
                  ? 'uppercase mb-4 rounded-lg bg-blue-500 text-white'
                  : 'uppercase mb-4 rounded-lg bg-blue-100 text-gray-700'
              }
            >
              <Link href={url}>
                <a className="inline-block rounded-lg w-full p-2 text-center border-2 border-transparent hover:border-blue-500">
                  {name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
