import { atom, selector } from 'recoil';

export const SiteMapAtom = atom({
  key: 'SiteMap',
  default: [
    '/',
    '/self-landing',
    '/exams',
    '/admin/course',
    '/admin/course/categories',
    '/admin/course/subcategories',
    '/admin/courses',
    '/admin/exams/my-exams',
    '/admin/exams/my-exams/add'
  ]
});

export const SiteMapSelector = selector({
  key: 'SiteMapSelector',
  get: ({ get, s }, ss) => {
    const siteMap = get(SiteMapAtom);
    console.log(siteMap, get, s, ss);
  }
});
