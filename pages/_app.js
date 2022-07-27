import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Toaster from '../components/common/Toaster';
import Layout from '../components/Layout';
import CourseContextProvider from '../state/contexts/CourseContext';
import UserContextProvider from '../state/contexts/UserContext';
import { AuthUserProvider } from '@/state/contexts/AuthUserContext';
import '../styles/global.scss';
import '../styles/globals.css';
import { useEffect } from 'react';
import { checkUser } from '@/helper/loggeduser.helper';

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   checkUser();
  // }, []);
  return (
    <>
      <Head>
        <title>Zicops - Demo</title>
        <link rel="icon" type="image/x-icon" href="/images/zicops-favicon.png" />
      </Head>

      <ErrorBoundary>
        <AuthUserProvider>
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
        </AuthUserProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
