import Footer from '../Footer';
import Nav from '../Nav';
import { main } from './layout.module.scss';
import {useRouter} from "next/router";

export default function DefaultLayout({ children }) {
    const router = useRouter();
    const showLayout = !(router.pathname === '/exam-screen');

  return (
    <>
        {showLayout && <Nav />}
        <main className={main}>{children}</main>
        {showLayout && <Footer />}
    </>
  );
}
