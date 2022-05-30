import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({children}) => {
  return (
    <>
    <div className="flex bg-gray-200 min-h-screen ">
      <Sidebar/>
      <main className="sm:2/3 sm:min-h-screen md:w-4/5 p-5">
        {children}
      </main>
    </div>
    </>
  );
}

export default Layout;
