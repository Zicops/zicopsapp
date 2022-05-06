export function truncateTo16(str) {
  return str.length > 16 ? str.substring(0, 13) + '...' : str;
}

export const AdminMenu = [
  {
    title: 'Users',
    link: '/'
  },
  {
    title: 'Course',
    link: '/admin/course/my-courses'
  },
  {
    title: 'Training',
    link: '/'
  },
  {
    title: 'Exams',
    link: '/admin/exams/my-question-bank'
  },
  {
    title: 'Vendor',
    link: '/'
  },
  {
    title: 'Lab',
    link: '/'
  },
  {
    title: 'Analytics',
    link: '/'
  },
  {
    title: 'Administration',
    link: '/'
  }
];

export const UserMenu = [
  {
    title: 'Self',
    link: '/self-landing'
  },
  {
    title: 'Classroom',
    link: '/'
  },
  {
    title: 'Events',
    link: '/'
  },
  {
    title: 'Labs',
    link: '/'
  },
  {
    title: 'Exams',
    link: '/exams'
  },
  {
    title: 'Community',
    link: '/courses'
  }
];
