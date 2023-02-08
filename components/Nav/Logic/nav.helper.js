export function truncateTo16(str) {
  return str.length > 16 ? str.substring(0, 13) + '...' : str;
}

export const AdminMenu = [
  { title: 'Users', link: '/admin/user/my-users' },
  { title: 'Course', link: '/admin/course/my-courses' },
  { title: 'Training', link: '/admin', isDisabled: true },
  { title: 'Exams', link: '/admin/exams/my-question-bank' },
  { title: 'Vendor', link: '/admin/vendor/manage-vendor', isDev: true },
  { title: 'Lab', link: '/admin', isDisabled: true },
  { title: 'Analytics', link: '/admin/analytics/course-dashboard', isDev: true },
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
