import {
  ADD_COURSE_TOPIC,
  ADD_TOPIC_CONTENT,
  UPDATE_COURSE_TOPIC,
  UPDATE_TOPIC_CONTENT,
  UPLOAD_STATIC_CONTENT,
  UPLOAD_TOPIC_CONTENT_SUBTITLE,
  UPLOAD_TOPIC_CONTENT_VIDEO,
} from '@/api/Mutations';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import { COURSE_TYPES, TOPIC_CONTENT_TYPES, TOPIC_TYPES } from '@/constants/course.constants';
import { mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { isWordSame } from '@/helper/utils.helper';
import {
  AllCourseModulesDataAtom,
  BingeDataAtom,
  CourseMetaDataAtom,
  QuestionBankDataAtom,
  TopicContentListAtom,
  TopicQuizAtom,
  TopicResourcesAtom,
  TopicSubtitlesAtom,
  TopicUploadProgressAtom,
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { addTopicResources, addUpdateTopicQuiz, getTopicDataObj } from './adminCourseComps.helper';

export default function useHandleTopic(modData = null, chapData = null, topData = null) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [allModules, setAllModules] = useRecoilState(AllCourseModulesDataAtom);
  const [topicUploadProgress, setTopicUploadProgress] = useRecoilState(TopicUploadProgressAtom);
  const [topicContentList, setTopicContentList] = useRecoilState(TopicContentListAtom);
  const [topicSubtitle, setTopicSubtitle] = useRecoilState(TopicSubtitlesAtom);
  const [topicResources, setTopicResources] = useRecoilState(TopicResourcesAtom);
  const [binge, setBinge] = useRecoilState(BingeDataAtom);
  const [topicQuiz, setTopicQuiz] = useRecoilState(TopicQuizAtom);
  const questionBankData = useRecoilValue(QuestionBankDataAtom);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(null);
  const [isEditTopicFormVisible, setIsEditTopicFormVisible] = useState(null);
  const [topicData, setTopicData] = useState(
    getTopicDataObj({
      courseId: courseMetaData?.id,
      moduleId: modData?.id,
      chapterId: chapData?.id,
      sequence: modData?.topics?.length + 1,
    }),
  );

  useEffect(() => {
    setIsPopUpDataPresent(true);
  }, []);

  useEffect(() => {
    if (!topData?.id) return;

    setTopicData(getTopicDataObj(topData));
  }, [topData]);

  // set type to assessment if test series course
  if (
    courseMetaData?.type === COURSE_TYPES.testSeries &&
    topicData?.type !== TOPIC_TYPES.assessment
  ) {
    setTopicData(getTopicDataObj({ ...topicData, type: TOPIC_TYPES.assessment }));
  }

  function toggleEditTopicForm() {
    // reset to original data if cancel
    if (isEditTopicFormVisible) setTopicData(getTopicDataObj(topData));

    setIsEditTopicFormVisible(!isEditTopicFormVisible);
  }

  function handleClose() {
    setIsSubmitDisabled(null);
    setTopicUploadProgress(null);
    setTopicData(null);
    setTopicQuiz(null);
    setTopicContentList(null);
    setTopicResources(null);
  }

  async function addUpdateTopic(e) {
    const isNameSame = !!modData?.topics?.find(
      (top) => top?.id !== topicData?.id && isWordSame(top?.name, topicData?.name),
    );
    if (isNameSame) return setToastMessage('Topic with same name already exists in this module');

    e.target.disabled = true;

    const sendData = sanitizeFormData(topicData);
    // add new topic
    if (!topicData?.id) {
      mutateData(ADD_COURSE_TOPIC, sendData)
        .then((res) => {
          if (!res?.addCourseTopic) return setToastMessage('Topic Create Error');

          const _allModules = structuredClone(allModules);
          const index = _allModules?.findIndex((m) => m?.id === modData?.id);
          if (index < 0) return;

          if (!_allModules?.[index]?.topics?.length) _allModules[index].topics = [];

          _allModules?.[index]?.topics?.push(res?.addCourseTopic);
          setAllModules(_allModules);
          setTopicData({ ...topicData, id: res?.addCourseTopic?.id });
        })
        .catch(() => setToastMessage('Topic Create Error'));
      return;
    }

    // update topic
    mutateData(UPDATE_COURSE_TOPIC, sendData)
      .then((res) => {
        if (!res?.updateCourseTopic) return setToastMessage('Topic Update Error');

        const _allModules = structuredClone(allModules);
        const index = _allModules?.findIndex((m) => m?.id === modData?.id);
        if (index < 0) return;

        const updatedChap = res?.updateCourseTopic;
        _allModules[index].topics = _allModules?.[index]?.topics?.map((chap) =>
          chap?.id === updatedChap?.id ? updatedChap : chap,
        );
        setAllModules(_allModules);
      })
      .catch(() => setToastMessage('Topic Update Error'))
      .finally(() => setIsEditTopicFormVisible(!isEditTopicFormVisible));
  }

  async function addUpdateTopicContent() {
    for (let index = 0; index < topicContentList.length; index++) {
      const content = topicContentList[index];

      const sendContentData = {
        courseId: courseMetaData.id,
        topicId: content.topicId,
        moduleId: modData?.id,
        language: content.language,
        type: content.type,
        duration: content.duration || 0,
        startTime: binge.startTime || 0,
        skipIntroDuration: binge.skipIntroDuration || 0,
        nextShowTime: binge.nextShowTime || 0,
        fromEndTime: binge.fromEndTime || 0,
        is_default: content.isDefault || false,
      };
      if (!content.id) {
        // add topic content
        await mutateData(ADD_TOPIC_CONTENT, sendContentData)
          .then(async (res) => {
            const data = res?.addTopicContent;
            await uploadTopicContentFile({ ...content, ...data });
          })
          .catch((err) => {
            console.log(err);
            setToastMessage(`${content?.language} Topic Content Add Failed`);
          });
        continue;
      }

      // update topic content
      const { courseId, topicId, ...updateContentData } = sendContentData;
      updateContentData.contentId = content.id;
      await mutateData(UPDATE_TOPIC_CONTENT, updateContentData)
        .then(async (res) => {
          const data = res?.updateTopicContent;
          await uploadTopicContentFile({ ...data, ...content });
        })
        .catch((err) => {
          console.log(err);
          setToastMessage(`${content?.language} Topic Content Update Failed`);
        });
    }
  }

  async function uploadTopicContentFile(content) {
    if (!content?.id) return setTopicUploadProgress({ [content.language]: 100 });
    if (!content?.file) return setTopicUploadProgress({ [content.language]: 100 });

    const sendVideoData = {
      contentId: content.id,
      courseId: courseMetaData?.id,
      file: content?.file,
    };

    // mp4 and document type
    if ([TOPIC_CONTENT_TYPES.mp4, TOPIC_CONTENT_TYPES.document]?.includes(content?.type)) {
      await mutateData(UPLOAD_TOPIC_CONTENT_VIDEO, sendVideoData, {
        context: {
          fetchOptions: {
            useUpload: true,
            onProgress: (ev) =>
              setTopicUploadProgress({ [content.language]: ev.loaded / ev.total }),
          },
        },
      }).catch((err) => {
        console.log(err);
        setToastMessage(`Topic Content File Upload Failed for ${content?.language} language`);
      });
    }

    // scorm
    if (content?.type === TOPIC_CONTENT_TYPES.scorm) {
      sendVideoData.type = content?.type;
      if (!!content?.contentUrl) sendVideoData.url = content?.contentUrl;

      await mutateData(UPLOAD_STATIC_CONTENT, sendVideoData, {
        context: {
          fetchOptions: {
            useUpload: true,
            onProgress: (ev) =>
              setTopicUploadProgress({ [content.language]: ev.loaded / ev.total }),
          },
        },
      }).catch((err) => {
        console.log(err);
        setToastMessage(`Topic Content File Upload Failed for ${content?.language} language`);
      });
    }
  }

  async function addSubtitle() {
    for (let i = 0; i < topicSubtitle?.length; i++) {
      const subtitle = topicSubtitle[i];
      if (!subtitle?.file) continue;

      const sendData = {
        topicId: subtitle.topicId,
        courseId: courseMetaData?.id,
        file: subtitle.file,
        language: subtitle.language,
      };
      await mutateData(UPLOAD_TOPIC_CONTENT_SUBTITLE, sendData).catch((err) => {
        console.log(err);
        setToastMessage(`Subtitle Upload Failed for ${sendData.language}`);
      });
    }
  }

  async function handleSubmit() {
    setIsSubmitDisabled(true);
    await addUpdateTopicContent();
    await addSubtitle();

    const { id, category } = courseMetaData;

    // topic resources
    const res = topicResources?.map((res) => ({ ...res, courseId: id }));
    const isResourceError = await addTopicResources(res, setToastMessage);

    // topic quiz
    const quiz = topicQuiz?.map((q) => ({ ...q, courseId: id, category: category }));
    const isQuizError = await addUpdateTopicQuiz(questionBankData, quiz, setToastMessage);

    if (!isResourceError || !isQuizError)
      setToastMessage('Topic Content And Resources Uploaded', 'success');

    handleClose();
  }

  return {
    topicData,
    setTopicData,
    addUpdateTopic,
    isSubmitDisabled,
    isEditTopicFormVisible,
    toggleEditTopicForm,
    handleSubmit,
    handleClose,
  };
}
