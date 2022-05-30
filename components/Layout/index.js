import Footer from '../Footer';
import Nav from '../Nav';
import { useState, useEffect } from 'react';
import { main } from './layout.module.scss';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const [isFullHeight, setIsFullHeight] = useState(0);
  const router = useRouter();
  const fullHeightPageArray = ['/home', '/exam-live'];

  useEffect(() => {
    if (fullHeightPageArray.includes(router.pathname)) {
      setIsFullHeight(1);
    }
  }, []);

  return (
    <>
      {!isFullHeight && <Nav />}
      <main className={main}>{children}</main>
      {!isFullHeight && <Footer />}
    </>
  );
}
