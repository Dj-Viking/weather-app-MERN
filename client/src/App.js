import React from 'react';
import './App.css';

//APOLLO
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

//AUTH
import Auth from './utils/auth.js';

//COMPONENTS
import Header from './components/Header';

//establish apollo client with apollo server
const client = new ApolloClient({
  request: (operation) => {
    const gotToken = Auth.getToken();
    //const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: gotToken ? `Bearer ${gotToken}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Header />
    </ApolloProvider>
    </>
  );
}

export default App;
