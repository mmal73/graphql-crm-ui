import '../styles/globals.css';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo-client';
import OrdersState from '../src/context/orders/OrdersState';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title key="title">CRM GraphQL</title>
        <meta key="description" name="description" content="Contact me!" />
      </Head>
      <ApolloProvider client={client}>
        <OrdersState>
          <Component {...pageProps} />
        </OrdersState>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
