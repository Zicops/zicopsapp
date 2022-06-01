import { useRecoilState } from 'recoil';
import {
  ADD_EXAM,
  ADD_EXAM_INSTRUCTION,
  ADD_EXAM_SCHEDULE,
  mutationClient
} from '../../../../../API/Mutations';
import { ExamTabDataAtom, QuestionPaperMasterAtom } from '../../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';
import { QuestionPaperTabAtom, questionPaperTabData } from './questionPaperTab.helper';

export default function useHandlePaperTab() {
  const [addExam, { error: addExamError }] = useMutation(ADD_EXAM, {
    client: mutationClient
  });
  const [addExamInstruction, { error: addExamInstructionError }] = useMutation(
    ADD_EXAM_INSTRUCTION,
    { client: mutationClient }
  );
  const [addExamSchedule, { error: addExamScheduleError }] = useMutation(ADD_EXAM_SCHEDULE, {
    client: mutationClient
  });

  // recoil state
  const [tab, setTab] = useRecoilState(QuestionPaperTabAtom);
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // disable submit if data not complete
  function validateInput() {
    return false;
  }

  async function handleNextClick(tabIndex, isSchedule) {
    if (!validateInput())
      return setToastMsg({ type: 'danger', message: 'Please fill all the details' });

    const sendExamData = {};
    let isError = false;
    const examRes = await addExam({ variables: sendExamData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Exam Error' });
    });
    console.log(examRes);

    if (addExamError) return setToastMsg({ type: 'danger', message: `Add Exam Error` });
    if (addExamInstructionError)
      return setToastMsg({ type: 'danger', message: `Add Exam Instruction Error` });
    if (addExamScheduleError)
      return setToastMsg({ type: 'danger', message: `Add Exam Schedule Error` });

    if (!isError) setToastMsg({ type: 'success', message: 'New Question Added with Options' });
    setTab(questionPaperTabData[tabIndex].name);
  }

  return {
    handleNextClick
  };
}
