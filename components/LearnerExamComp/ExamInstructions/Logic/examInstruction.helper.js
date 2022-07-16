import moment from 'moment';

const duration = 30;
const bufferTime = 15;

const startDate = moment().subtract('15', 'minutes').seconds(0);
const endDate = moment()
  .add(duration + bufferTime, 'minutes')
  .seconds(0);

export const data = {
  examData: {
    name: 'Core Java Fundamentals',
    scheduleType: 'Scheduled',
    duration: duration,
    examStart: new Date(startDate),
    examEnd: new Date(endDate),
    noAttempts: '3',
    totalMarks: '100',
    passingCriteria: '60-Marks',
    bufferTime: bufferTime
  },
  landingPageData: {
    isProctoring: 'No',
    totalQuestions: '15',
    isNegativeMarking: ''
  },
  insPageData: {
    examTimeStandard: 'IST',
    attempts: '1'
  }
};
