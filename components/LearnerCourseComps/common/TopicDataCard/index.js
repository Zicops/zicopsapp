import Spinner from '@/components/common/Spinner';
import { ArrowLeft } from '@/components/common/ZicopsIcons';
import { truncateToN } from '@/utils/string.utils';
import { useRecoilValue } from 'recoil';
import { CourseTopicsAtomFamily } from '../../atoms/learnerCourseComps.atom';
import styles from './topicDataCard.module.scss';

export default function TopicDataCard({
  topicId = null,
  isResources = false,
  isActive = false,
  isLoading = false,
  resourceCount = 0,
  handleClick = () => {},
}) {
  const topicData = useRecoilValue(CourseTopicsAtomFamily(topicId));
  const title = topicData?.name;

  if (!resourceCount) return null;

  return (
    <div
      className={`${styles.topicDataCard}  ${isActive ? styles.active : ''}`}
      onClick={() => handleClick(topicData)}>
      <div className={`${styles.titleName} ${title?.length > 40 ? styles.titleNameSmall : ''}`}>
        {truncateToN(title, 60)}
      </div>

      <div className={`${styles.body}`}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className={`${styles.text}`}>
              {isResources ? <>{`${resourceCount} file${resourceCount > 1 ? 's' : ''}`}</> : <></>}
            </div>

            <div className={`${styles.icon}`}>
              <ArrowLeft turns={isActive ? 0.75 : 0.5} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
