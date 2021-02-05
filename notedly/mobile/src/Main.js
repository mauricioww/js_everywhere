import React from 'react';
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import * as SecureStore from 'expo-secure-store';

import Screens from './screens';

const uri = 'http://192.168.0.105:4000/api'; // Modify according to IP server
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri });

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: (await SecureStore.getItemAsync('token')) || ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});

// console.log(uri);


const Main = () => {
  return (
    <ApolloProvider client={client}>
      <Screens/>
    </ApolloProvider>
  );
};

export default Main;