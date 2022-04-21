import { useLazyQuery, useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ADD_TOPIC_CONTENT,
  UPDATE_COURSE_TOPIC,
  UPLOAD_TOPIC_CONTENT_SUBTITLE,
  UPLOAD_TOPIC_CONTENT_VIDEO,
  UPLOAD_TOPIC_RESOURCE
} from '../../../API/Mutations';
import { GET_COURSE_TOPICS_CONTENT, GET_TOPIC_RESOURCES, queryClient } from '../../../API/Queries';
import { filterTopicContent } from '../../../helper/data.helper';
import {
  BingeAtom,
  getBingeObject,
  getTopicObject,
  ResourcesAtom,
  TopicAtom,
  TopicContentAtom,
  TopicSubtitleAtom,
  TopicVideoAtom
} from '../../../state/atoms/module.atoms';
import { courseContext } from '../../../state/contexts/CourseContext';
import useAddTopicContent from './useAddTopicContent';

export default function useEditTopic(togglePopUp, refetchDataAndUpdateRecoil) {
  const { fullCourse } = useContext(courseContext);
  // topic content, chapter, topic data query obj
  const [loadTopicContentData, { error: errorContentData, refetch: refetchTopicContent }] =
    useLazyQuery(GET_COURSE_TOPICS_CONTENT, { client: queryClient });

  const [loadResourcesData, { error: errorResourcesData, refetch: refetchResources }] =
    useLazyQuery(GET_TOPIC_RESOURCES, { client: queryClient });

  // recoil state
  const [topicData, updateTopicData] = useRecoilState(TopicAtom);
  const [topicContent, updateTopicContent] = useRecoilState(TopicContentAtom);
  const [topicVideo, updateTopicVideo] = useRecoilState(TopicVideoAtom);
  const [topicSubtitle, updateTopicSubtitle] = useRecoilState(TopicSubtitleAtom);
  const [binge, updateBinge] = useRecoilState(BingeAtom);
  const [resources, updateResources] = useRecoilState(ResourcesAtom);

  // mutations
  const [updateCourseTopic, { error: updateTopicError }] = useMutation(UPDATE_COURSE_TOPIC);
  const [addCourseTopicContent] = useMutation(ADD_TOPIC_CONTENT);
  const [uploadCourseContentVideo] = useMutation(UPLOAD_TOPIC_CONTENT_VIDEO);
  const [uploadCourseContentSubtitle] = useMutation(UPLOAD_TOPIC_CONTENT_SUBTITLE);
  const [uploadTopicResource] = useMutation(UPLOAD_TOPIC_RESOURCE);

  // local state
  const [editTopic, setEditTopic] = useState(getTopicObject({ courseId: fullCourse.id }));
  const [isEditTopicFormVisible, setIsEditTopicFormVisible] = useState(false);
  const [isEditTopicReady, setIsEditTopicReady] = useState(false);

  // custom hooks to manage data in edit topic form, includes topic content
  const topicContentData = useAddTopicContent(editTopic);

  // reset binge data and disable/enable update button
  useEffect(() => {
    updateBinge(getBingeObject());

    setIsEditTopicReady(!!editTopic.name && !!editTopic.description);
  }, [editTopic]);
  // set local state to edit topic data for form
  function activateEditTopic(topicId) {
    const index = topicData.findIndex((t) => t.id === topicId);

    if (index < 0) return;

    setEditTopic(topicData[index]);
    togglePopUp('editTopic', true);
    setIsEditTopicFormVisible(false);

    // topic content load
    loadTopicContentData({ variables: { topic_id: topicId } }).then(({ data }) => {
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
          duration: content.duration
        };
        const topicVideoData = {
          courseId: content.courseId,
          contentId: content.id,
          contentUrl: content.contentUrl,
          file: null
        };
        const topicSubtitleData = {
          courseId: content.courseId,
          contentId: content.id,
          subtitleUrl: content.subtitleUrl || null,
          file: null
        };
        topicContentArray.push(contentData);
        topicVideoArray.push(topicVideoData);
        topicSubtitleArray.push(topicSubtitleData);

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
            isFromEnd: content.nextShowTime.toString() === '0'
          };
          updateBinge(bingeData);
        }
      });
      updateTopicContent(topicContentArray);
      updateTopicVideo(topicVideoArray);
      updateTopicSubtitle(topicSubtitleArray);

      if (errorContentData) alert('Topic Content Load Error');
    });

    // resources
    loadResourcesData({ variables: { topic_id: topicId } }).then(({ data }) => {
      updateResources(data.getTopicResources);

      if (errorResourcesData) alert('Resources Load Error');
    });

    const filteredTopicContent = filterTopicContent(topicContent, topicId);
    topicContentData.toggleTopicContentForm(filteredTopicContent.length === 0);
  }

  // toggle edit topic form
  function toggleEditTopicForm(value) {
    if (typeof value === 'boolean') setIsEditTopicFormVisible(value);

    setIsEditTopicFormVisible(!isEditTopicFormVisible);
  }

  // edit topic input handler
  function handleEditTopicInput(e) {
    setEditTopic({
      ...editTopic,
      [e.target.name]: e.target.value
    });
  }

  // save edit topic in function
  async function updateTopicAndContext() {
    const sendTopicData = {
      id: editTopic.id,
      name: editTopic.name,
      description: editTopic.description,
      type: editTopic.type,
      moduleId: editTopic.moduleId,
      chapterId: editTopic.chapterId,
      courseId: editTopic.courseId,
      sequence: editTopic.sequence
    };

    await updateCourseTopic({
      variables: sendTopicData
    });

    if (updateTopicError) return alert('Topic Update Error');

    refetchDataAndUpdateRecoil('topic');
    alert('Topic Updated');

    setIsEditTopicFormVisible(false);
  }

  // save to db and update context with refetch
  async function handleEditTopicSubmit() {
    console.log('Topic and Resources upload started');

    topicContent.forEach(async (content, index) => {
      if (content.id) {
        console.log(
          `Topic Content with id ${content.id} and language ${content.language} is skipped and not uploaded`
        );
        return;
      }

      const startTime = parseInt(binge.startTimeMin) * 60 + parseInt(binge.startTimeSec);
      const showTime = parseInt(binge.showTimeMin) * 60 + parseInt(binge.showTimeSec);

      const sendContentData = {
        topicId: content.topicId,
        language: content.language,
        type: content.type,
        duration: content.duration,
        startTime: startTime,
        skipIntroDuration: binge.skipIntroDuration,
        nextShowTime: !binge.isFromEnd ? showTime : 0,
        fromEndTime: binge.isFromEnd ? showTime : 0
      };
      const { data } = await addCourseTopicContent({ variables: sendContentData });
      console.log(`Topic Content Uploaded with language ${content.language}`);

      if (data.addTopicContent) {
        const sendVideoData = {
          contentId: data.addTopicContent.id,
          courseId: topicVideo[index].courseId,
          file: topicVideo[index].file
        };
        await uploadCourseContentVideo({ variables: sendVideoData });

        console.log(`Topic Video Uploaded with language ${content.language}`);

        if (topicSubtitle[index].file) {
          const sendSubtitleData = {
            contentId: data.addTopicContent.id,
            courseId: topicSubtitle[index].courseId,
            file: topicSubtitle[index].file
          };
          await uploadCourseContentSubtitle({ variables: sendSubtitleData });

          console.log(`Topic Subtitle Uploaded with language ${content.language}`);
        }
      }
    });
    console.log('Topic Content and related Video and Subtitle Uploaded');

    resources.forEach(async (resource) => {
      if (resource.url) return;

      const sendResources = {
        name: resource.name,
        type: resource.type,
        topicId: resource.topicId,
        courseId: resource.courseId,
        file: resource.file
      };
      await uploadTopicResource({ variables: sendResources });
    });

    togglePopUp('editTopic', false);
    alert('Topic Content and Resources Uploaded');
  }

  return {
    editTopic,
    activateEditTopic,
    toggleEditTopicForm,
    isEditTopicFormVisible,
    isEditTopicReady,
    handleEditTopicInput,
    topicContentData,
    handleEditTopicSubmit,
    updateTopicAndContext
  };
}
