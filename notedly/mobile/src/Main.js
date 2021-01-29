import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import getEnvVars from '../config';

import Screens from './screens';

const { API_URI } = getEnvVars();
const uri = API_URI;
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri,
  cache
});

const Main = () => {
  return (
    <ApolloProvider client={client}>
      <Screens/>
    </ApolloProvider>
  );
};

export default Main;