import ViewDoc from '@/components/common/ViewDoc';
import { TopicFileViewDataAtom } from '@/state/atoms/module.atoms';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import styles from './topicPdfViews.module.scss';

export default function TopicPdfViews() {
  const [topicFileViewData, setTopicFileViewData] = useRecoilState(TopicFileViewDataAtom);

  return (
    <>
      <div
        className={styles.topicPdfView}
        ref={(ref) =>
          ref?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          })
        }>
        <span onClick={() => setTopicFileViewData(null)} className={`${styles.backBtn}`}>
          <img src="/images/bigarrowleft.png" alt="" />
        </span>

        <ViewDoc
          url={topicFileViewData?.topicContent?.[0]?.contentUrl}
          customStyles={{ height: '100%' }}
        />
      </div>
    </>
  );
}
