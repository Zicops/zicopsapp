import ViewDoc from '@/components/common/ViewDoc';
import styles from './topicPdfViews.module.scss';

export default function TopicPdfViews({ url = null }) {
  return (
    <>
      <div
        className={styles.topicPdfView}
        ref={(ref) =>
          ref?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
        }>
        {!url ? (
          <div className={`${styles.fallBackMsg}`}>No Document Found</div>
        ) : (
          <ViewDoc url={url} customStyles={{ height: '100%' }} />
        )}
      </div>
    </>
  );
}
