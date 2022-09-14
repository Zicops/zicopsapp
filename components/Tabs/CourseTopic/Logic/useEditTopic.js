import { loadQueryDataAsync } from '@/helper/api.helper';
import { QUESTION_STATUS } from '@/helper/constants.helper';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  ADD_QUESTION_BANK_QUESTION,
  ADD_QUESTION_OPTIONS,
  ADD_TOPIC_CONTENT,
  ADD_TOPIC_QUIZ,
  CREATE_QUESTION_BANK,
  mutationClient,
  UPDATE_COURSE_TOPIC,
  UPDATE_TOPIC_CONTENT,
  UPLOAD_TOPIC_CONTENT_SUBTITLE,
  UPLOAD_TOPIC_CONTENT_VIDEO,
  UPLOAD_TOPIC_RESOURCE
} from '../../../../API/Mutations';
import {
  GET_COURSE_TOPICS_CONTENT,
  GET_LATEST_QUESTION_BANK,
  GET_QUESTIONS_NAMES,
  GET_TOPIC_QUIZ,
  GET_TOPIC_RESOURCES,
  queryClient
} from '../../../../API/Queries';
import { filterTopicContent } from '../../../../helper/data.helper';
import {
  BingeAtom,
  getBingeObject,
  getQuizObject,
  getTopicObject,
  isLoadingAtom,
  QuizAtom,
  ResourcesAtom,
  TopicAtom,
  TopicContentAtom,
  TopicSubtitleAtom,
  TopicVideoAtom,
  uploadStatusAtom
} from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { courseContext } from '../../../../state/contexts/CourseContext';
import useAddTopicContent from './useAddTopicContent';

export default function useEditTopic(refetchDataAndUpdateRecoil) {
  const { fullCourse } = useContext(courseContext);
  // topic content, chapter, topic data query obj
  const [loadTopicContentData, { error: errorContentData }] = useLazyQuery(
    GET_COURSE_TOPICS_CONTENT,
    { client: queryClient }
  );
  const [loadResourcesData, { error: errorResourcesData }] = useLazyQuery(GET_TOPIC_RESOURCES, {
    client: queryClient
  });

  // recoil state
  const [topicData, updateTopicData] = useRecoilState(TopicAtom);
  const [topicContent, updateTopicContent] = useRecoilState(TopicContentAtom);
  const [topicVideo, updateTopicVideo] = useRecoilState(TopicVideoAtom);
  const [topicSubtitle, updateTopicSubtitle] = useRecoilState(TopicSubtitleAtom);
  const [binge, updateBinge] = useRecoilState(BingeAtom);
  const [quizData, updateQuizData] = useRecoilState(QuizAtom);
  const [resources, updateResources] = useRecoilState(ResourcesAtom);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const [uploadStatus, setUploadStatus] = useRecoilState(uploadStatusAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // mutations
  const [updateCourseTopic, { error: updateTopicError }] = useMutation(UPDATE_COURSE_TOPIC);
  const [addCourseTopicContent, { loading: addContentLoading }] = useMutation(ADD_TOPIC_CONTENT);
  const [updateCourseTopicContent] = useMutation(UPDATE_TOPIC_CONTENT);
  const [uploadCourseContentVideo, { loading: uploadVideoLoading }] = useMutation(
    UPLOAD_TOPIC_CONTENT_VIDEO
  );
  const [uploadCourseContentSubtitle, { loading: uploadSubtileLoading }] = useMutation(
    UPLOAD_TOPIC_CONTENT_SUBTITLE
  );
  const [uploadTopicResource, { loading: uploadResourcesLoading }] =
    useMutation(UPLOAD_TOPIC_RESOURCE);
  const [createQuestionBank, { error: createError }] = useMutation(CREATE_QUESTION_BANK, {
    client: mutationClient
  });
  const [addQuestion, { error: addQuestionErr }] = useMutation(ADD_QUESTION_BANK_QUESTION, {
    client: mutationClient
  });
  const [addOption, { error: addOptionErr }] = useMutation(ADD_QUESTION_OPTIONS, {
    client: mutationClient
  });
  const [addQuiz] = useMutation(ADD_TOPIC_QUIZ, {
    client: mutationClient
  });

  // local state
  const [editTopic, setEditTopic] = useState(getTopicObject({ courseId: fullCourse.id }));
  const [isEditTopicFormVisible, setIsEditTopicFormVisible] = useState(false);
  const [isEditTopicReady, setIsEditTopicReady] = useState(false);

  // custom hooks to manage data in edit topic form, includes topic content
  const topicContentData = useAddTopicContent(editTopic);

  useEffect(() => {
    setEditTopic(getTopicObject({ courseId: fullCourse.id }));
  }, []);

  // reset binge data and disable/enable update button
  useEffect(() => {
    updateBinge(getBingeObject());

    setIsEditTopicReady(!!editTopic?.name && !!editTopic?.description);
  }, [editTopic]);

  // set local state to edit topic data for form
  async function activateEditTopic(topicId, topicDataFromAddTopic) {
    let currentTopic = null;
    if (topicDataFromAddTopic) {
      currentTopic = topicDataFromAddTopic;
    } else {
      const index = topicData.findIndex((t) => t.id === topicId);
      if (index < 0) return;
      currentTopic = topicData[index];
    }

    setEditTopic(currentTopic);
    setIsEditTopicFormVisible(false);

    if (currentTopic?.type === 'Content') {
      // topic content load
      loadTopicContentData({ variables: { topic_id: topicId }, fetchPolicy: 'no-cache' }).then(
        ({ data }) => {
          const topicContentArray = [];
          const topicVideoArray = [];
          const topicSubtitleArray = [];

          topicContentData.toggleTopicContentForm(data.getTopicContent.length === 0);
          data.getTopicContent.forEach((content, index) => {
            const contentData = {
              topicId: content.topicId,
              id: content.id,
              language: content.language,
              type: content.type,
              duration: content.duration,
              is_default: content.is_default
            };
            const topicVideoData = {
              courseId: content.courseId,
              contentId: content.id,
              contentUrl: content.contentUrl,
              file: null
            };

            topicContentArray.push(contentData);
            topicVideoArray.push(topicVideoData);

            for (let i = 0; i < content?.subtitleUrl?.length; i++) {
              const subtitle = content?.subtitleUrl[i];
              topicSubtitleArray.push({
                courseId: content.courseId,
                topicId: content.topicId,
                subtitleUrl: subtitle.url,
                language: subtitle.language,
                file: null
              });
            }

            if (index === 0) {
              // binge data
              const startTimeMin = Math.floor(parseInt(content.startTime) / 60);
              const startTimeSec = parseInt(content.startTime) - startTimeMin * 60;
              const showTime = content.fromEndTime || content.nextShowTime;
              const showTimeMin = Math.floor(parseInt(showTime) / 60);
              const showTimeSec = parseInt(showTime) - showTimeMin * 60;

              const bingeData = {
                startTimeMin: startTimeMin,
                startTimeSec: startTimeSec,
                skipIntroDuration: content.skipIntroDuration,
                showTimeMin: showTimeMin,
                showTimeSec: showTimeSec,
                isFromEnd: content.fromEndTime > 0
              };
              updateBinge(bingeData);
            }
          });
          updateTopicContent(topicContentArray);
          updateTopicVideo(topicVideoArray);
          updateTopicSubtitle(topicSubtitleArray);

          if (errorContentData)
            setToastMsg({ type: 'danger', message: 'Topic Content Load Error' });
        }
      );

      // resources
      loadResourcesData({ variables: { topic_id: topicId }, fetchPolicy: 'no-cache' }).then(
        ({ data }) => {
          updateResources(data.getTopicResources);

          if (errorResourcesData) setToastMsg({ type: 'danger', message: 'Resources Load Error' });
        }
      );

      const quizRes = await loadQueryDataAsync(
        GET_TOPIC_QUIZ,
        { topic_id: topicId },
        { fetchPolicy: 'no-cache' }
      );

      if (quizRes?.getTopicQuizes)
        updateQuizData(quizRes?.getTopicQuizes?.sort((q1, q2) => q1?.sequence - q2?.sequence));
    }

    const filteredTopicContent = filterTopicContent(topicContent, topicId);
    topicContentData.toggleTopicContentForm(filteredTopicContent.length === 0);
  }

  // toggle edit topic form
  function toggleEditTopicForm(value) {
    if (typeof value === 'boolean') setIsEditTopicFormVisible(value);

    setIsEditTopicFormVisible(!isEditTopicFormVisible);
  }

  // save edit topic in function
  async function updateTopicAndContext() {
    const sendTopicData = {
      id: editTopic?.id,
      name: editTopic?.name,
      description: editTopic?.description,
      type: editTopic?.type,
      moduleId: editTopic?.moduleId,
      chapterId: editTopic?.chapterId,
      courseId: editTopic?.courseId,
      sequence: editTopic?.sequence
    };

    let isError = false;
    await updateCourseTopic({
      variables: sendTopicData
    }).catch((err) => {
      console.log(err);
      isError = true;
      return setToastMsg({ type: 'danger', message: 'Topic Update Error' });
    });

    if (updateTopicError) return setToastMsg({ type: 'danger', message: 'Topic Update Error' });

    refetchDataAndUpdateRecoil('topic');
    if (!isError) setToastMsg({ type: 'success', message: 'Topic Updated' });

    setIsEditTopicFormVisible(false);
  }

  // save to db and update context with refetch
  async function handleEditTopicSubmit() {
    console.log('Topic and Resources upload started');
    setIsLoading(
      addContentLoading && uploadVideoLoading && uploadSubtileLoading && uploadResourcesLoading
    );

    console.log(topicContent);
    for (let index = 0; index < topicContent.length; index++) {
      const content = topicContent[index];
      const startTime = parseInt(binge.startTimeMin) * 60 + parseInt(binge.startTimeSec);
      const showTime = parseInt(binge.showTimeMin) * 60 + parseInt(binge.showTimeSec);

      const sendContentData = {
        courseId: fullCourse.id,
        topicId: content.topicId,
        language: content.language,
        type: content.type,
        duration: content.duration,
        startTime: startTime,
        skipIntroDuration: binge.skipIntroDuration,
        nextShowTime: !binge.isFromEnd ? showTime : 0,
        fromEndTime: binge.isFromEnd ? showTime : 0,
        is_default: content.is_default
      };
      let data = {};
      if (!!content.id) {
        console.log(
          `Topic Content with id ${content.id} and language ${content.language} is updated`
        );
        const { courseId, topicId, ...updateContentData } = sendContentData;
        updateContentData.contentId = content.id;
        data = await (
          await updateCourseTopicContent({ variables: updateContentData }).catch((err) =>
            console.log(err)
          )
        ).data;
      } else {
        console.log('sendContentData', sendContentData);
        data = await (
          await addCourseTopicContent({ variables: sendContentData }).catch((err) =>
            console.log(err)
          )
        ).data;
      }

      console.log(`Topic Content Uploaded with language ${content.language}`);

      if (data.addTopicContent || content.id) {
        const sendVideoData = {
          contentId: data.addTopicContent?.id || content.id,
          courseId: topicVideo[index].courseId,
          file: topicVideo[index].file
        };

        await uploadCourseContentVideo({
          variables: sendVideoData,
          context: {
            fetchOptions: {
              useUpload: true,
              onProgress: (ev) => {
                setUploadStatus({
                  [content.language]: ev.loaded / ev.total
                });
              }
            }
          }
        }).catch((err) => console.log(err));

        console.log(`Topic Video Uploaded with language ${content.language}`);
      }
    }

    // if (topicSubtitle[index].file) {
    for (let i = 0; i < topicSubtitle.length; i++) {
      const subtitle = topicSubtitle[i];
      const sendResources = {
        topicId: subtitle.topicId,
        courseId: subtitle.courseId,
        file: subtitle.file,
        language: subtitle.language
      };
      await uploadCourseContentSubtitle({ variables: sendResources }).catch((err) =>
        console.log(err)
      );

      console.log(`Topic Subtitle Uploaded with language ${subtitle.language}`);
    }
    // }

    console.log('Topic Content and related Video and Subtitle Uploaded');

    for (let index = 0; index < resources.length; index++) {
      const resource = resources[index];

      const sendResources = {
        name: resource.name,
        type: resource.type,
        topicId: resource.topicId,
        courseId: resource.courseId
      };
      if (resource.file && resource.type !== 'LINK') {
        sendResources.file = resource.file;
      } else {
        sendResources.url = resource.url;
      }

      await uploadTopicResource({ variables: sendResources }).catch((err) => console.log(err));
    }

    let isError = false;
    const queryVariables = { publish_time: Date.now(), pageSize: 99999, pageCursor: '' };
    const qbRes = await loadQueryDataAsync(GET_LATEST_QUESTION_BANK, queryVariables);

    let subCatQb = qbRes?.getLatestQuestionBank?.questionBanks?.find(
      (qb) => qb?.name === fullCourse?.sub_category
    );
    let allQuestionsArr = [];
    if (!subCatQb) {
      const sendData = {
        name: fullCourse?.sub_category,
        description: '',
        category: fullCourse?.category,
        sub_category: fullCourse.sub_category,

        //TODO: extra data for success, remove or make this dynamic
        created_by: 'Zicops',
        updated_by: 'Zicops',
        is_active: true,
        is_default: true,
        owner: 'Zicops'
      };

      const createdQbRes = await createQuestionBank({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Question Bank Create Error' });
      });

      subCatQb = createdQbRes?.createQuestionBank;
    } else {
      const questionRes = await loadQueryDataAsync(GET_QUESTIONS_NAMES, {
        question_bank_id: subCatQb?.id
      });
      allQuestionsArr = questionRes?.getQuestionBankQuestions;
    }

    for (let i = 0; i < quizData.length; i++) {
      const quiz = quizData[i];
      if (quiz?.id) continue;

      const isDuplicate = allQuestionsArr.some(
        (q) => q?.Description?.toLowerCase()?.trim() === quiz?.question?.toLowerCase()?.trim()
      );
      if (isDuplicate)
        return setToastMsg({ type: 'danger', message: 'Quiz with same question cannot be added!' });

      const sendQuestionData = {
        name: '',
        description: quiz?.question || '',
        type: quiz?.type || '',
        difficulty: quiz.difficulty || 0,
        hint: quiz?.hint || '',
        qbmId: subCatQb?.id || null,
        attachmentType: '',

        // TODO: remove or update later
        createdBy: 'Zicops',
        updatedBy: 'Zicops',
        status: QUESTION_STATUS[1]
      };

      if (quiz?.questionFile) {
        sendQuestionData.file = quiz?.questionFile;
        sendQuestionData.attachmentType = quiz?.attachmentType || '';
      }
      // console.log(sendQuestionData);
      // add question
      const questionRes = await addQuestion({ variables: sendQuestionData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Add Question Error' });
      });

      if (!questionRes || isError)
        return setToastMsg({ type: 'danger', message: 'Add Question Error' });

      const options = quiz?.options || [];
      // add option
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        // console.log(option);
        if (!option.option && !option.file) continue;

        const sendOptionData = {
          description: option.option || '',
          isCorrect: option.isCorrect || false,
          qmId: questionRes?.data?.addQuestionBankQuestion?.id,
          isActive: true,
          attachmentType: option.attachmentType || '',

          // TODO: remove or update later
          createdBy: 'Zicops',
          updatedBy: 'Zicops'
        };

        if (option.file) {
          sendOptionData.file = option.file;
          sendOptionData.attachmentType = option.attachmentType;
        }

        // console.log(sendOptionData);
        await addOption({ variables: sendOptionData }).catch((err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: `Add Option (${i + 1}) Error` });
        });
      }

      // if (!isError) setToastMsg({ type: 'success', message: 'New Question Added with Options' });
      if (isError) continue;

      const startTime = parseInt(quiz?.startTimeMin) * 60 + parseInt(quiz?.startTimeSec);
      const sendQuizData = {
        name: quiz?.name || '',
        category: fullCourse?.category || '',
        type: quiz?.type || '',
        isMandatory: quiz?.isMandatory || false,
        topicId: quiz?.topicId || '',
        courseId: quiz?.courseId || '',
        questionId: questionRes?.data?.addQuestionBankQuestion?.id,
        qbId: subCatQb?.id,
        weightage: 1,
        sequence: i + 1,
        startTime: startTime || 0
      };
      console.log(sendQuizData);
      const quizRes = await addQuiz({ variables: sendQuizData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Add Question Error' });
      });
      console.log(quizRes);
      updateQuizData([...quizData, quizRes?.data?.addQuiz]);
    }

    setUploadStatus(null);
    console.log('Topic Content and resources Uploaded');
    setToastMsg({ type: 'success', message: 'Topic Content and Resources Uploaded' });
    setEditTopic(getTopicObject({ courseId: fullCourse.id }));
  }

  return {
    editTopic,
    setEditTopic,
    activateEditTopic,
    toggleEditTopicForm,
    isEditTopicFormVisible,
    isEditTopicReady,
    topicContentData,
    handleEditTopicSubmit,
    updateTopicAndContext
  };
}
