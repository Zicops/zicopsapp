// pages\404.js

import styles from '@/styles/404.module.scss';
import { useRouter } from 'next/router';

export default function Custom404Page() {
  const router = useRouter();

  return (
    <div className={styles.custom404Container}>
      <section>
        <img src="/images/404.png" alt="" />
      </section>
      <section>
        <img src="/images/dino_game_logo.png" alt="" />
      </section>

      <div>
        Oops something went wrong. We are looking into this. In the meanwhile we do not have the
        Dino game. You might try reloading though!
      </div>

      <button className={styles.btn} onClick={() => router.back()}>
        Go Back
      </button>
    </div>
  );
}
