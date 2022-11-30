export const OPTION_LABEL = ['A', 'B', 'C', 'D'];
export const QUESTION_STATUS = ['Y', 'Q', 'N'];
export const USER_STATUS = { invite: 'Invited', activate: 'Active', disable: 'Disabled' };
export const USER_MAP_STATUS = { invite: '', activate: 'active', disable: 'disable' };
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

// export const LEARNING_SPACE_ID = 'Zicops learning Spaces';
 export const LEARNING_SPACE_ID = 'd8685567-cdae-4ee0-a80e-c187848a760e';

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
