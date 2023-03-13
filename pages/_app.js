import { mutationClient } from '@/api/Mutations';
import AuthChecker from '@/components/AuthChecker';
import FeatureFlagsLayout from '@/components/Layout/FeatureFlagsLayout';
import PushNotificationLayout from '@/components/Layout/PushNotificationLayout';
import { logger } from '@/helper/utils.helper';
import { AuthUserProvider } from '@/state/contexts/AuthUserContext';
import { ApolloProvider } from '@apollo/client';
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
  logger()?.disableLogger();

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
        <title>Zicops - Comprehensive e-learning platform.</title>
        <meta
          name="description"
          content="What is Zicops? Zicops is an e-learning streaming platform that 
manages and elevates the entire learning environment."
        />
        <link rel="icon" type="image/x-icon" href="/images/zicopsFavIcon.png" />
      </Head>

      <ErrorBoundary>
        <AuthUserProvider>
          <RecoilRoot>
            <ApolloProvider client={mutationClient}>
              <FeatureFlagsLayout>
                <PushNotificationLayout>
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
                </PushNotificationLayout>
              </FeatureFlagsLayout>
            </ApolloProvider>
          </RecoilRoot>
        </AuthUserProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
