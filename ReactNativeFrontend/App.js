/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AppNavContainer from './src/navigations';
import {InMemoryCache, ApolloProvider} from '@apollo/client';
import ApolloClient from 'apollo-boost';
import { retrieveAccessToken, removeTokens } from './src/security';

LogBox.ignoreLogs(['Reanimated 2']);

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  request: async (operation) => {
    const token = await retrieveAccessToken();

    if (token !== null)
    {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    else
    {
      operation.setContext({

      });
    }
  },
  cache: new InMemoryCache()
});

const App = () => {

  return (
    <ApolloProvider client={client}>
      <AppNavContainer/>
    </ApolloProvider>
  );
};

export default App;
