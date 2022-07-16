import Footer from '../Footer';
import Nav from '../Nav';
import { useState, useEffect } from 'react';
import { main } from './layout.module.scss';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const [isFullHeight, setIsFullHeight] = useState(0);
  const router = useRouter();
  const fullHeightPageArray = [
    '/home',
    '/exam-live',
    '/exam-screen',
    '/exam-screen/[examId]',
    '/login',
    '/reset-password',
    '/account-setup'
  ];

  useEffect(() => {
    if (fullHeightPageArray.includes(router.pathname)) {
      setIsFullHeight(1);
    } else {
      setIsFullHeight(0);
    }
  }, [router.pathname]);

  return (
    <>
      {!isFullHeight && <Nav />}
      <main className={main}>{children}</main>
      {!isFullHeight && <Footer />}
    </>
  );
}
