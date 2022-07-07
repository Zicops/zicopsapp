import { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../state/contexts/UserContext';

export default function useSaveData(videoElement) {
  const { addBookmarkData, addNotes } = useContext(userContext);

  const [showQuizDropdown, setShowQuizDropdown] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const [showBox, setShowBox] = useState(null);
  const BOX = ['subtitles', 'resources', 'discussion', 'bookmark', 'notes', 'quiz'];

  function toggleStates(setState, state) {
    setState(!state);
  }

  function switchBox(boxNumber) {
    if (showBox === BOX[boxNumber]) return setShowBox(null);

    setShowBox(BOX[boxNumber] || null);
  }

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

  function handleSaveBookmark(timestamp) {
    const image = captureImageOfVideo();
    setBookmarkData({
      ...bookmarkData,
      captureImg: image,
      timestamp: timestamp
    });

    //   save to context
    addBookmarkData({
      ...bookmarkData,
      id: new Date().getMilliseconds(),
      captureImg: image,
      timestamp
    });
    alert('Bookmark added');
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
