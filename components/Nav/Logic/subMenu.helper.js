import { USER_LSP_ROLE } from '@/helper/constants.helper';
import styles from '../nav.module.scss';
export const languages = [
  {
    title: 'English',
    link: '/',
    customStyle: {
      backgroundColor: 'var(--primary)',
      color: 'var(--black)'
    },
    customClass: styles['selectedSubMenuItem']
  }
  // ,
  // {
  //   title: 'Marathi',
  //   link: '/'
  // },
  // {
  //   title: 'Punjabi',
  //   link: '/'
  // },
  // {
  //   title: 'Haryanavi',
  //   link: '/'
  // },
  // {
  //   title: 'Maithali',
  //   link: '/'
  // },
  // {
  //   title: 'Russian',
  //   link: '/'
  // }
];

export const support = [
  {
    title: 'Raise A Query',
    link: '/'
  },
  {
    title: ' Talk To Us',
    link: '/'
  },
  {
    title: 'Learning Manual',
    link: '/'
  }
];
export const preferences = [
  {
    title: 'Preference 1',
    link: '/'
  },
  {
    title: 'Preference 2',
    link: '/'
  },
  {
    title: 'Preference 3',
    link: '/'
  },
  {
    title: 'Preference 4',
    link: '/'
  }
];

export const userProfile = [
  {
    title: 'About',
    link: '/my-profile',
    roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
  },
  {
    title: 'Cohort',
    link: '/my-profile'
  },
  {
    title: 'Courses',
    link: '/my-profile'
  },
  {
    title: 'Dashboard',
    link: '/my-profile',
    isDemo: true
  },
  {
    title: 'Schedule',
    link: '/my-profile'
  }
];
