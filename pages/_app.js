import Head from 'next/head';
import UserContextProvider from '../state/contexts/UserContext';
import '../styles/globals.css';
import '../styles/global.scss';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Toaster from '../components/common/Toaster';
import Layout from '../components/Layout';
import CourseContextProvider from '../state/contexts/CourseContext';
import '../styles/global.scss';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Zicops - Demo</title>
        <link rel="icon" type="image/x-icon" href="/images/zicops-favicon.png" />
      </Head>

      <ErrorBoundary>
        <RecoilRoot>
          <CourseContextProvider>
            <UserContextProvider>
              <Layout>
                <Component {...pageProps} />

                <Toaster />
              </Layout>
            </UserContextProvider>
          </CourseContextProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
