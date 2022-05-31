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
      active: pathname === '/',
    },
    {
      name: 'Orders',
      url: '/orders',
      active: pathname === '/orders',
    },
    {
      name: 'Products',
      url: '/products',
      active: pathname === '/products',
    },
  ];

  return (
    <aside className="sm:w-1/3 sm:min-h-screen md:w-1/5 p-5">
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
                  ? 'mb-3 rounded-lg bg-blue-500 text-white'
                  : 'mb-3 rounded-lg text-blue-500'
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
