import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title key="title">CRM GrapQL</title>
        <meta key="description" name="description" content="Contact me!" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
