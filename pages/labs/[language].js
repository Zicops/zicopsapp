import ZicopsEditor from '@/components/Labs/ZicopsEditor';
import { useRouter } from 'next/router';

export default function SingleLabsPage() {
  const router = useRouter();
  const lang = router?.query?.language;

  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        // marginTop: '50px',
        padding: 0
      }}>
      <div
        style={{
          // display: 'flex',
          marginTop: '70px',
          // padding: '5vh 4vw',
          backgroundColor: 'var(--black)',
          height: '75vh',
          overflow: 'hidden'
        }}>
        <ZicopsEditor language={lang} />
        Labs Code Here
      </div>
    </div>
  );
}
