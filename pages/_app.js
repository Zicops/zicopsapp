import Head from 'next/head';
import Layout from '../components/Layout';
import UserContextProvider from '../state/contexts/UserContext';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Zicops - Demo</title>
        <link rel="icon" type="image/x-icon" href="/images/zicops-favicon.png" />
      </Head>

      <RecoilRoot>
        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
