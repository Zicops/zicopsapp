import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getQuizObject, ResourcesAtom } from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';

export default function useAddQuiz(courseId = '', topicId = '') {
  // recoil state
  const [quizzes, addQuizzes] = useRecoilState(ResourcesAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [isQuizFormVisible, setIsQuizFormVisible] = useState(false);
  const [isQuizReady, setIsQuizReady] = useState(false);
  const [newQuiz, setNewQuiz] = useState(getQuizObject({ courseId, topicId }));

  // update resouce courseid and topicid
  useEffect(() => {
    setNewQuiz({
      ...newQuiz,
      topicId: topicId,
      courseId: courseId
    });
  }, [topicId, courseId]);

  useEffect(() => {
    setIsQuizReady(newQuiz.name && newQuiz.type && (newQuiz.file || newQuiz.url));
  }, [newQuiz]);

  function toggleQuizForm() {
    setIsQuizFormVisible(!isQuizFormVisible);
  }

  // validation for only taking only accepted type images
  function isImageValid(e) {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      if (!file) return false;
      if (!imageTypes.includes(file?.type)) {
        setToastMsg({ type: 'danger', message: `${imageTypes.join(', ')} only accepted` });
        return false;
      }
    }

    return true;
  }

  // input handler
  function handleQuizInput(e, index = null) {
    console.log(newQuiz);
    if (e.value) {
      return setNewQuiz({ ...newQuiz, type: e.value });
    }

    if (index) {
      const updatedOption = { ...newQuiz?.options[index] };

      if (e.target.type === 'file') {
        const file = e.target.files[0];
        if (!file) return;
        if (!isImageValid(e)) return;

        updatedOption.file = e.target.files[0];
      } else if (e.target.type === 'checkbox') {
        updatedOption.isCorrect = e.target.checked;
      } else {
        updatedOption[e.target.name] = e.target.value;
      }

      return setNewQuiz({
        ...newQuiz,
        options: newQuiz?.options.map((o, i) => (i === optionIndex ? updatedOption : o))
      });
    }

    if (e.target.type === 'checkbox') {
      return setNewQuiz({ ...newQuiz, [e.target.name]: e.target.checked });
    }

    if (e.target.type == 'file') {
      const file = e.target.files[0];
      if (!file) return;
      if (!isImageValid(e)) return;

      return setNewQuiz({ ...newQuiz, questionFile: e.target.files[0] });
    }

    setNewQuiz({
      ...newQuiz,
      [e.target.name]: e.target.value
    });
  }

  // save in recoil state
  function addNewQuiz() {
    addQuizzes([...quizzes, newQuiz]);
    setNewQuiz(getQuizObject({ courseId, topicId }));
    setIsQuizFormVisible(false);
  }

  return {
    newQuiz,
    handleQuizInput,
    addNewQuiz,
    isQuizFormVisible,
    toggleQuizForm,
    isQuizReady
  };
}
