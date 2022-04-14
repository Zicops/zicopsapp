import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  ADD_TOPIC_CONTENT,
  UPDATE_COURSE_TOPIC,
  UPLOAD_TOPIC_CONTENT_SUBTITLE,
  UPLOAD_TOPIC_CONTENT_VIDEO,
  UPLOAD_TOPIC_RESOURCE
} from '../../../API/Mutations';
import { GET_COURSE_TOPICS_CONTENT } from '../../../API/Queries';
import { getNewTopicObject, useLoadAndSetDataInContext } from './courseTopics.helper';
import useAddTopicContent from './useAddTopicContent';

export default function useEditTopic(moduleContextData) {
  const {
    topic,
    addAndUpdateTopic,
    topicContent,
    addUpdateTopicContent,
    topicVideo,
    setCourseTopicVideo,
    topicSubtitle,
    setCourseTopicSubtitle,
    resources,
    addResourcesToTopic
  } = moduleContextData;

  const [currentTopic, setCurrentTopic] = useState(getNewTopicObject());
  const [isEditTopicReady, setIsEditTopicReady] = useState(false);

  const [updateCourseTopic] = useMutation(UPDATE_COURSE_TOPIC);
  const [uploadTopicResource] = useMutation(UPLOAD_TOPIC_RESOURCE);

  const [addCourseTopicContent, { loading: topicContentUploadLoading }] =
    useMutation(ADD_TOPIC_CONTENT);
  const [uploadCourseContentVideo, { loading: videoUploadLoading }] = useMutation(
    UPLOAD_TOPIC_CONTENT_VIDEO
  );
  const [uploadCourseContentSubtitle, { loading: subtitleUploadLoading }] = useMutation(
    UPLOAD_TOPIC_CONTENT_SUBTITLE
  );

  const addTopicContent = useAddTopicContent(moduleContextData, currentTopic || {});

  const [isEditTopicPopUpOpen, setIsEditTopicPopUpOpen] = useState(false);

  useEffect(() => {
    setIsEditTopicReady(
      currentTopic.name !== '' && currentTopic.level !== '' && currentTopic.description !== ''
    );
  }, [currentTopic]);

  // load topicContent
  // TODO: call this on activateEditTopic has been called and after currentTopic has id
  useLoadAndSetDataInContext(GET_COURSE_TOPICS_CONTENT, { topic_id: currentTopic.id }, (data) => {
    if (!data) return addTopicContent.toggleTopicContentForm(true);
    if (!data.getTopicContent) return addTopicContent.toggleTopicContentForm(true);
    if (!data.getTopicContent.length) return addTopicContent.toggleTopicContentForm(true);

    addTopicContent.toggleTopicContentForm(data.getTopicContent.length === 0);
    addUpdateTopicContent('clear');
    setCourseTopicVideo('clear');
    setCourseTopicSubtitle('clear');

    // console.log('Content - ', data);
    data.getTopicContent.forEach((res) => {
      console.log(res);
      addUpdateTopicContent(res);
      setCourseTopicVideo(res);
      setCourseTopicSubtitle(res);
    });

    // addUpdateTopicContent(data.getTopicContent[0]);
    // setCourseTopicVideo(data.getTopicContent[0]);
    // setCourseTopicSubtitle(data.getTopicContent[0]);
  });

  function toggleEditTopicPopUp(topicId) {
    if (topicId) activateEditTopic(topicId);

    if (isEditTopicPopUpOpen) {
      addUpdateTopicContent('clear');
      setCourseTopicVideo('clear');
      setCourseTopicSubtitle('clear');
      addResourcesToTopic('clear');
    }

    setIsEditTopicPopUpOpen(!isEditTopicPopUpOpen);
  }

  function activateEditTopic(topicId) {
    const index = topic.findIndex((t) => t.id === topicId);

    setCurrentTopic(topic[index] || {});
    setIsEditTopicPopUpOpen(true);
  }

  function handleEditTopicInput(e) {
    setCurrentTopic({
      ...currentTopic,
      [e.target.name]: e.target.value
    });
  }

  function handleEditTopicSubmit() {
    updateCourseTopic({
      variables: {
        ...currentTopic
      }
    }).then((res) => {
      setCurrentTopic(getNewTopicObject());
      addAndUpdateTopic(res.data.updateCourseTopic);
    });

    setIsEditTopicPopUpOpen(false);
  }

  // // merge with saveAllData
  // function saveTopicContent() {
  //   addCourseTopicContent({
  //     variables: {
  //       ...topicContent
  //     }
  //   }).then((d) => {
  //     addUpdateTopicContent(d.data.addTopicContent);
  //   });

  //   uploadCourseContentVideo({ variables: topicVideo });
  //   uploadCourseContentSubtitle({ variables: topicSubtitle });
  //   setIsContentSaved(true);
  // }

  function saveAllData() {
    console.log('res', resources);
    console.log('topicCon', topicContent);
    console.log('topicCon', topicVideo);
    console.log('topicCon', topicSubtitle);

    // return;
    // alert('Topic Content Upload Started');
    console.log('Topic Content Upload Started');

    topicContent.forEach(async (content, index) => {
      const { id, ...contentData } = content;

      if (!id) {
        const topicContentRes = await addCourseTopicContent({
          variables: {
            ...contentData
          }
        });

        console.log(topicContentRes);
        if (topicContentRes.data.addTopicContent.id) {
          const { contentIndex, contentUrl, ...videoData } = topicVideo[index];
          await uploadCourseContentVideo({
            variables: {
              ...videoData,
              contentId: topicContentRes.data.addTopicContent.id
            }
          });

          if (topicSubtitle[index].file) {
            const { contentIndex, subtitleUrl, ...subtitleData } = topicSubtitle[index];
            await uploadCourseContentSubtitle({
              variables: {
                ...subtitleData,
                contentId: topicContentRes.data.addTopicContent.id
              }
            });
          }

          alert('content uploaded');
        } else {
          alert('Topic content Id not recieved  from backend so video is not going to be uploaded');
        }
      }

      // if (!id) {
      //   addCourseTopicContent({
      //     variables: {
      //       ...contentData
      //     }
      //   })
      //     .then((d) => {
      //       // addUpdateTopicContent(d.data.addTopicContent);
      //       // setIsTopicContentFormVisible(true);
      //       console.log(d);
      //       // const { contentIndex, contentUrl, ...videoData } = topicVideo[index];
      //       // uploadCourseContentVideo({
      //       //   variables: {
      //       //     ...videoData,
      //       //     contentId: d.data.addTopicContent.id
      //       //   }
      //       // });

      //       // if (topicSubtitle[index].file) {
      //       //   const { contentIndex, subtitleUrl, ...subtitleData } = topicSubtitle[index];
      //       //   uploadCourseContentSubtitle({
      //       //     variables: {
      //       //       ...subtitleData,
      //       //       contentId: d.data.addTopicContent.id
      //       //     }
      //       //   });
      //       // }
      //     })
      //     .catch((err) => {
      //       console.log('Topic Content Save Error: ', err);
      //       alert('Topic Content Save Error, Check Log');
      //     })
      //     .finally(() => {
      //       alert('Topic Content Uploaded');
      //       console.log('Topic Content Uploaded');

      //       // resources.forEach((res) => {
      //       //   const { url, ...sendResources } = res;

      //       //   if (sendResources.file && sendResources.topicId && sendResources.courseId) {
      //       //     console.log('sendResources', sendResources);
      //       //     uploadTopicResource({
      //       //       variables: sendResources
      //       //     })
      //       //       .then((data) => {
      //       //         console.log(data);

      //       //         if (data.data.uploadTopicResource.success) {
      //       //           console.log('All Resources uploaded');
      //       //         }
      //       //       })
      //       //       .catch((err) => {
      //       //         console.log(err);
      //       //       })
      //       //       .finally(() => {
      //       //         alert('Topic Content Video and Resources Saved');
      //       //         console.log('Topic Content Video and Resources Saved');
      //       //       });
      //       //   }
      //       // });
      //     });
      // }
    });

    resources.forEach(async (res) => {
      const { url, ...sendResources } = res;
      if (sendResources.file) {
        console.log('sendResources', sendResources);
        if (sendResources.topicId && sendResources.courseId) {
          const resourceRes = await uploadTopicResource({
            variables: sendResources
          });

          if (resourceRes.data.uploadTopicResource.success) {
            console.log('All Resources uploaded', sendResources);
          }

          alert('New Topic Content Video and Resources Saved');
          console.log('Topic Content Video and Resources Saved');
        } else {
          console.log(sendResources, res);
          // alert('Res failed');
        }
      }
    });
  }

  return {
    activateEditTopic,
    isEditTopicPopUpOpen,
    toggleEditTopicPopUp,
    currentTopic,
    isEditTopicReady,
    handleEditTopicInput,
    handleEditTopicSubmit,
    saveAllData,
    addTopicContent
  };
}
