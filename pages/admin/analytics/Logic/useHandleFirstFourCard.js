import { GET_BASIC_COURSES_STATS } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { CatSubCatAtom } from '@/state/atoms/global.atom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useHandleFirstFourCard() {
  const { catSubCat } = useHandleCatSubCat();

  const [categoryCard, setCategoryCard] = useState({
    id: 1,
    cardTitle: 'Categories',
    cardImage: '/images/svg/categories.svg',
    cardCount: null,
    cardText: 'Categories'
  });
  const [subCategoryCard, setSubCategoryCard] = useState({
    id: 2,
    cardTitle: 'Sub-categories',
    cardImage: '/images/svg/workspaces.svg',
    cardCount: null,
    cardText: 'Sub-categories'
  });
  const [myCourseCard, setMyCourseCard] = useState({
    id: 3,
    cardTitle: 'My Courses',
    cardImage: '/images/svg/local_library.svg',
    cardCount: null,
    cardText: ''
  });
  const [zicopsCard, setZicopsCard] = useState({
    id: 4,
    cardTitle: 'Zicops Courses',
    cardImage: '/images/svg/Logo.svg',
    cardCount: null,
    cardText: ''
  });
  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');
    // My Courses Count 
    loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
      input: {
        lsp_id: _lspId,
        course_status: 'PUBLISHED',
        course_type: 'self-paced',
        languages: ['English']
      }
    }).then((data) => {
      console.log(data);
    });
    setCategoryCard((previousData) => {
      const myCatCount = catSubCat?.cat;
      return { ...previousData, cardCount: myCatCount?.length };
    });
    setSubCategoryCard((previousData) => {
      const mySubCatCount = catSubCat?.subCat?.filter((subCat) => subCat?.LspId === _lspId)?.length;
      return { ...previousData, cardCount: mySubCatCount };
    });
  }, [catSubCat?.cat?.length, catSubCat?.subCat?.length]);
  console.log(catSubCat);

  //   const cardData = [
  //     {
  //       id: 1,
  //       cardTitle: 'Categories',
  //       cardImage: '/images/svg/categories.svg',
  //       cardCount: 13,
  //       cardText: 'Categories'
  //     },
  //     {
  //       id: 2,
  //       cardTitle: 'Sub-categories',
  //       cardImage: '/images/svg/workspaces.svg',
  //       cardCount: 36,
  //       cardText: 'Sub-categories'
  //     },
  //     {
  //       id: 3,
  //       cardTitle: 'My Courses',
  //       cardImage: '/images/svg/local_library.svg',
  //       cardCount: 38,
  //       cardText: '18 assigned courses'
  //     },
  //     {
  //       id: 4,
  //       cardTitle: 'Zicops Courses',
  //       cardImage: '/images/svg/Logo.svg',
  //       cardCount: 56,
  //       cardText: '32 assigned courses'
  //     }
  //   ];
  return [categoryCard, subCategoryCard, myCourseCard, zicopsCard];
}
