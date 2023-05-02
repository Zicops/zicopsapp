// components\CustomVideoPlayer\UiComponents\ResourcesList.js

import { truncateToN } from '@/utils/string.utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  SelectedResourceDataAtom,
} from '../../atoms/learnerCourseComps.atom';
import ButtonWithNoStyles from '../../common/ButtonWithNoStyles';
import styles from '../../learnerCourseComps.module.scss';
import { TopicResourcesAtom } from '@/state/atoms/courses.atom';

export default function ResourcesList() {
  const [selectedResourceData, setSelectedResourceData] = useRecoilState(SelectedResourceDataAtom);
  const activeCourseData = useRecoilValue(ActiveCourseDataAtom);
  const resources = useRecoilValue(TopicResourcesAtom);
  const filteredResources = resources?.filter((res) => res?.topicId === activeCourseData?.topicId);

  return (
    <>
      <div className={`${styles.boxContainer} ${styles.resourceBox}`}>
        {!!filteredResources?.length ? (
          filteredResources?.map((resource) => (
            <>
              {resource?.type === 'LINK' ? (
                <a
                  href={resource?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resourceBtn}>
                  Visit Link ({resource?.type})
                </a>
              ) : (
                <ButtonWithNoStyles
                  key={resource?.id}
                  styleClass={styles.resourceBtn}
                  handleClick={() => setSelectedResourceData(resource)}>
                  {truncateToN(resource?.name, 30)} ({resource?.type})
                </ButtonWithNoStyles>
              )}
            </>
          ))
        ) : (
          <section className={`${styles.notFound}`}>
            <p>No Resources Added</p>
          </section>
        )}
      </div>
    </>
  );
}
