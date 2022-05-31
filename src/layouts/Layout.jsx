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
        </div>
      </>
    );
  }
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
