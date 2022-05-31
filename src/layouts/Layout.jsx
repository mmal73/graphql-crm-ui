import { useRouter } from 'next/router';
import React from 'react';
import AuthLayout from './AuthLayout';

const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;
  if (['/signin', '/signup'].includes(pathname)) {
    return (
      <>
        <div className="bg-slate-50 min-h-screen flex flex-col justify-center">
          <main className="bg-slate-50">{children}</main>
          <p className="text-xs text-gray-500 mt-3 text-center">
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
  }
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
