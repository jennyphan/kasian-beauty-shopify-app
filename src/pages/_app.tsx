/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from '@shopify/app-bridge-react';
import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/styles.css';
import ApolloClient from 'apollo-boost';
import Cookies from 'js-cookie';
import App from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  }
});

class KasianBeautiApp extends App {
  render() {
    const { publicRuntimeConfig } = getConfig();
    const { Component, pageProps } = this.props;

    const config = {
      apiKey: publicRuntimeConfig.API_KEY || '',
      shopOrigin: Cookies.get('shopOrigin') || '',
      forceRedirect: true
    };

    return (
      <>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <AppProvider i18n={translations}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </AppProvider>
        </Provider>
      </>
    );
  }
}

export default KasianBeautiApp;
