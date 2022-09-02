import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';
import moment from 'moment';

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

// Data for Sample Test
const duration = 30;
const bufferTime = 15;

const startDate = moment().subtract('15', 'minutes').seconds(0);
const endDate = moment()
  .add(duration + bufferTime, 'minutes')
  .seconds(0);

// console.log(startDate.format(), endDate);

export const questionData = [
  {
    id: 1,
    question: {
      description: 'When the switch statement matches the expression with the given labels, how is the comparison done?'
    },
    options: [
      {
        id: '0',
        description: 'Both the datatype and the result of the expression are compared.',
        isCorrect: true
      },
      {
        id: '1',
        description: 'Only the datatype of the expression is compared.'
      },
      {
        id: '2',
        description: 'Only the value of the expression is compared.'
      },
      {
        id: '3',
        description: 'None of the above.'
      }
    ]
  },
  {
    id: 2,
    question: {
      description: 'What will be the output of the following code snippet?',
      attachment: '/images/ExamQuestions/question_2.png',
      attachmentType: 'image'
    },
    options: [
      {
        id: '0',
        description: 'Returns [1,2,3]',
        isCorrect: true
      },
      {
        id: '1',
        description: 'Returns [4,5]'
      },
      {
        id: '2',
        description: 'Returns [1,2,3,4]'
      },
      {
        id: '3',
        description: 'Returns [1,2,3,4,5]'
      }
    ]
  },
  {
    id: 3,
    question: {
      description: 'The final output for the shift() is',
      attachment: '/images/ExamQuestions/question_3.png',
      attachmentType: 'image'
    },
    options: [
      {
        id: '0',
        description: '1',
        isCorrect: true
      },
      {
        id: '1',
        description: '[4,5]'
      },
      {
        id: '2',
        description: '[3,4,5]'
      },
      {
        id: '3',
        description: 'Exception is thrown'
      }
    ]
  },
  {
    id: 4,
    question: {
      description: 'What will be the output of the following code snippet?',
      attachment: '/images/ExamQuestions/question_4.png',
      attachmentType: 'image'
    },
    options: [
      {
        id: '0',
        description: 'Sum of square of a and b',
        isCorrect: true
      },
      {
        id: '1',
        description: 'Square of sum of a and b'
      },
      {
        id: '2',
        description: 'Sum of a and b square'
      },
      {
        id: '3',
        description: 'None of the above'
      }
    ]
  },
  {
    id: 5,
    question: {
      description: 'What kind of scoping does JavaScript use?'
    },
    options: [
      {
        id: '0',
        description: 'Literal'
      },
      {
        id: '1',
        description: 'Lexical',
        isCorrect: true
      },
      {
        id: '2',
        description: 'Segmental'
      },
      {
        id: '3',
        description: 'Sequential'
      }
    ]
  },
  {
    id: 6,
    question: {
      description: 'What does the last statement return?',
      attachment: '/images/ExamQuestions/question_6.png',
      attachmentType: 'image'
    },
    options: [
      {
        id: '0',
        description: '9'
      },
      {
        id: '1',
        description: '10',
        isCorrect: true
      },
      {
        id: '2',
        description: '0'
      },
      {
        id: '3',
        description: '12'
      }
    ]
  },
  {
    id: 7,
    question: {
      description: 'What is the purpose of dynamic scoping?'
    },
    options: [
      {
        id: '0',
        description: 'Variables can be declared outside the scope',
        isCorrect: true
      },
      {
        id: '1',
        description: 'Variables must be declared outside the scope'
      },
      {
        id: '2',
        description: 'Variables cannot be declared outside the scope'
      },
      {
        id: '3',
        description: 'None of the above'
      }
    ]
  },
  {
    id: 8,
    question: {
      description: 'The reduce and reduceRight methods follow a common operation called'
    },
    options: [
      {
        id: '0',
        description: 'filter and fold'
      },
      {
        id: '1',
        description: 'inject and fold',
        isCorrect: true
      },
      {
        id: '2',
        description: 'finger and fold'
      },
      {
        id: '3',
        description: 'fold'
      }
    ]
  },
  {
    id: 9,
    question: {
      description: 'The method or operator used to identify the array is'
    },
    options: [
      {
        id: '0',
        description: 'isarrayType()'
      },
      {
        id: '1',
        description: '=='
      },
      {
        id: '2',
        description: '==='
      },
      {
        id: '3',
        description: 'typeof',
        isCorrect: true
      }
    ]
  },
  {
    id: 10,
    question: {
      description: 'What will be the output of following code snippet?',
      attachment: '/images/ExamQuestions/question_10.png',
      attachmentType: 'image'
    },
    options: [
      {
        id: '0',
        attachment: '/images/ExamQuestions/que10_a.png',
        attachmentType: 'image'
      },
      {
        id: '1',
        attachment: '/images/ExamQuestions/que10_b.png',
        attachmentType: 'image'
      },
      {
        id: '2',
        attachment: '/images/ExamQuestions/que10_c.png',
        attachmentType: 'image',
        isCorrect: true
      },
      {
        id: '3',
        attachment: '/images/ExamQuestions/que10_d.png',
        attachmentType: 'image'
      }
    ]
  },
  {
    id: 11,
    question: {
      description: 'What will be the output of following code snippet?',
      attachment: '/images/ExamQuestions/question_11.png',
      attachmentType: 'image'
    },
    options: [
      {
        id: '0',
        attachment: '/images/ExamQuestions/que11_a.png',
        attachmentType: 'image',
        isCorrect: true
      },
      {
        id: '1',
        attachment: '/images/ExamQuestions/que11_b.png',
        attachmentType: 'image'
      },
      {
        id: '2',
        attachment: '/images/ExamQuestions/que11_c.png',
        attachmentType: 'image'
      },
      {
        id: '3',
        description: 'None of the above'
      }
    ]
  },
  {
    id: 12,
    question: {
      description:
        'The process in which an object or data structure is translated into a format suitable for transferral over a network, or storage is called?'
    },
    options: [
      {
        id: '0',
        description: 'Object Serialization',
        isCorrect: true
      },
      {
        id: '1',
        description: 'Object Encapsulation'
      },
      {
        id: '2',
        description: 'Object Inheritance'
      },
      {
        id: '3',
        description: 'None of the above'
      }
    ]
  },
  {
    id: 13,
    question: {
      description: 'What will be the output of following code snippet?',
      image: '/images/ExamQuestions/question_13.png'
    },
    options: [
      {
        id: '0',
        description: '1'
      },
      {
        id: '1',
        description: '6',
        isCorrect: true
      },
      {
        id: '2',
        description: '2'
      },
      {
        id: '3',
        description: 'None of the above'
      }
    ]
  },
  {
    id: 14,
    question: {
      description: 'Answer the following question',
      attachment:'https://www.youtube.com/shorts/SEf79EwT8Sk',
      attachmentType:'video'
    },
    options: [
      {
        id: '0',
        description: 'true'
      },
      {
        id: '1',
        description: 'false',
        isCorrect: true
      },
      {
        id: '2',
        description: 'not defined',
      },
      {
        id: '3',
        description: 'None of the above'
      }
    ]
  },
  {
    id: 15,
    question: {
      description: 'How to stop an interval timer in Javascript.'
    },
    options: [
      {
        id: '0',
        description: 'clearInterval',
        isCorrect: true
      },
      {
        id: '1',
        description: 'clearTimer'
      },
      {
        id: '2',
        description: 'intervalOver'
      },
      {
        id: '3',
        description: 'None of the above'
      }
    ]
  }
];