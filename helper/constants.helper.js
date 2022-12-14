export const OPTION_LABEL = ['A', 'B', 'C', 'D'];
export const QUESTION_STATUS = ['Y', 'Q', 'N'];
export const USER_STATUS = { invite: 'Invited', activate: 'Active', disable: 'Disabled' };
export const USER_MAP_STATUS = { invite: '', activate: 'active', disable: 'disable' };
export const USER_LSP_ROLE = { admin: 'admin', learner: 'learner' };
export const SYNC_DATA_IN_SECONDS = 15;
export const MAX_ATTEMPT_COUNT = 5;
export const THUMBNAIL_GAP = 25;
export const LEARNING_FOLDER_CAPACITY = 30;
export const GIBBERISH_VALUE_FOR_LOGIN_STATE = '32Xnwiqodh98bjkxqw';

//need to delete chorot later
export const ASSIGNED_COURSES = ['cohort', 'admin', 'chorot'];

export const PUBLIC_PATHS = [
  '/login',
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
export const LEARNING_SPACE_ID = '93f3693c-d111-51aa-86ca-b883c6dfe647';
// Default LSP is zicops.com for zicops.com production domains
// export const LEARNING_SPACE_ID = '98640aaa-a1e8-5584-bc14-2b1bfed7d65a';

export const CUSTOM_ERROR_MESSAGE = {
  emailError: 'EMAIL_EXISTS',
  phoneError: 'PHONE_NUMBER_EXISTS',
  nothingToUpdate: 'nothing to update'
};

export const COURSE_TYPES = ['self-paced', 'classroom', 'labs', 'test-series'];

export const LANGUAGES = ['English', 'Hindi', 'Arabic'];

export const TOOLTIP_IMG_SRC = '/images/svg/error_outline_dark.svg';
export const VIDEO_FILE_TYPES = '.mp4, .mkv';
export const IMAGE_FILE_TYPES = '.jpg, .jpeg, .png, .svg, .gif';
export const MIN_COURSE_LENGTH = 25;

export const DEFAULT_VALUES = {
  image: 'default-image.jpg',
  tileImage: 'default-image.jpg',
  previewVideo: 'default-video.mp4'
};

// ztlp pune lsp
export const COMMON_LSPS = {
  zicops: '6bc01264-07c2-518e-9b1e-a6fd54249132'
};

export const COURSE_STATUS = {
  draft: 'DRAFT',
  upload: 'UPLOADING',
  update: 'UPDATING',
  save: 'SAVED',
  freeze: 'FREEZED',
  publish: 'PUBLISHED',
  reject: 'REJECTED'
};

export const COURSE_TOPIC_STATUS = {
  assign: 'non-started',
  started: 'in-progress',
  completed: 'completed'
};

//need to delete later
export const PRODUCT_TOUR_PATHS = ['exams'];
