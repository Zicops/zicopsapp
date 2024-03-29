import { USER_LSP_ROLE } from '@/helper/constants.helper';

export function truncateTo16(str) {
  return str.length > 16 ? str.substring(0, 13) + '...' : str;
}

export const AdminMenu = [
  { title: 'Users', link: '/admin/user/my-users' },
  {
    title: 'Course',
    link: '/admin/course/my-courses',
    roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
  },
  { title: 'Training', link: '/admin/training/trainers', isDemo: true },
  { title: 'Exams', link: '/admin/exams/my-question-bank' },
  {
    title: 'Vendor',
    link: '/admin/vendor/manage-vendor',
    roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor],
    isCustomRoute: true
  },
  { title: 'Lab', link: '/admin', isDisabled: true },
  { title: 'Analytics', link: '/admin/analytics/course-dashboard', isDemo: true },
  { title: 'Administration', link: '/admin/administration/organization' }
];

export const UserMenu = [
  { title: 'Self', link: '/self-landing' },
  { title: 'Classroom', link: '/classroom', isDemo: true },
  { title: 'Events', link: '/events', isDemo: true },
  { title: 'Labs', link: '/labs', isDemo: true },
  { title: 'Exams', link: '/exams' },
  { title: 'Community', link: '', isDisabled: true }
];
