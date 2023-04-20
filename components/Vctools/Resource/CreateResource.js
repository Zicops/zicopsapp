import { GET_TOPIC_RESOURCES } from '@/api/Queries';
import { SelectedResourceDataAtom } from '@/components/LearnerCourseComps/atoms/learnerCourseComps.atom';
import Spinner from '@/components/common/Spinner';
import { DocIcon, ExcelIcon, PdfIcon, UrlIcon } from '@/components/common/ZicopsIcons';
import { TOPIC_RESOURCE_TYPES } from '@/constants/course.constants';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { TopicResourcesAtomFamily, getTopicResourcesObject } from '@/state/atoms/courses.atom';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { CurrentParticipantDataAtom } from '@/state/atoms/vctool.atoms';
import { isWordMatched } from '@/utils/string.utils';
import { memo, useEffect } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';

const CreateResource = ({ addResource }) => {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const [selectedResourceData, setSelectedResourceData] = useRecoilState(SelectedResourceDataAtom);
  const [topicResources, setTopicResources] = useRecoilState(
    TopicResourcesAtomFamily(activeClassroomTopicId),
  );

  useEffect(() => {
    if (!activeClassroomTopicId) return setTopicResources([]);

    // load resources
    loadQueryDataAsync(GET_TOPIC_RESOURCES, { topic_id: activeClassroomTopicId })
      .then((res) =>
        setTopicResources(
          res?.getTopicResources?.map((resource) => getTopicResourcesObject(resource)) || [],
        ),
      )
      .catch(() => {
        setToastMessage('Topic Resources Load Error');
        setTopicResources([]);
      });
  }, [activeClassroomTopicId]);

  if (topicResources == null) return <Spinner />;

  function getFileType(type = null) {
    if (isWordMatched(type, TOPIC_RESOURCE_TYPES?.pdf)) return <PdfIcon />;
    if (isWordMatched(type, TOPIC_RESOURCE_TYPES?.doc)) return <DocIcon />;
    if (isWordMatched(type, TOPIC_RESOURCE_TYPES?.link)) return <UrlIcon />;
    if (isWordMatched(type, TOPIC_RESOURCE_TYPES?.excel)) return <ExcelIcon />;

    return '/images/default-document.png';
  }

  return (
    <>
      <div className={`${styles.resourceModeratorContainer}`}>
        {!topicResources?.length ? (
          <div className={`${styles.resourceModeratorScreen}`}>
            <div className={`${styles.moderatorAddResource}`}>
              <div className={styles.recourceIcon}>
                <img src="/images/svg/vctool/library-books.svg" />
              </div>
              <div className={`${styles.resourceAvailableHead}`}>No resources available!</div>
              <p className={`${styles.resourceAvailablesubHead}`}>
                {!!currentParticipantData?.isModerator
                  ? 'Click below to add resources'
                  : 'Moderator has not added resources'}
              </p>
            </div>
          </div>
        ) : (
          <section>
            <p>All Files</p>

            <div className={`${styles.resources}`}>
              {topicResources?.map((res) => (
                <div
                  onClick={() => {
                    console.info(res?.url);
                    setSelectedResourceData({ name: res?.name, url: res?.url, type: res?.type });
                  }}
                  key={res?.id}>
                  <span>
                    {/* <img src={
                  } alt="" /> */}
                    {getFileType(res?.type)}
                  </span>
                  <p>{res?.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!currentParticipantData?.isModerator && (
          <button
            className={`${styles.addResourceBtn}`}
            onClick={() => {
              addResource();
            }}>
            <div>+</div>Add Resource
          </button>
        )}
      </div>
    </>
  );
};
export default CreateResource;
