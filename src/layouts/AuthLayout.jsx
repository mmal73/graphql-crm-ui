import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen relative">
        <Sidebar />
        <main className="bg-white sm:w-full sm:min-h-screen md:w-4/5">
          <Header />
          <section className="p-8">{children}</section>
        </main>
        <p className="text-xs text-gray-500 mt-3 text-center absolute bottom-0 left-2/4">
          Author:
          <a
            href="https://github.com/mmal73"
            className="font-bold text-blue-500"
          >
            @mmal73
          </a>
        </p>
      </div>
    </>
  );
};

export default AuthLayout;
