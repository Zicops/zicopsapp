import {
  ADD_COURSE_TOPIC,
  ADD_QUESTION_BANK_QUESTION,
  ADD_QUESTION_OPTIONS,
  ADD_TOPIC_CONTENT,
  ADD_TOPIC_QUIZ,
  UPDATE_COURSE_TOPIC,
  UPDATE_QUESTION_BANK_QUESTION,
  UPDATE_QUESTION_OPTIONS,
  UPDATE_TOPIC_CONTENT,
  UPDATE_TOPIC_QUIZ,
  UPLOAD_STATIC_CONTENT,
  UPLOAD_TOPIC_CONTENT_SUBTITLE,
  UPLOAD_TOPIC_CONTENT_VIDEO,
  UPLOAD_TOPIC_RESOURCE
} from '@/api/Mutations';
import { COURSE_TYPES, TOPIC_CONTENT_TYPES, TOPIC_TYPES } from '@/constants/course.constants';
import { mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { QUESTION_STATUS } from '@/helper/constants.helper';
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
  TopicUploadProgressAtom
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { getTopicDataObj } from './adminCourseComps.helper';

export default function useHandleTopic(
  modData = null,
  chapData = null,
  topData = null,
  closePopUp = () => {}
) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
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
      sequence: modData?.topics?.length + 1
    })
  );

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

  async function addUpdateTopic(e) {
    const isNameSame = !!modData?.topics?.find(
      (top) => top?.id !== topicData?.id && isWordSame(top?.name, topicData?.name)
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
          chap?.id === updatedChap?.id ? updatedChap : chap
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
        duration: content.duration,
        startTime: binge.startTime,
        skipIntroDuration: binge.skipIntroDuration,
        nextShowTime: binge.nextShowTime,
        fromEndTime: binge.fromEndTime,
        is_default: content.isDefault || false
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
      file: content?.file
    };

    // mp4 and document type
    if ([TOPIC_CONTENT_TYPES.mp4, TOPIC_CONTENT_TYPES.document]?.includes(content?.type)) {
      await mutateData(UPLOAD_TOPIC_CONTENT_VIDEO, sendVideoData, {
        context: {
          fetchOptions: {
            useUpload: true,
            onProgress: (ev) => setTopicUploadProgress({ [content.language]: ev.loaded / ev.total })
          }
        }
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
            onProgress: (ev) => setTopicUploadProgress({ [content.language]: ev.loaded / ev.total })
          }
        }
      }).catch((err) => {
        console.log(err);
        setToastMessage(`Topic Content File Upload Failed for ${content?.language} language`);
      });
    }
  }

  async function addSubtitle() {
    for (let i = 0; i < topicSubtitle.length; i++) {
      const subtitle = topicSubtitle[i];
      if (!subtitle?.file) continue;

      const sendData = {
        topicId: subtitle.topicId,
        courseId: courseMetaData?.id,
        file: subtitle.file,
        language: subtitle.language
      };
      await mutateData(UPLOAD_TOPIC_CONTENT_SUBTITLE, sendData).catch((err) => {
        console.log(err);
        setToastMessage(`Subtitle Upload Failed for ${sendData.language}`);
      });
    }
  }

  async function addResources() {
    for (let index = 0; index < topicResources?.length; index++) {
      const resource = topicResources[index];
      if (!resource?.isNew) continue;

      const sendData = {
        name: resource.name,
        type: resource.type,
        topicId: resource.topicId,
        courseId: courseMetaData.id
      };
      if (resource.file && resource.type !== 'LINK') {
        sendData.file = resource.file;
      } else {
        sendData.url = resource.url;
      }

      await mutateData(UPLOAD_TOPIC_RESOURCE, sendData).catch((err) => {
        console.log(err);
        setToastMessage(`${sendData.name} Resource Upload Failed`);
      });
    }
  }

  // returns question id after success
  async function addUpdateQuestionAndOptions(questionData = {}, optionData = []) {
    const sendQuestionData = {
      name: '',
      description: questionData?.question,
      type: questionData?.type || 'MCQ',
      difficulty: questionData.difficulty || 1,
      hint: questionData?.hint || '',
      qbmId: questionBankData?.questionBank?.id,
      attachmentType: '',

      // TODO: remove or update later
      createdBy: 'Zicops',
      updatedBy: 'Zicops',
      status: QUESTION_STATUS[1]
    };

    // add files if available
    if (questionData?.questionFile) {
      sendQuestionData.file = questionData?.questionFile;
      sendQuestionData.attachmentType = questionData?.attachmentType || '';
    }

    if (questionData?.id) sendQuestionData.id = quiz?.questionId;

    const isEdit = !!sendQuestionData?.id;

    let isError = false;
    // add update question
    const questionRes = await mutateData(
      isEdit ? UPDATE_QUESTION_BANK_QUESTION : ADD_QUESTION_BANK_QUESTION,
      sendQuestionData
    ).catch(() => (isError = true));

    if (!questionRes || isError) {
      setToastMessage(`${isEdit ? 'Update' : 'Add'} Question Error`);
      return null;
    }

    const questionId = questionRes?.data?.addQuestionBankQuestion?.id;

    // add update option
    for (let i = 0; i < optionData?.length; i++) {
      const option = optionData[i];
      if (!option.option && !option.file) continue;

      const sendOptionData = {
        description: option.option || '',
        isCorrect: option.isCorrect || false,
        qmId: questionId,
        isActive: true,
        attachmentType: option.attachmentType || '',

        // TODO: remove or update later
        createdBy: 'Zicops',
        updatedBy: 'Zicops'
      };

      // add files
      if (option.file) {
        sendOptionData.file = option.file;
        sendOptionData.attachmentType = option.attachmentType;
      }

      if (option?.id) sendOptionData.id = option?.id;

      const isOptionEdit = !!sendOptionData?.id;

      await mutateData(
        isOptionEdit ? UPDATE_QUESTION_OPTIONS : ADD_QUESTION_OPTIONS,
        sendOptionData
      ).catch(() =>
        setToastMsg({
          type: 'danger',
          message: `${isOptionEdit ? 'Update' : 'Add'} Option (${i + 1}) Error`
        })
      );
    }

    return questionId;
  }

  async function addUpdateQuiz() {
    if (!questionBankData?.questionBank) return;

    const subCatQb = questionBankData?.questionBank || {};

    for (let i = 0; i < topicQuiz?.length; i++) {
      const quiz = topicQuiz[i];

      let questionId = quiz?.questionId;

      if (quiz?.formType === 'create') {
        questionId = await addUpdateQuestionAndOptions(
          {
            question: quiz?.question,
            type: quiz?.type,
            difficulty: quiz.difficulty || 1,
            hint: quiz?.hint,
            questionFile: quiz?.questionFile,
            attachmentType: quiz?.attachmentType
          },
          quiz?.options
        );
      }

      const startTime = +quiz?.startTimeMin * 60 + +quiz?.startTimeSec;
      const sendQuizData = {
        name: quiz?.name || '',
        category: courseMetaData?.category || '',
        type: quiz?.type || '',
        isMandatory: quiz?.isMandatory || false,
        topicId: quiz?.topicId || '',
        courseId: courseMetaData?.courseId || '',
        qbId: subCatQb?.id,
        weightage: 1,
        sequence: i + 1,
        startTime: startTime,
        questionId: questionId
      };

      if (!questionId) {
        setToastMessage('Question Id not found!');
        continue;
      }

      if (quiz?.id) sendQuizData.id = quiz?.id;

      const isQuizEdit = !!sendQuizData?.id;

      mutateData(isQuizEdit ? UPDATE_TOPIC_QUIZ : ADD_TOPIC_QUIZ, sendQuizData).catch(() =>
        setToastMsg({ type: 'danger', message: `${isQuizEdit ? 'Update' : 'Add'} Quiz Error` })
      );
    }
  }

  async function handleSubmit() {
    setIsSubmitDisabled(true);
    await addUpdateTopicContent();
    await addSubtitle();
    await addResources();
    await addUpdateQuiz();

    setIsSubmitDisabled(null);
    setTopicUploadProgress(null);
    closePopUp();
  }

  return {
    topicData,
    setTopicData,
    addUpdateTopic,
    isSubmitDisabled,
    isEditTopicFormVisible,
    toggleEditTopicForm,
    handleSubmit
  };
}
