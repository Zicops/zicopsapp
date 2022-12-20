import VrBackground from '@/components/HomePage/VrBackground';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import HomePage from '../../components/HomePage';
import OrgHomepage from '@/components/OrgHomepage';

const Home = () => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.body;

    setMounted(true);
  }, []);

  return (
    <>
      {/* <Head>
        <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
      </Head>

      {mounted ? createPortal(<VrBackground />, ref.current) : null} */}
      {/*
      <HomePage />
      */}
      <OrgHomepage />
    </>
  );
};

export default Home;
