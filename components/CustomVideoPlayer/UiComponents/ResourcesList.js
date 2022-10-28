// components\CustomVideoPlayer\UiComponents\ResourcesList.js

import PopUp from '@/components/common/PopUp';
import ViewDoc from '@/components/common/ViewDoc';
import { truncateToN } from '@/helper/common.helper';
import { filterResources } from '@/helper/data.helper';
import { ResourcesAtom } from '@/state/atoms/module.atoms';
import { VideoAtom } from '@/state/atoms/video.atom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '../customVideoPlayer.module.scss';

export default function ResourcesList({ isPlaying, updateIsPlayingTo }) {
  const resources = useRecoilValue(ResourcesAtom);
  const videoData = useRecoilValue(VideoAtom);
  const filteredResources = filterResources(resources, videoData?.topicContent?.[0]?.topicId);

  const [showDoc, setShowDoc] = useState(false);

  useEffect(() => {
    if (showDoc === false) return;
    if (isPlaying && showDoc) updateIsPlayingTo(false);
    if (!isPlaying && !showDoc) updateIsPlayingTo(true);
  }, [showDoc]);

  return (
    <>
      <div className={`${styles.languageList}`}>
        {/* for topic content language  */}
        <div>
          <section className="h-95">
            {!!filteredResources?.length ? (
              filteredResources?.map((resource, i) => {
                // console.log(resource);

                return (
                  <>
                    {resource?.type === 'LINK' ? (
                      <a href={resource?.url} target="_blank" rel="noopener noreferrer">
                        Visit Link ({resource?.type})
                      </a>
                    ) : (
                      <button
                        key={resource?.id}
                        // className={`${
                        //   i === videoData.currentTopicContentIndex ? styles.languageBtnActive : ''
                        // }`}
                        onClick={() => setShowDoc(resource)}>
                        {truncateToN(resource?.name, 25)} ({resource?.type})
                      </button>
                    )}
                  </>
                );
              })
            ) : (
              <section className={`${styles.notFound}`}>
                <p>No Resources Added</p>
              </section>
            )}
          </section>
        </div>
      </div>

      {showDoc && (
        <PopUp
          title={showDoc?.name}
          popUpState={[showDoc, setShowDoc]}
          size="large"
          positionLeft="50%"
          isFooterVisible={false}>
          <ViewDoc url={showDoc?.url} />
        </PopUp>
      )}
    </>
  );
}
