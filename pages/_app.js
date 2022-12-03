import AuthChecker from '@/components/AuthChecker';
import PushNotificationLayout from '@/components/Layout/PushNotificationLayout';
import { AuthUserProvider } from '@/state/contexts/AuthUserContext';
import Head from 'next/head';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Toaster from '../components/common/Toaster';
import Layout from '../components/Layout';
import CourseContextProvider from '../state/contexts/CourseContext';
import UserContextProvider from '../state/contexts/UserContext';
import '../styles/global.scss';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // for disabling log at all places
  console.log = () => {};

  // toggle scrollbar opacity when scroll
  useEffect(() => {
    let timeout = null;
    function updateOpacity() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
        return;
      }

      document.documentElement.style.setProperty('--scrollbarOpacity', '1');

      timeout = setTimeout(() => {
        document.documentElement.style.setProperty('--scrollbarOpacity', '0');
      }, 100);
    }

    document.addEventListener('wheel', updateOpacity);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Head>
        <title>Zicops</title>
        <link rel="icon" type="image/x-icon" href="/images/zicops-favicon.png" />
      </Head>

      <ErrorBoundary>
        <AuthUserProvider>
          <RecoilRoot>
            <CourseContextProvider>
              <UserContextProvider>
                <AuthChecker>
                  <PushNotificationLayout>
                    <Layout>
                      <Component {...pageProps} />

                      <Toaster />
                    </Layout>
                  </PushNotificationLayout>
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
