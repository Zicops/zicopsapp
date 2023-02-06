import { atom, selector } from 'recoil';

export const SiteMapAtom = atom({
  key: 'SiteMap',
  default: [
    { head: 'Course', displayName: 'Zicops Courses', route: '/admin/course/zicops-courses' },
    { head: 'Course', displayName: 'My Courses', route: '/admin/course/my-courses' },
    { head: 'Course', displayName: 'Add Course', route: '/admin/courses' },
    { head: 'Course', displayName: 'Categories', route: '/admin/course/categories' },
    { head: 'Course', displayName: 'Sub Categories', route: '/admin/course/subcategories' },
    {
      head: 'Exams',
      displayName: 'Zicops Question Bank',
      route: '/admin/exams/zicops-question-bank'
    },
    { head: 'Exams', displayName: 'My Question Bank', route: '/admin/exams/question-bank' },
    {
      head: 'Exams',
      displayName: 'Zicops Question Papers',
      route: '/admin/exams/zicops-question-papers'
    },
    { head: 'Exams', displayName: 'My Question Paper', route: '/admin/exams/my-question-papers' },
    {
      head: 'Exams',
      displayName: 'Add Question Paper',
      route: '/admin/exams/my-question-papers/add'
    },
    { head: 'Exams', displayName: 'Zicops Exams', route: '/admin/exams/zicops-exam' },
    { head: 'Exams', displayName: 'My Exams', route: '/admin/exams/my-exams' },
    { head: 'Exams', displayName: 'Add Exam', route: '/admin/exams/my-exams/add' },
    { head: 'User', displayName: 'My Users', route: '/admin/user/my-users' },
    { head: 'User', displayName: 'Invite User', route: '/admin/user/my-users/invite' },
    { head: 'User', displayName: 'User Cohort', route: '/admin/user/user-cohort' },
    { head: 'User', displayName: 'Add Cohort', route: '/admin/user/user-cohort/add-cohort' },
    {
      head: 'Administration',
      displayName: 'My Organization',
      route: '/admin/administration/organization'
    },
    {
      head: 'Administration',
      displayName: 'My Learning Space',
      route: '/admin/administration/my-learning-space'
    }
  ]
});

export const getSiteMapForView = selector({
  key: 'getSiteMapForView',
  get: ({ get }) => {
    const sitemap = get(SiteMapAtom);
    const sitemapForView = {};

    sitemap.forEach((item) => {
      if (!sitemapForView[item.head]) sitemapForView[item.head] = [];

      sitemapForView[item.head].push(item);
    });

    return sitemapForView;
  }
});
