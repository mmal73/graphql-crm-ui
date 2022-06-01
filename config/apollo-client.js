import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const link = new HttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = setContext((request, previousContext) => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      headers: { authorization: `Bearer ${token}` },
    };
  }
});

const resetToken = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === 'ServerError' &&
    networkError.statusCode === 401
  ) {
    localStorage.removeItem('token');
  }
});

const authFlowLink = authLink.concat(resetToken);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authFlowLink.concat(link),
});

export default client;
