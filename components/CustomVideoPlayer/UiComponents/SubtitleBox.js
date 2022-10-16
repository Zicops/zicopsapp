import SwitchButton from '@/components/common/FormComponents/SwitchButton';
import { VideoAtom } from '@/state/atoms/video.atom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../customVideoPlayer.module.scss';

export default function SubtitleBox({ subtitleState }) {
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const [showSubtitles, setShowSubtitles] = subtitleState;

  const { topicContent, currentTopicContentIndex, currentSubtitleIndex } = videoData;
  useEffect(() => {
    const isSubtitlePresent = !!topicContent?.[currentTopicContentIndex]?.subtitleUrl?.length;
    if (showSubtitles && !isSubtitlePresent) setShowSubtitles(false);
  }, []);

  return (
    <>
      <div className={`${styles.languageList}`}>
        {/* for topic content language  */}
        <div>
          <h4>Audio </h4>

          <section className="h-80">
            {videoData?.topicContent &&
              videoData.topicContent.map((c, i) => (
                <button
                  key={c.id}
                  className={`${
                    i === videoData.currentTopicContentIndex ? styles.languageBtnActive : ''
                  }`}
                  onClick={() => {
                    setVideoData({
                      ...videoData,
                      currentTopicContentIndex: i,
                      videoSrc: videoData.topicContent[i].contentUrl
                    });
                  }}>
                  {c.language}
                </button>
              ))}
          </section>
        </div>

        {/* for topic content subtitles */}
        <div>
          <h4>
            Subtitles
            <SwitchButton
              styles={{
                marginLeft: '5px'
              }}
              isDisabled={!topicContent?.[currentTopicContentIndex]?.subtitleUrl?.length}
              type={null}
              isChecked={showSubtitles}
              handleChange={() => setShowSubtitles(!showSubtitles)}
              size="small"
            />
          </h4>

          <section>
            {topicContent &&
              topicContent[currentTopicContentIndex]?.subtitleUrl?.map((s, i) => (
                <button
                  key={s.language}
                  className={`${i === currentSubtitleIndex ? styles.languageBtnActive : ''}`}
                  onClick={() => {
                    setVideoData({ ...videoData, currentSubtitleIndex: i });
                  }}>
                  {s.language}
                </button>
              ))}
          </section>
        </div>

        {(videoData?.topicContent?.length ||
          topicContent[currentTopicContentIndex]?.subtitleUrl?.length) > 3 && (
          <div className={`${styles.scrollArrow}`}>
            <img src="/images/bigarrowleft.png" alt="" />
          </div>
        )}
      </div>
    </>
  );
}
