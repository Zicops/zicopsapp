import Footer from '../Footer';
import Nav from '../Nav';
import { main } from './layout.module.scss';

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className={main}>{children}</main>
      <Footer />
    </>
  );
}
