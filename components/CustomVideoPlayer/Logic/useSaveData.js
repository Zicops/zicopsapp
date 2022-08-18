import { ADD_USER_BOOKMARK, userClient } from '@/api/UserMutations';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { VideoAtom } from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userContext } from '../../../state/contexts/UserContext';
import { BOX } from './customVideoPlayer.helper';

export default function useSaveData(videoElement, freezeState) {
  const [addUserBookMark] = useMutation(ADD_USER_BOOKMARK, {
    client: userClient
  });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const userData = useRecoilValue(UserStateAtom);

  const { fullCourse } = useContext(courseContext);
  const { addBookmarkData, addNotes, setBookmarkData: saveBMData } = useContext(userContext);

  const [showQuizDropdown, setShowQuizDropdown] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const [freezeScreen, setFreezeScreen] = freezeState;
  const [showBox, setShowBox] = useState(null);

  const [bookmarkData, setBookmarkData] = useState({
    timestamp: '',
    title: '',
    captureImg: ''
  });
  const [notes, setNotes] = useState({
    timestamp: '',
    title: '',
    notes: ''
  });

  useEffect(() => {
    const bookmarks = [
      { id: 1, timestamp: '00:10', title: 'New Bookmark', captureImg: null },
      { id: 2, timestamp: '00:11', title: 'New Bookmark 1', captureImg: null },
      { id: 3, timestamp: '10:11', title: 'New Bookmark 2', captureImg: null }
    ];

    saveBMData(bookmarks);
    // bookmarks.map((b) => addBookmarkData(b));
  }, []);

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
      title: e.target.value
    });
  }

  function captureImageOfVideo() {
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
    setBookmarkData({ ...bookmarkData });

    //   save to context
    addBookmarkData({
      ...bookmarkData,
      id: new Date().getMilliseconds(),
      // captureImg: image,
      timestamp: bookmarkData?.timestamp
    });

    if (!bookmarkData?.title)
      return setToastMsg({ type: 'danger', message: 'BookMark title cannot be empty!' });

    console.log(bookmarkData);

    const sendBookMarkData = {
      user_id: userData?.id,
      user_lsp_id: 'Zicops',
      user_course_id: 'RandomCourseId',
      course_id: fullCourse?.id,
      topic_id: videoData?.topicContent[0]?.topicId,
      module_id: videoData?.currentModuleId,
      name: bookmarkData?.title,
      time_stamp: `${timestamp}`,
      is_active: true
    };
    const res = await addUserBookMark({ variables: sendBookMarkData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: 'Error while adding bookmark!' });
    });

    // console.log(res?.data?.addUserBookmark[0]);
    setToastMsg({ type: 'success', message: 'BookMark added' });
    console.log(bookmarkData, sendBookMarkData);
    return true;
  }

  function handleNotesChange(e) {
    setNotes({
      ...notes,
      [e.target.name]: e.target.value
    });
  }

  function handleSaveNotes(timestamp) {
    setBookmarkData({
      ...bookmarkData,
      timestamp: timestamp
    });

    //   save to context
    addNotes({
      ...notes,
      id: new Date().getMilliseconds(),
      timestamp
    });
    alert('Notes added');
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
    notes,
    handleNotesChange,
    handleSaveNotes
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
