import React from 'react';
import Sidebar from '../components/Sidebar';

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="bg-slate-50 sm:w-2/3 sm:min-h-screen md:w-4/5 p-5">
          {children}
        </main>
      </div>
    </>
  );
};

export default AuthLayout;
