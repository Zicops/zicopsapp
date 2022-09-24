export const TOOLTIP_STYLE = {
  height: '15px',
  margin: '0px 5px'
};

export const ADMIN_HOME = {
  analytics: 'go to analytics',
  userManagement: 'go to user management',
  courseManagement: 'go to course management',
  trainingManagement: 'go to training management',
  administrationManagement: 'go to administration',
  examsManagement: 'go to exams management',
  vendorManagement: 'go to vendor management',
  labManagement: 'go to lab management'
};

export const ADMIN_EXAMS = {
  zicopsQuestionBanks: {
    addBtn: 'Create New Question Bank',
    viewBtn: 'View and Add Questions',

    questionsScreen: {
      addBtn: 'Add Questions',
      viewBtn: 'View Question Details',

      viewQuestions: {
        correctAnswer: 'Correct Answer',
        cancelBtn: 'Close and go back to Question list',
        editBtn: 'Edit Question',
        crossBtn: 'Close and go back to Question list'
      }
    }
  },

  myQuestionBanks: {
    addBtn: 'Create New Question Bank',
    editBtn: 'Edit Bank Master Details',
    viewBtn: 'View and Add Questions',

    addQuestionBank: {
      cancelBtn: 'Close and Go Back to Question Banks list',
      addBtnDisabled: 'Enter Question Bank details first',
      addBtnActive: 'Save details and proceed to Question Creation',
      crossBtn: 'Close and Go Back to Question Banks list',
      category:
        'Category selection determines the Category under which this bank should appear in question bank listing',
      addSubCategory:
        'Sub-Category selection determines the Sub-Category under which this bank should appear in question bank listing'
    },
    viewQuestionsDetails: {
      penEditIcon: 'Edit Bank Master Details',
      addBtn: 'Add Questions',
      editBtn: 'Edit Question',
      viewBtn: 'View Question Details',

      viewQuestions: {
        correctAnswer: 'Correct Answer',
        cancelBtn: 'Close and go back to Question list',
        editBtn: 'Edit Question',
        crossBtn: 'Close and go back to Question list'
      },

      questionMasterTab: {
        createQuestion: 'Create and Add Questions to Bank',
        uploadQuestion: 'Bulk Upload Questions',
        uploadQuestionInfo: (
          <ul>
            Use Upload feature to:
            <li>Upload MCQ questions with details in bulk in one go</li>
            <li>Upload questions and options in text format only</li>
            <b>Note: </b>No media file upload allowed for questions or options in bulk upload
          </ul>
        ),
        cancelBtn: 'Cancel and go back to Questions list',
        saveBtn: 'Add Questions to Save',
        // status

        uploadQuestionScreen: {
          downloadBtn: 'Click here to Download Template',
          browseBtn: 'Click here to Upload File',
          previewBtnUploaded: 'Click here to Preview Uploaded File',
          previewBtnEmpty: 'Upload File to Preview',
          removeBtnUploaded: 'Click here to Remove Uploaded File',
          removeBtnEmpty: 'No File Uploaded',
          cancelBtn: 'Cancel and go back to Questions list',
          saveBtn: 'Save Uploaded Questions'
        }
      }
    }
  },

  myQuestionPapers: {
    addBtn: 'Create new Question Paper',
    editBtn: 'Edit Paper',
    viewBtn: 'View Paper',
    createExamBtn: 'Create exam',

    addQuestionPapers: {
      questionPaperMasterTab: {
        cancelBtn: '',
        saveBtn: '',
        sectionWise:
          "If checked then you'll be able to create sections in your question paper.If not checked, you’ll not be able to add any sections to your paper.",
        //status
        category: 'Select this category',
        addSubCategory: 'Select this sub-category'
      },
      questionsTab: {
        addQuestionBtn: 'Create and add new question',
        addSectionBtn: 'Create and add new section',
        cancelBtn: 'Cancel and go back to question paper list',
        updateBtn: 'Save new changes to this question paper'
      },
      addQuestionMetaData: {
        existingQuestionBank: 'Select questions from existing question bank',
        uploadNew: 'Create new question bank and then select questions for this paper',
        category: 'Select this category',
        addSubCategory: 'Select this sub-category',
        difficultyLevel: 'Select this difficulty level',
        marksPerQuestion: 'Enter marks to be associated with each selected question',
        noOfQuestions: 'Enter number of questions to be selected',
        manual: 'Select questions to be added',
        randomly: 'Allow system to select questions'
      }
    }
  },

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
    zicopsQuestionBanks: 'View readily available Question Banks',
    myQuestionBanks: 'View and Create your Question Banks',
    zicopsQuestionPapers: 'View readily available Question papers',
    myQuestionPapers: 'View and Create your Question Papers',
    zicopsExams: 'View readily available exams',
    myExams: 'View and Create your Exams'
  }
};

export const ADMIN_COURSES = {
  zicopsCourses: {
    addBtn: 'Add Zicops Courses'
  },
  myCourses: {
    addBtn: 'Add My Courses',
    editBtn: 'Edit Courses',
    courseMaster: {
      active: '',
      display: '',
      nextBtn: '',
      previewBtn: '',
      cancelBtn: '',
      updateBtn: ''
    },
    details: {
      dragNdrop: 'Drag and drop categories/sub-categories',
      previewCourse: 'Preview uploaded course',
      removeCourse: 'Remove uploaded course',
      previewCourseImage: 'Preview uploaded course display image',
      removeCourseImage: 'Remove uploaded course display image',
      previewCoursePicture: 'Preview uploaded course page display picture',
      removeCoursePicture: 'Remove uploaded course page display picture',
      nextBtn: '',
      previewBtn: '',
      cancelBtn: '',
      updateBtn: ''
    },
    about: {
      nextBtn: '',
      previewBtn: '',
      cancelBtn: '',
      updateBtn: ''
    },
    topics: {
      addModule: '',
      nextBtn: '',
      previewBtn: '',
      cancelBtn: '',
      updateBtn: ''
    },
    configuration: {
      qualityControlCheck: '',
      visibilityInLearningSpace: '',
      previewBtn: '',
      cancelBtn: '',
      updateBtn: ''
    }
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
    addBtn: 'Add Users',
    viewBtn: 'View user details',
    editBtn: 'Edit user details',
    disableBtn: 'Disable user'
  },
  userCohort: {
    addBtn: 'Add User Cohorts',
    viewBtn: 'View Cohort',
    editBtn: 'Edit Cohort',
    downloadBtn: 'Download Cohort',
    cohortMaster: {
      uploadBtn: 'Upload your recent photo',
      previewBtn: 'Preview image',
      removeBtn: 'Delete and upload new image',
      cancelBtn: '',
      saveBtn: ''
    },
    users: {
      addUserToCohort: 'Add User to Cohort list',
      editBtn: 'Edit user details'
    }
  }
};

export const LEARNER_HOME = {
  viewAll: '',
  seeAll: ''
};

export const LEARNER_SELF_LANDING = {
  courseFolder: 'view your courses',
  singleCard: 'assign this course to yourself',
  calendarPreviousBtn: 'View previous month',
  calendarNextBtn: 'View next month'
};

export const LEARNER_CLASSROOM = {
  bookNow: 'Book your seat in this classroom',
  seeMore: 'view more classroom courses'
};

export const LEARNER_COURSES = {
  registerBtn: 'register your seat in this classroom',
  heartIcon: 'add to your favourite',
  resources: 'view resources of this topic',
  playerBar: 'your topic video',
  topicResources: 'view topic resources',
  topicNotes: 'view your topic notes and bookmarks',
  notesAddBtn: 'add new note',
  videoPlayer: {
    playBtn: 'play video',
    pauseBtn: 'pause video',
    nextVideoBtn: 'play next video',
    previousVideoBtn: 'play previous video',
    forwardsBtn: '',
    backwardsBtn: '',
    replayBtn: 'replay video again',
    soundBar: 'change volume levels'
  },
  videoTopbar: {
    backBtn: 'close video player',
    languageBtn: 'language and subtitles',
    resourcesBtn: 'topic resources',
    discussionBtn: 'discussions',
    bookmarksBtn: {
      view: 'view your bookmarks',
      addBtn: 'add bookmark',
      timeStamp: 'bookmark time stamp'
    },
    notesBtn: {
      view: 'view your notes',
      addBtn: 'add notes'
    },
    quizBtn: 'Quiz'
  }
};

export const LEARNER_LABS = {
  arrowKeyUp: 'move pacman up',
  arrowKeyDown: 'move pacman down',
  arrowKeyLeft: 'move pacman left',
  arrowKeyRight: 'move pacman right',
  enterBtnDisabled: 'move pacman to door of a room',
  enterBtnActive: 'enter in the lab',
  roomReactJs: 'go to React Js labs',
  roomCpp: 'go to C++ labs',
  roomAngularJs: 'go to Angular Js labs',
  roomTailwind: 'go to Tailwind CSS labs',
  roomGraphQL: 'go to GraphQL labs',
  roomNodeJs: 'go to Node Js labs',
  roomTensorFlow: 'go to TensorFlow labs',
  roomHtml: 'go to HTML labs',
  roomPython: 'go to Python labs',
  roomPhp: 'go to PHP labs',
  pacMan: 'Hello! I am pacman'
};
