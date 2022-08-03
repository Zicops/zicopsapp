import AuthChecker from '@/components/AuthChecker';
import { AuthUserProvider } from '@/state/contexts/AuthUserContext';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Toaster from '../components/common/Toaster';
import Layout from '../components/Layout';
import CourseContextProvider from '../state/contexts/CourseContext';
import UserContextProvider from '../state/contexts/UserContext';
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
        <AuthUserProvider>
          <RecoilRoot>
            <CourseContextProvider>
              <UserContextProvider>
                <AuthChecker>
                  <Layout>
                    <Component {...pageProps} />

                    <Toaster />
                  </Layout>
                </AuthChecker>
              </UserContextProvider>
            </CourseContextProvider>
          </RecoilRoot>
        </AuthUserProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
