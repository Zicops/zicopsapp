import Head from 'next/head';
import React from "react";
import DefaultLayout from '../components/Layout';
import UserContextProvider from '../state/contexts/UserContext';
import '../styles/globals.css';
import '../styles/global.scss';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Toaster from '../components/common/Toaster';

function MyApp({ Component, pageProps }) {
    let Layout = DefaultLayout;
    if (Component.layout === null) Layout = React.Fragment;
    else if (Component.layout) Layout = Component.layout;
  return (
    <>
      <Head>
        <title>Zicops - Demo</title>
        <link rel="icon" type="image/x-icon" href="/images/zicops-favicon.png" />
      </Head>

      <ErrorBoundary>
        <RecoilRoot>
          <UserContextProvider>
            <Layout>
              <Component {...pageProps} />

              <Toaster />
            </Layout>
          </UserContextProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
