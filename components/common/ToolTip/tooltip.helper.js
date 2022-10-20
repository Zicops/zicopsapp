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
    viewBtn: 'View Bank and Add Questions',

    addQuestionBank: {
      cancelBtn: 'Close and go Back to Question Banks list',
      addBtnDisabled: 'Enter Question Bank details to Add',
      addBtnActive: 'Save details and proceed to Question creation',
      crossBtn: 'Close and Go Back to Question Banks list',
      category: (
        <>
          <b>Category:</b>
          <p>
            Category selection determines the Category under which this bank should appear in
            question bank listing
          </p>
        </>
      ),
      addSubCategory: (
        <>
          <b>Sub-Category:</b>
          <p>
            Sub-Category selection determines the Sub-Category under which this bank should appear
            in question bank listing
          </p>
        </>
      )
    },
    viewQuestionsDetails: {
      penEditIcon: 'Edit master details',
      addBtn: 'Add Questions',
      editBtn: 'Edit Question',
      viewBtn: 'View Question details',

      viewQuestions: {
        correctAnswer: 'Correct Answer',
        cancelBtn: 'Close and go back to Question list',
        editBtn: 'Edit Question',
        crossBtn: 'Close and go back to Question list',
        difficultyLevel: (
          <>
            <b>Difficulty Score:</b>
            <br />
            <span>
              Difficulty score defines Level of question. A question with difficulty score in range
              1-3 will be categorised as <b>Beginner level,</b> in range 4-7 as
              <b> Competent level,</b> and in range 8-10 as <b>Proficient level</b>
            </span>
          </>
        ),
        selectCheckbox: (
          <>
            <b>Option Checkbox:</b>
            <p>
              Check multiple boxes in case of multiple right options for a question and marks will
              be accordingly divided among the options
            </p>
          </>
        )
      },

      questionMasterTab: {
        createQuestion: 'Create and Add Questions to Bank',
        uploadQuestion: 'Bulk Upload Questions',
        uploadQuestionInfo: (
          <ul>
            Use Upload feature to:
            <li>- Upload MCQ questions with details in bulk in one go</li>
            <li>- Upload questions and options in text format only</li>
            <b>Note: </b>No media file upload allowed for questions or options in bulk upload
          </ul>
        ),
        cancelBtn: 'Close and go back to Questions list',
        saveBtn: 'Save all the Questions to bank',
        // status

        uploadQuestionScreen: {
          downloadBtn: 'Click here to Download Template',
          browseBtn: 'Click here to Upload File',
          previewBtnUploaded: 'Click here to Preview Uploaded File',
          previewBtnEmpty: 'Upload File to Preview',
          removeBtnUploaded: 'Click here to Remove Uploaded File',
          removeBtnEmpty: 'No File Uploaded',
          cancelBtn: 'Cancel and go back to Questions list',
          saveBtn: 'Save Uploaded Questions',
          uploadFile: 'Upload file',
          accordionOpen: 'Expand to view details',
          accordionClose: 'Collapse',
          editModeBtn: 'Open in edit mode to make changes'
        }
      }
    }
  },

  myQuestionPapers: {
    addBtn: 'Create new Question Paper',
    editBtn: 'Edit Question Paper and Add Questions',
    viewBtn: 'Preview Question Paper',
    createExamBtn: 'Create Scheduled or Open to take anytime exam using this question paper',

    addQuestionPapers: {
      questionPaperMasterTab: {
        cancelBtn: '',
        saveBtn: '',
        sectionWise: (
          <>
            <b>Question Paper - Section wise:</b>
            <ul>
              <li>- If checked then question paper will have sections</li>
              <li>- If not checked then question paper will not have sections</li>
            </ul>
          </>
        ),
        //status
        category: (
          <>
            <b>Category:</b>
            <p>
              Category selection determines the Category under which this paper should appear in
              question paper listing
            </p>
          </>
        ),
        addSubCategory: (
          <>
            <b>Sub-Category:</b>
            <p>
              Sub-Category selection determines the Sub-Category under which this paper should
              appear in question paper listing
            </p>
          </>
        ),
        nextBtn: 'Save Master details and proceed to question addition',
        difficultyLevel: (
          <>
            <b>Difficulty Level - Beginner/Competent/Proficient</b>
            <p>
              Level selection defines the criteria under which this paper should be displayed in
              question paper listing
            </p>
          </>
        ),
        suggestedDuration: (
          <>
            <b>Suggested Duration:</b>
            <p>
              Defines a tentative duration in which exan should be attempted. This value will be
              auto-populated on exam creation screen where it can be modified as required for
              respective exam
            </p>
          </>
        )
      },
      questionsTab: {
        addQuestionBtn: 'Create and add new question',
        addSectionBtn: 'Create and add new section',
        cancelBtn: 'Cancel and go back to question paper list',
        updateBtn: 'Save new changes to this question paper',
        addSection: {
          addQuestionBtn: 'Add Questions to this sections'
        }
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
    addBtn: 'Create new Exam',
    viewBtn: '',
    editBtn: 'View and Manage Exam Configurations',
    myExamsPassingCriteria: (
      <ul>
        <li>If None, no passing criteria would be applicable for this exam.</li>
        <li>If marks, enter passing marks for this exam</li>
        <li>If percentage, enter passing percentage for this exam</li>
      </ul>
    )
  },

  sidebarData: {
    zicopsQuestionBanks: 'View readily available Zicops Question Banks',
    myQuestionBanks: 'Create and Manage your Question Banks',
    zicopsQuestionPapers: 'View readily available Zicops Question papers',
    myQuestionPapers: 'Create and Manage your Question Papers',
    zicopsExams: 'View readily available Zicops Exams',
    myExams: 'Create and Manage your Exams'
  }
};

export const ADMIN_COURSES = {
  zicopsCourses: {
    addBtn: ''
  },
  myCourses: {
    addBtn: '',
    editBtn: '',
    courseMaster: {
      active: '',
      display: '',
      nextBtn: '',
      previewBtn: '',
      cancelBtn: '',
      updateBtn: ''
    },
    details: {
      dragNdrop: '',
      previewCourse: '',
      removeCourse: '',
      previewCourseImage: '',
      removeCourseImage: '',
      previewCoursePicture: '',
      removeCoursePicture: '',
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
    addBtn: ''
  },
  addSubCategories: {
    addBtn: ''
  },
  sidebarData: {
    zicopsCourses: '',
    myCourses: '',
    categories: '',
    addSubCategories: '',
    dashboard: ''
  }
};

export const ADMIN_USERS = {
  sidebarData: {
    myUsers: '',
    userCohort: ''
  },
  myUsers: {
    addBtn: '',
    viewBtn: '',
    editBtn: '',
    disableBtn: ''
  },
  userCohort: {
    addBtn: '',
    viewBtn: '',
    editBtn: '',
    downloadBtn: '',
    cohortMaster: {
      uploadBtn: '',
      previewBtn: '',
      removeBtn: '',
      cancelBtn: '',
      saveBtn: ''
    },
    users: {
      addUserToCohort: '',
      editBtn: ''
    }
  }
};

export const LEARNER_HOME = {
  viewAll: '',
  seeAll: ''
};

export const LEARNER_SELF_LANDING = {
  courseFolder: '',
  singleCard: '',
  calendarPreviousBtn: '',
  calendarNextBtn: ''
};

export const LEARNER_CLASSROOM = {
  bookNow: '',
  seeMore: ''
};

export const LEARNER_COURSES = {
  registerBtn: '',
  heartIcon: '',
  resources: '',
  playerBar: '',
  topicResources: '',
  topicNotes: '',
  notesAddBtn: '',
  videoPlayer: {
    playBtn: '',
    pauseBtn: '',
    nextVideoBtn: '',
    previousVideoBtn: '',
    forwardsBtn: '',
    backwardsBtn: '',
    replayBtn: '',
    soundBar: ''
  },
  videoTopbar: {
    backBtn: '',
    languageBtn: '',
    resourcesBtn: '',
    discussionBtn: '',
    bookmarksBtn: {
      view: '',
      addBtn: '',
      timeStamp: ''
    },
    notesBtn: {
      view: '',
      addBtn: ''
    },
    quizBtn: ''
  }
};

export const LEARNER_LABS = {
  arrowKeyUp: '',
  arrowKeyDown: '',
  arrowKeyLeft: '',
  arrowKeyRight: '',
  enterBtnDisabled: '',
  enterBtnActive: '',
  roomReactJs: '',
  roomCpp: '',
  roomAngularJs: '',
  roomTailwind: '',
  roomGraphQL: '',
  roomNodeJs: '',
  roomTensorFlow: '',
  roomHtml: '',
  roomPython: '',
  roomPhp: '',
  pacMan: ''
};
