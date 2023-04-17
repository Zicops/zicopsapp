import { GET_TOPIC_RESOURCES } from '@/api/Queries';
import { SelectedResourceDataAtom } from '@/components/LearnerCourseComps/atoms/learnerCourseComps.atom';
import Spinner from '@/components/common/Spinner';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getTopicResourcesObject } from '@/state/atoms/courses.atom';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { CurrentParticipantDataAtom } from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';

const CreateResource = ({ addResource }) => {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [selectedResourceData, setSelectedResourceData] = useRecoilState(SelectedResourceDataAtom);
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const [resources, setResources] = useState(null);

  useEffect(() => {
    if (!activeClassroomTopicId) return setResources([]);

    // load resources
    loadQueryDataAsync(GET_TOPIC_RESOURCES, { topic_id: activeClassroomTopicId })
      .then((res) =>
        setResources(
          res?.getTopicResources?.map((resource) => getTopicResourcesObject(resource)) || [],
        ),
      )
      .catch(() => {
        setToastMessage('Topic Resources Load Error');
        setResources([]);
      });
  }, [activeClassroomTopicId]);

  if (resources == null) return <Spinner />;

  return (
    <div className={`${styles.resourceModeratorContainer}`}>
      {!resources?.length ? (
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
            {resources?.map((res) => (
              <div
                onClick={() =>
                  setSelectedResourceData({ name: res?.name, url: res?.url, type: res?.type })
                }>
                <span>
                  <span>{res?.type?.toUpperCase()}</span>
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
  );
};
export default CreateResource;
