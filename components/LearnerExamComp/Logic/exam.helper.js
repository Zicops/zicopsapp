import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';

export function getPassingMarks(passingCriteria, totalMarks) {
  const [criteria, type] = passingCriteria?.split('-');

  if (type === 'Marks') return +criteria || 0;
  return +totalMarks * (+criteria / 100) || 0;
}
export function getEndTime(learnerExamData) {
  let examEndDate = learnerExamData?.examData?.examEnd;

  if (!examEndDate) {
    const startDate = new Date(learnerExamData?.examData?.examStart);
    const { duration = 0, bufferTime = 0 } = learnerExamData?.examData;
    examEndDate = startDate.setMinutes(startDate.getMinutes() + duration + +bufferTime);
  }

  return examEndDate;
}

export function getIsExamAccessible(learnerExamData) {
  if (!learnerExamData) return false;
  if (learnerExamData?.examData?.scheduleType === SCHEDULE_TYPE[1]) return true;

  const isExamStarted = learnerExamData?.examData.examStart < Date.now();
  const examEndDate = getEndTime(learnerExamData);
  const isExamEnded = examEndDate < Date.now();

  return isExamStarted && !isExamEnded;
}
