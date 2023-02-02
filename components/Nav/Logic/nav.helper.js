export function truncateTo16(str) {
  return str.length > 16 ? str.substring(0, 13) + '...' : str;
}

export const AdminMenu = [
  { title: 'Users', link: '/admin/user/my-users' },
  { title: 'Course', link: '/admin/course/my-courses' },
  { title: 'Training', link: '/admin' },
  { title: 'Exams', link: '/admin/exams/my-question-bank' },
  { title: 'Vendor', link: '/admin' },
  { title: 'Lab', link: '/admin' },
  { title: 'Analytics', link: '/admin/analytics/course-dashboard' },
  { title: 'Administration', link: '/admin/administration/organization' }
];

export const UserMenu = [
  { title: 'Self', link: '/self-landing' },
  { title: 'Classroom', link: '/classroom', isDisabled: true },
  { title: 'Events', link: '/events', isDisabled: true },
  { title: 'Labs', link: '/labs', isDisabled: true },
  { title: 'Exams', link: '/exams' },
  { title: 'Community', link: '', isDisabled: true }
];
