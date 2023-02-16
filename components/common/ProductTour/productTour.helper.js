import { atom } from 'recoil';

export const adminPageData = [
  {
    id: 0,
    title: 'Courses',
    info: 'View and Manage Courses for Learning Space',
    link: '/admin/courses'
  },
  {
    id: 1,
    title: 'Assessments',
    info: 'View and Manage Question Banks, Papers and Exams',
    link: '/admin/exams/my-question-bank'
  },
  {
    id: 2,
    title: 'Users',
    info: 'Invite, Assign and Manage Users and Cohorts',
    link: '/admin/user'
  },
  {
    id: 3,
    title: 'Dashboards',
    info: 'View and define your Dashboard components',
    link: '/admin'
  },
  {
    id: 4,
    title: 'Labs',
    info: 'View and Manage Labs for Learning Space',
    link: '/labs'
  },
  {
    id: 5,
    title: 'Trainings',
    info: 'Manage Trainer Repository, Schedules and Trainings',
    link: ''
  },
  {
    id: 6,
    title: 'Exams',
    info: '',
    link: '/exam'
  }
];

export const PROD_TOUR_ADMIN_EXAMS = {
  myExamBanks: [
    {
      id: 0,
      btnName: 'Crate Question Bank',
      title:
        'Create new question bank under any category and start add question to use later in question papers and exam.'
    },
    {
      id: 1,
      btnName: 'View And Manage Your Question Banks',
      title:
        'Create new question bank under any category and start add question to use later in question papers and exam.',
      nextPageRoute: 'admin/my-question-papers'
    },
    {
      id: 3,
      btnName: 'Crate New Question Bank',
      title:
        'Create new question bank under any category and start add question to use later in question papers and exam.',
      nextPageRoute: 'admin/my-question-papers'
    },
    {
      id: 4,
      btnName: 'Crate New new Question Bank',
      title:
        'Create new question bank under any category and start add question to use later in question papers and exam.',
      nextPageRoute: 'admin/my-question-papers'
    },
    {
      id: 5,
      route: '/admin/exams/my-exams',
      btnName: 'Manage Your Exams',
      title:
        'Configure duration, passing criteria and attempt specifications from here and tranck all your exams'
    }
  ],
  myCourses: [
    {
      id: 0,
      btnName: 'Create Courses',
      title: 'Create new Courses under any category and start add courses to your learning spaces.'
    },
    {
      id: 1,
      btnName: 'View And Manage Your Courses',
      title: 'Create new Courses under any category and start add courses to your learning spaces.'
    },
    {
      id: 3,
      btnName: 'Crate New Courses',
      title: 'Create new Courses under any category and start add courses to your learning spaces.',
      nextPageRoute: 'admin/my-question-papers'
    },
    {
      id: 4,
      btnName: 'Crate New new Courses',
      title: 'Create new Courses under any category and start add courses to your learning spaces.',
      nextPageRoute: 'admin/my-question-papers'
    },
    {
      id: 5,
      route: '/admin/exams/my-exams',
      btnName: 'Manage Your Exams',
      title:
        'Configure duration, passing criteria and attempt specifications from here and tranck all your exams'
    }
  ]
};
// export const MY_QUESTION_BANK = [
//   {
//     id:,

//   },{
//     id:2,
//   }
// ]
