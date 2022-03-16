import Layout from '../components/large/Layout';
import UserContextProvider from '../state/contexts/UserContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  return (
    <UserContextProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  )
}

export default MyApp