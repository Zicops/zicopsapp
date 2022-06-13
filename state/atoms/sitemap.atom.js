import { atom, selector } from 'recoil';

export const SiteMapAtom = atom({
  key: 'SiteMap',
  default: [
    { head: 'course', route: '/admin/course' },
    { head: 'course', route: '/admin/courses' },
    { head: 'course', route: '/admin/course/categories' },
    { head: 'course', route: '/admin/course/subcategories' },
    { head: 'course', route: '/admin/course/zicops-courses' },
    { head: 'exams', route: '/admin/exams/my-exams' },
    { head: 'exams', route: '/admin/exams/my-exams/add' },
    { head: 'exams', route: '/admin/exams/my-question-bank' },
    { head: 'exams', route: '/admin/exams/my-question-papers' },
    { head: 'exams', route: '/admin/exams/my-question-papers/add' },
    { head: 'exams', route: '/admin/exams/question-bank' },
    { head: 'exams', route: '/admin/exams/zicops-exam' },
    { head: 'exams', route: '/admin/exams/zicops-question-bank' },
    { head: 'exams', route: '/admin/exams/zicops-question-papers' },
    { head: 'user', route: '/admin/user' }
  ]
});

export const getSiteMapForView = selector({
  key: 'getSiteMapForView',
  get: ({ get }) => {
    const sitemap = get(SiteMapAtom);
    const sitemapForView = {};

    sitemap.forEach((item) => {
      if (!sitemapForView[item.head]) sitemapForView[item.head] = [];

      sitemapForView[item.head].push(item.route);
    });

    return sitemapForView;
  }
});
