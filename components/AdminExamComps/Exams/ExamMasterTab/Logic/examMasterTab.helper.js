import { atom, selector } from 'recoil';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import Configuration from '../Configuration';
import ExamMaster from '../ExamMaster';
import Schedule from '../Schedule';

export const SCHEDULE_TYPE = ['scheduled', 'anytime'];

export const ExamMasterTabDataSelector = selector({
  key: 'ExamMasterTabData',
  get: ({ get }) => {
    const isScheduledExam = get(ExamTabDataAtom).schedule_type;

    if (isScheduledExam === SCHEDULE_TYPE[0]) return getTabData();

    return getTabData().filter((data) => data.name !== 'Schedule');
  }
});

export const ExamMasterTabAtom = atom({
  key: 'ExamMasterTab',
  default: getTabData()[0].name
});

export function getTabData() {
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
