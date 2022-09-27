import { atom, selector } from 'recoil';

export const SiteMapAtom = atom({
  key: 'SiteMap',
  default: [
    { head: 'course', displayName: 'My Courses', route: '/admin/course/my-courses' },
    { head: 'course', displayName: 'Add Course', route: '/admin/courses' },
    { head: 'course', displayName: 'Categories', route: '/admin/course/categories' },
    { head: 'course', displayName: 'Sub Categories', route: '/admin/course/subcategories' },
    { head: 'course', displayName: 'Zicops Courses', route: '/admin/course/zicops-courses' },
    { head: 'exams', displayName: 'My Exams', route: '/admin/exams/my-exams' },
    { head: 'exams', displayName: 'Add Exam', route: '/admin/exams/my-exams/add' },
    { head: 'exams', displayName: 'My Question Bank', route: '/admin/exams/my-question-bank' },
    { head: 'exams', displayName: 'My Question Paper', route: '/admin/exams/my-question-papers' },
    {
      head: 'exams',
      displayName: 'Add Question Paper',
      route: '/admin/exams/my-question-papers/add'
    },
    { head: 'exams', displayName: 'My Question Bank', route: '/admin/exams/question-bank' },
    { head: 'exams', displayName: 'Zicops Exams', route: '/admin/exams/zicops-exam' },
    {
      head: 'exams',
      displayName: 'Zicops Question Bank',
      route: '/admin/exams/zicops-question-bank'
    },
    {
      head: 'exams',
      displayName: 'Zicops Question Papers',
      route: '/admin/exams/zicops-question-papers'
    },
    { head: 'user', displayName: 'My Users', route: '/admin/user/my-users' }
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
