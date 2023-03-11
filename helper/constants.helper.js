export const OPTION_LABEL = ['A', 'B', 'C', 'D'];
export const QUESTION_STATUS = ['Y', 'Q', 'N'];
export const USER_STATUS = { invite: 'Invited', activate: 'Active', disable: 'Disabled' };
export const USER_MAP_STATUS = { invite: '', activate: 'active', disable: 'disable' };

// userCourseMaps status (overall user course progress)
export const COURSE_MAP_STATUS = {
  assign: 'open',
  started: 'started',
  completed: 'completed',
  disable: 'disable'
};
export const USER_LSP_ROLE = { admin: 'admin', learner: 'learner', vendor: 'vendor' };
export const SYNC_DATA_IN_SECONDS = 15;
export const MAX_ATTEMPT_COUNT = 5;
export const THUMBNAIL_GAP = 25;
export const LEARNING_FOLDER_CAPACITY = 30;
export const GIBBERISH_VALUE_FOR_LOGIN_STATE = '32Xnwiqodh98bjkxqw';

//need to delete chorot later
export const ASSIGNED_COURSES = ['cohort', 'admin', 'chorot'];

export const PUBLIC_PATHS = [
  '/login',
  '/auth-verify',
  '/home',
  '/reset-password',
  '/forgot-password',
  '/info/about-us',
  '/info/collaborate',
  '/info/contact-us',
  '/info/tour',
  '/info/careers',
  '/create-learning-space',
  '/create-learning-space/org-register',
  '/create-learning-space/org-register-form',
  '/create-learning-space/org-unit-form',
  '/homepage',
  '/static'
];
export const HIDE_HEADER_FOOTER_FOR_ROUTE = [
  '/home',
  '/auth-verify',
  '/exam-live',
  '/exam-screen',
  '/course/[courseId]/topic/[topicId]/exam/[examId]',
  '/login',
  '/test',
  '/reset-password',
  '/account-setup',
  '/forgot-password',
  '/info/about-us',
  '/info/collaborate',
  '/info/contact-us',
  '/info/tour',
  '/info/careers',
  '/account-select',
  '/create-learning-space',
  '/create-learning-space/org-register',
  '/create-learning-space/org-register-form',
  '/create-learning-space/org-unit-form',
  '/homepage',
  '/static',
  '/learning-spaces'
];

export const COURSE_PROGRESS_STATUS = ['not-started', 'in-progress', 'completed'];

// Default LSP is staging.zicops.com for demo and staging domains
export const LEARNING_SPACE_ID = '8ca0d540-aebc-5cb9-b7e0-a2f400b0e0c1';
// export const LEARNING_SPACE_ID = '93f3693c-d111-51aa-86ca-b883c6dfe647';
// Default LSP is zicops.com for zicops.com production domains
// export const LEARNING_SPACE_ID = '98640aaa-a1e8-5584-bc14-2b1bfed7d65a';

export const CUSTOM_ERROR_MESSAGE = {
  emailError: 'EMAIL_EXISTS',
  phoneError: 'PHONE_NUMBER_EXISTS',
  nothingToUpdate: 'nothing to update',
  shortNumber: 'INVALID_PHONE_NUMBER : TOO_SHORT'
};

export const COURSE_TYPES = ['self-paced', 'classroom', 'labs', 'test-series'];

export const LANGUAGES = ['English', 'Hindi', 'Arabic'];
export const SUBTITLE_LANGUAGES = [
  'English',
  'Arabic',
  'Hindi',
  'Marathi',
  'Telugu',
  'Kannada',
  'Tamil',
  'Malayalam',
  'Bengali',
  'Gujarati'
];

export const TOOLTIP_IMG_SRC = '/images/svg/error_outline_dark.svg';
export const VIDEO_FILE_TYPES = '.mp4, .mkv';
export const IMAGE_FILE_TYPES = '.jpg, .jpeg, .png, .svg, .gif';
export const MIN_COURSE_LENGTH = 25;
export const PROFILE_IMAGE_TYPE = '.jpg, .jpeg, .png, .svg';

export const DEFAULT_VALUES = {
  image: 'default-image.jpg',
  tileImage: 'default-image.jpg',
  previewVideo: 'default-video.mp4'
};

// Default LSP is staging.zicops.com for demo and staging domains
export const COMMON_LSPS = {
  zicops: '8ca0d540-aebc-5cb9-b7e0-a2f400b0e0c1'
  // zicops: '93f3693c-d111-51aa-86ca-b883c6dfe647'
};

export const COURSE_STATUS = {
  draft: 'DRAFT',
  upload: 'UPLOADING',
  update: 'UPDATING',

  save: 'SAVED',
  freeze: 'FREEZED',
  publish: 'PUBLISHED',
  reject: 'REJECTED',
  approvalPending: 'APPROVAL_PENDING',
  hold: 'ON_HOLD'
};

export const COURSE_TOPIC_STATUS = {
  assign: 'non-started',
  started: 'in-progress',
  completed: 'completed'
};

export const COURSE_EXPERTISES = ['Beginner', 'Competent', 'Proficient'];

//need to delete later
export const PRODUCT_TOUR_PATHS = ['exams'];

export const NOTIFICATION_TITLES = {
  cohortAssign: 'Cohort-Mapped',
  cohortUnassign: 'Cohort-Unmapped',
  courseAssign: 'Course-Assigned',
  courseUnssigned: 'Course-Unassigned',
  lspWelcome: 'Welcome-Lsp',
  signIn: { course: 'Course-signInAssign' }
};

export const NOTIFICATION_MSG_LINKS = {
  firstSigin: {
    addCourses: {
      msg: 'Get started by adding courses to your learning folder',
      link: '/self-landing'
    },
    coursesAssigned: {
      msg: 'You have courses assigned to you by your admin. Lets check them out',
      link: 'my-profile?tabName=Courses'
    },
    cohortAssigned: {
      msg: 'You are mapped to cohorts. Learn together in cohorts. Lets check them out',
      link: 'my-profile?tabName=Cohort'
    }
  }
};

export const COURSE_SELF_ASSIGN_LIMIT = 30;
// https://stackoverflow.com/a/49490014/13419786
export const ONE_MB_IN_BYTES = 1_048_576;
export const LIMITS = {
  previewVideoSize: ONE_MB_IN_BYTES * 50,
  topicVideoSize: ONE_MB_IN_BYTES * 500,
  questionOptionSize: ONE_MB_IN_BYTES * 250
};

export const EMAIL_TEMPLATE_IDS = {
  courseAssignMandatory: 'd-bf691d7c93794afca36c326cd032ccbf',
  courseAssignNotMandatory: 'd-2f834ed850ba43aab5e55e622f0725c1',
  courseUnassign: 'd-1d43080c8386430ca24d5050130d5c69',
  cohortAssign: 'd-1c44165b36034b839d9b7e7a1035f19b',
  cohortUnassign: 'd-3801f540f2a948729db6019981ace2c2',
  cohortManagerAssign: 'd-c9382610d3bb46f28291bca9f5d97cd4',
  cohortManagerUnassign: 'd-8b97231c38a44b6facb05172f39cc714'
};

export const COURSE_TOPIC_TYPES = {
  content: 'Content',
  assessment: 'Assessment',
  lab: 'Lab',
  classroom: 'Classroom'
};

export const ORG_DOMAINS = [
  'https://demo.zicops.com',
  'https://zicops.com'
  // 'https://myspace.zicops.com'
];

//Vendor Constant Start

export const VENDOR_LANGUAGES = [
  'English',
  'Arabic',
  'Hindi',
  'Marathi',
  'Telugu',
  'Kannada',
  'Tamil',
  'Malayalam',
  'Bengali',
  'Gujarati'
];

export const VENDOR_FILE_FORMATS = ['PPT', 'PDF', 'Consultancy'];

export const VENDOR_MASTER_STATUS = {
  active: 'active',
  draft: 'draft',
  disable: 'disable'
};

//Vendor Constant End

// GENERIC CONSTANTS
export const USER_ROLES_WITH_ADMIN_ACCESS = ['admin', 'vendor'];
