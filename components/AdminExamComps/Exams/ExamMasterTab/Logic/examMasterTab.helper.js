import { atom, selector } from 'recoil';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import Configuration from '../Configuration';
import ExamMaster from '../ExamMaster';
import Schedule from '../Schedule';

export const ExamMasterTabDataSelector = selector({
  key: 'ExamMasterTabData',
  get: ({ get }) => {
    const isScheduledExam = get(ExamTabDataAtom).schedule_type;

    if (isScheduledExam === 'scheduled') return getTabData();

    return getTabData().filter((data) => data.name !== 'Schedule');
  }
});

export const ExamMasterTabAtom = atom({
  key: 'ExamMasterTab',
  default: getTabData()[0].name
});

function getTabData() {
  return [
    {
      name: 'Exam Master',
      component: <ExamMaster />
    },
    {
      name: 'Schedule',
      component: <Schedule />
    },
    {
      name: 'Configuration',
      component: <Configuration />
    }
  ];
}
