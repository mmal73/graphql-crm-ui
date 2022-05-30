import Head from 'next/head';
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
      </Head>
      <Sidebar/>
      <main>
        {children}
      </main>
    </>
  );
}

export default Layout;
