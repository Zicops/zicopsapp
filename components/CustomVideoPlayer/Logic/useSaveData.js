import { ADD_USER_BOOKMARK, userClient } from '@/api/UserMutations';
import { QuizAtom } from '@/state/atoms/module.atoms';
import { THUMBNAIL_GAP } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { UserCourseDataAtom, VideoAtom } from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userContext } from '../../../state/contexts/UserContext';
import { BOX } from './customVideoPlayer.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';

export default function useSaveData(videoElement, freezeState) {
  const [addUserBookMark] = useMutation(ADD_USER_BOOKMARK, {
    client: userClient
  });

  const userDataGlobal = useRecoilValue(UserDataAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const userData = useRecoilValue(UserStateAtom);
  const userCourseData = useRecoilValue(UserCourseDataAtom);
  const [showQuiz, setShowQuiz] = useState(null);

  const { fullCourse } = useContext(courseContext);
  const {
    addBookmarkData,
    addNotes,
    setBookmarkData: saveBMData,
    bookmarkData: bmD
  } = useContext(userContext);

  const [showQuizDropdown, setShowQuizDropdown] = useState(false);

  const [freezeScreen, setFreezeScreen] = freezeState;
  const [showBox, setShowBox] = useState(null);
  const [isBookMarkDisable, setIsBookMarkDisable] = useState(false);

  const [bookmarkData, setBookmarkData] = useState({
    time_stamp: '',
    name: '',
    topic_id: ''
    // captureImg: ''
  });

  useEffect(async () => {
    const thumbnailsGap = THUMBNAIL_GAP;
    if (!videoElement?.current?.duration) return;

    // await generateVideoThumbnails(thumbnailsGap, videoElement?.current?.duration);

    // async function generateVideoThumbnails(thumbnailsGap, duration) {
    //   let thumbnail = [];
    //   let fractions = [];
    //   for (let i = 0; i <= duration; i += thumbnailsGap) {
    //     fractions.push(Math.floor(i));
    //   }
    //   // for (let time in fractions){
    //   //   showThumbnailPointsInProgressbar(time);
    //   //   let oneThums = await getVideoThumbnail(time);
    //   //   thumbnail.push(oneThums);
    //   // }
    //   fractions.map(async (time) => {
    //     // showThumbnailPointsInProgressbar(time);
    //     let oneThums = await getVideoThumbnail(time);
    //     thumbnail.push(oneThums);
    //   });
    //   // console.log('thumbnail', thumbnail);
    // }

    // async function getVideoThumbnail(videoTimeInSeconds) {
    //   return new Promise((resolve, reject) => {
    //     var video = document.createElement('video');
    //     var timeupdate = function () {
    //       if (snapImage()) {
    //         video.removeEventListener('timeupdate', timeupdate);
    //         video.pause();
    //       }
    //     };
    //     video.addEventListener('loadeddata', function () {
    //       if (snapImage()) {
    //         video.removeEventListener('timeupdate', timeupdate);
    //       }
    //     });
    //     var snapImage = function () {
    //       var canvas = document.createElement('canvas');
    //       var scaleFactor = 0.5;
    //       canvas.width = video.videoWidth * scaleFactor;
    //       canvas.height =  video.videoHeight * scaleFactor;
    //       canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    //       var image = canvas.toDataURL();
    //       var success = image.length > 100000;
    //       if (success) {
    //         URL.revokeObjectURL(videoData.videoSrc);
    //         resolve(image);
    //       }
    //       return success;
    //     };
    //     video.addEventListener('timeupdate', timeupdate);
    //     video.preload = 'metadata';
    //     video.src = videoData.videoSrc;
    //     // Load video in Safari / IE11
    //     video.muted = true;
    //     video.playsInline = true;
    //     video.currentTime = videoTimeInSeconds;
    //     video.play();
    //   });
    // }
    // showThumbnailPointsInProgressbar(280, 'bookmarkIndicator');
    // showThumbnailPointsInProgressbar(300, 'quizIndicator');
    // async function showThumbnailPointsInProgressbar(videoTimeInSeconds, indicator) {
    //   let percent = (videoTimeInSeconds/videoElement?.current?.duration) * 100;
    //   let thumbPoints = document.getElementById(indicator);
    //   let thumbSpan = document.createElement('span');
    //   thumbSpan.style.left = percent + '%';
    //   thumbPoints.appendChild(thumbSpan);
    // }
    // OLD CODE SEMI-WORKING
    // if (!videoElement?.current?.duration) return;
    // let thumbnail = [];
    // let fractions = [];
    // for (let i = 0; i <= videoElement?.current?.duration; i += thumbnailsGap) {
    //   fractions.push(Math.floor(i));
    // }
    // // the array of promises
    // let promiseArray = fractions.map( async (time) => {
    //   return await new Promise((resolve, reject) => {
    //     var video = document.createElement('video');
    //     var timeupdate = function () {
    //       if (snapImage()) {
    //         video.removeEventListener('timeupdate', timeupdate);
    //         video.pause();
    //       }
    //     };
    //     video.addEventListener('loadeddata', function () {
    //       if (snapImage()) {
    //         video.removeEventListener('timeupdate', timeupdate);
    //       }
    //     });
    //     var snapImage = function () {
    //       var canvas = document.createElement('canvas');
    //       const scaleFactor = 0.25;
    //       canvas.width = video.videoWidth * scaleFactor;
    //       canvas.height = video.videoHeight * scaleFactor;
    //       canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    //       var image = canvas.toDataURL();
    //       var success = image.length > 100000;
    //       if (success) {
    //         URL.revokeObjectURL(videoData.videoSrc);
    //         resolve(image);
    //       }
    //       return success;
    //     };
    //     video.addEventListener('timeupdate', timeupdate);
    //     video.preload = 'metadata';
    //     video.src = videoData.videoSrc;
    //     // Load video in Safari / IE11
    //     video.muted = true;
    //     video.playsInline = true;
    //     video.currentTime = time;
    //     video.play();
    //   });
    // });
    // console.log(promiseArray);

    // await Promise.all(promiseArray)
    //   .then((res) => {
    //     res.forEach((res) => {
    //       thumbnail.push(res);
    //     });
    //     resolve(thumbnail);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
    //   .finally((res) => {
    //     resolve(thumbnail);
    //   });

    // console.log(thumbnail);
    // function VideoToImageAtTime(time) {
    //   //   remove after testing
    //   if (!videoElement.current) return alert('Video Ref Not Updated!');

    //   // const video = videoElement.current;
    //   var video = document.createElement('video');
    //   video.preload = 'metadata';
    //   video.src = videoData.videoSrc;
    //   // Load video in Safari / IE11
    //   video.muted = true;
    //   video.playsInline = true;
    //   video.currentTime = time;
    //   video.play();

    //   //  quality
    //   const scaleFactor = 0.25;
    //   const w = video.videoWidth * scaleFactor;
    //   const h = video.videoHeight * scaleFactor;

    //   const canvas = document.createElement('canvas');
    //   canvas.width = w;
    //   canvas.height = h;

    //   const ctx = canvas.getContext('2d');
    //   ctx.drawImage(video, 0, 0, w, h);
    //   video.pause();
    //   return canvas?.toDataURL('image/png');
    // }
  }, [videoElement?.current?.duration]);

  function toggleStates(setState, state) {
    setState(!state);
  }

  function switchBox(boxNumber) {
    if (showBox === BOX[boxNumber]) return setShowBox(null);

    setShowBox(BOX[boxNumber] || null);
  }

  function handleBookmarkChange(e) {
    console.log(e);
    setBookmarkData({
      ...bookmarkData,
      name: e.target.value
    });
  }

  function getImageURLOfVideo() {
    //   remove after testing
    if (!videoElement.current) return alert('Video Ref Not Updated!');

    const video = videoElement.current;

    //  quality
    const scaleFactor = 0.25;
    const w = video.videoWidth * scaleFactor;
    const h = video.videoHeight * scaleFactor;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);

    return canvas?.toDataURL('image/png');
  }

  async function handleSaveBookmark() {
    // const image = captureImageOfVideo();
    // setBookmarkData({ ...bookmarkData });

    setIsBookMarkDisable(true);

    if (!bookmarkData?.name) {
      setIsBookMarkDisable(false);
      return setToastMsg({ type: 'danger', message: 'BookMark title cannot be empty!' });
    }

    const sendBookMarkData = {
      user_id: userData?.id,
      user_lsp_id: userOrgData?.user_lsp_id,
      user_course_id: userCourseData?.userCourseMapping?.user_course_id,
      course_id: fullCourse?.id,
      topic_id: videoData?.topicContent[0]?.topicId,
      module_id: videoData?.currentModuleId,
      name: bookmarkData?.name,
      time_stamp: `${bookmarkData?.time_stamp}`,
      is_active: true
    };

    // return;
    const res = await addUserBookMark({ variables: sendBookMarkData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: 'Error while adding bookmark!' });
    });
    console.log(res);
    //   save to context
    if (!res?.data?.addUserBookmark?.[0])
     { setIsBookMarkDisable(false); 
      return setToastMsg({ type: 'danger', message: 'Bookmark add error' });}
    addBookmarkData(res?.data?.addUserBookmark?.[0]);

    setBookmarkData({ time_stamp: '', name: '', topic_id: '' });
    // console.log(res?.data?.addUserBookmark[0]);
    setToastMsg({ type: 'success', message: 'Bookmark added' });
    setIsBookMarkDisable(false);
    // console.log(bookmarkData, sendBookMarkData);
    return true;
  }

  const states = {
    showQuizDropdown,
    setShowQuizDropdown,
    showQuiz,
    setShowQuiz
  };
  return {
    showBox,
    setShowBox,
    switchBox,
    BOX,
    states,
    toggleStates,
    handleBookmarkChange,
    bookmarkData,
    setBookmarkData,
    handleSaveBookmark,
    isBookMarkDisable
    // notes,
    // handleNotesChange,
    // handleSaveNotes
  };
}

// var videoId = 'video';
// var scaleFactor = 0.25;
// // var snapshots = [];

// function capture(video, scaleFactor) {
//   if (scaleFactor == null) {
//     scaleFactor = 1;
//   }
//   var w = video.videoWidth * scaleFactor;
//   var h = video.videoHeight * scaleFactor;
//   var canvas = document.createElement('canvas');
//   canvas.width = w;
//   canvas.height = h;
//   var ctx = canvas.getContext('2d');
//   ctx.drawImage(video, 0, 0, w, h);
//   return canvas;
// }

// /**
//  * Invokes the <code>capture</code> function and attaches the canvas element to the DOM.
//  */
// function shoot() {
//   var video = document.getElementById(videoId);
//   //   var output = document.getElementById('output');
//   var canvas = capture(video, scaleFactor);
//   //   canvas.onclick = function () {
//   //     window.open(this.toDataURL());
//   //   };
//   //   snapshots.unshift(canvas);
//   //   output.innerHTML = '';
//   //   for (var i = 0; i < 4; i++) {
//   //     output.appendChild(snapshots[i]);
//   //   }

//   // https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
//   return canvas.toDataURL('image/png');
// }
