import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ADD_COURSE_TOPIC } from '../../../../API/Mutations';
import { getTopicObject, TopicAtom } from '../../../../state/atoms/module.atoms';
import { PopUpStatesAtomFamily } from '../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { courseContext } from '../../../../state/contexts/CourseContext';
import { IsDataPresentAtom } from '../../../common/PopUp/Logic/popUp.helper';

export default function useAddTopic(refetchDataAndUpdateRecoil, activateEditTopic) {
  const { fullCourse } = useContext(courseContext);
  const [createCourseTopic, { loading, error }] = useMutation(ADD_COURSE_TOPIC);

  // recoil state
  const topicData = useRecoilValue(TopicAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const [addTopicPopUp, setAddTopicPopUp] = useRecoilState(PopUpStatesAtomFamily('addTopic'));

  // local states
  const [isAddTopicReady, setIsAddTopicReady] = useState(false);
  const [newTopicData, setNewTopicData] = useState(
    getTopicObject({ courseId: fullCourse.id, sequence: topicData?.length + 1 })
  );

  // disable save button if data is not correct
  useEffect(() => {
    setIsAddTopicReady(
      !!newTopicData.name?.trim() && !!newTopicData.type && !!newTopicData.description?.trim()
    );
    setIsPopUpDataPresent(
      !!newTopicData.name?.trim() || !!newTopicData.type || !!newTopicData.description?.trim()
    );
  }, [newTopicData]);

  // udpate sequence number with recoil state is updated
  useEffect(() => {
    setNewTopicData({ ...newTopicData, sequence: topicData.length + 1 });
  }, [topicData]);

  // set module id, chapter id on add topic on button click
  function constructTopicData(courseId, moduleId, sequence, chapterId = '') {
    setNewTopicData(getTopicObject({ courseId, moduleId, chapterId, sequence }));
    setAddTopicPopUp(true);
  }

  // save in database
  async function addNewTopic() {
    setIsAddTopicReady(false);
    if (
      !!topicData
        ?.filter((topic) => {
          const isChapterPresent = !!newTopicData?.chapterId;

          if (isChapterPresent) {
            return topic?.chapterId === newTopicData?.chapterId;
          } else {
            return topic?.moduleId === newTopicData?.moduleId;
          }
        })
        ?.find(
          (topic) =>
            topic?.name?.trim()?.toLowerCase() === newTopicData?.name?.trim()?.toLowerCase()
        )
    )
      return setToastMsg({
        type: 'danger',
        message: 'Topic with same name already exists'
      });

    let isError = false;
    const { data } = await createCourseTopic({
      variables: {
        ...newTopicData,
        name: newTopicData?.name?.trim(),
        description: newTopicData?.description?.trim()
      }
    }).catch((err) => {
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Topic Create Error' });
    });

    if (error) return setToastMsg({ type: 'danger', message: 'Topic Create Error' });

    refetchDataAndUpdateRecoil('topic');

    setNewTopicData(getTopicObject({ courseId: fullCourse.id, sequence: topicData.length + 1 }));
    if (!isError) setToastMsg({ type: 'success', message: 'New Topic Created' });

    setAddTopicPopUp(false);
    activateEditTopic(data.addCourseTopic.id, data.addCourseTopic);
  }

  return {
    newTopicData,
    setNewTopicData,
    constructTopicData,
    isAddTopicReady,
    addNewTopic
  };
}
