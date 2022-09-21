export const TOOLTIP_STYLE = {
  height: '15px',
  margin: '0px 5px'
};

// export const TOOLTIP_CONTENT = [
//   {
//     admin: {
//       home: {
//         analytics: 'go to analytics',
//         userManagement: 'go to user management',
//         courseManagement: 'go to course management',
//         trainingManagement: 'go to training management',
//         courseManagement: 'go to course management',
//         examsManagement: 'go to exams management',
//         vendorManagement: 'go to vendor management',
//         labManagement: 'go to lab management'
//       },
//       user: {
//         sidebar: {
//           myUsers: '',
//           userCohort: '',
//           userCohrtTable: {
//             editButton: '',
//             viewButton: '',
//             downloadButton: ''
//           }
//         }
//       },
//       course: {
//         // sidebar: [
//         //   { tooltipInfo: 'view zicops courses' },
//         //   { tooltipInfo: 'view my courses' },
//         //   { tooltipInfo: 'view all categories' },
//         //   { tooltipInfo: 'view all sub-categories' },
//         //   { tooltipInfo: 'view dashboard' }
//         // ],
//         myCoursesTable: {
//           editButton: 'edit my courses'
//         }
//       }
//     }
//   }
// ];

export const ADMIN_EXAMS = {
  myExams: {
    myExamsPassingCriteria: (
      <ul>
        <li>If None, no passing criteria would be applicable for this exam.</li>
        <li>If marks, enter passing marks for this exam</li>
        <li>If percentage, enter passing percentage for this exam</li>
      </ul>
    )
  },
  sidebarData: {
    zicopsQuestionBanks: 'View Zicops Question Banks',
    myQuestionBanks: 'View and Create your Question Banks',
    zicopsQuestionPapers: 'View Zicops Question Papers',
    myQuestionPapers: 'View and Create your Question Papers',
    zicopsExams: 'View Zicops Exams',
    myExams: 'View and Create your Exams'
  }
};

export const ADMIN_COURSES = {
  zicopsCourses: {
    addBtn: 'Add Zicops Courses'
  },
  myCourses: {
    addBtn: 'Add My Courses',
    editBtn: 'Edit Courses'
  },
  categories: {
    addBtn: 'Add Categories'
  },
  addSubCategories: {
    addBtn: 'Add Sub Categories'
  },
  sidebarData: {
    zicopsCourses: 'view zicops courses',
    myCourses: 'view all my courses',
    categories: 'view all categories',
    addSubCategories: 'view all sub-categories',
    dashboard: 'view dashboard'
  }
};

export const ADMIN_USERS = {
  sidebarData: {
    myUsers: 'View all your users',
    userCohort: 'View user cohorts'
  },
  myUsers: {
    addBtn: 'Add Users'
  },
  userCohort: {
    addBtn: 'Add User Cohorts',
    viewBtn: 'View Cohort',
    editBtn: 'Edit Cohort',
    downloadBtn: 'Download Cohort'
  }
};
export const LEARNER_CLASSROOM = {
  bookNow: 'Book courses now',
  seeMore: 'See More Courses'
};
