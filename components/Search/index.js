import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useHandleSearch from './Logic/useHandleSearch';
import SearchBody from './SearchBody';
import SearchBookmarks from './SearchBookmarks';
import SearchHeader from './SearchHeader';
import SearchSubCat from './SearchSubCat';

export default function Search() {
  const { courses, lastItemRef, filters, setFilters, clearAllFilters } = useHandleSearch();
  const { catSubCat, setActiveCatId } = useHandleCatSubCat(filters.category);

  const router = useRouter();
  const searchQuery = router.query?.searchQuery || '';
  const [hideBookMark, setHideBookmark] = useState(false);

  useEffect(() => {
    // console.log(isPref);
    const { isPref, cat } = router.query;
    if (cat) setHideBookmark(true);

    if (!isPref) return;
    setHideBookmark(true);
    // setFilters(prevValue => ({...prevValue , subCategory:searchQuery}))
    return;
  }, [router.query]);

  console.log(catSubCat?.subCat);

  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        paddingTop: '70px',
        minHeight: '90vh'
      }}>
      <SearchHeader
        filters={filters}
        setFilters={setFilters}
        clearAllFilters={clearAllFilters}
        catSubCat={catSubCat}
        setActiveCatId={setActiveCatId}
      />
      {!hideBookMark ? (
        <SearchBookmarks />
      ) : (
        <SearchSubCat
          data={catSubCat?.subCat?.map((s) => ({
            ...s,
            name: s?.Name,
            img: s?.ImageUrl,
            handleClick: (subCat) => setFilters({ ...filters, subCategory: subCat })
          }))}
        />
      )}

      <SearchBody
        courses={courses?.filter((course) => {
          const nameFilter = course?.name
            ?.trim()
            ?.toLowerCase()
            ?.includes(searchQuery?.trim()?.toLowerCase());
          let langFilter = true,
            catFilter = true,
            subCatFilter = true,
            typeFilter = true;

          if (filters?.lang)
            langFilter = course?.language
              ?.map((lang) => lang?.toLowerCase()?.trim())
              ?.includes(filters?.lang?.trim()?.toLowerCase());
          if (filters?.category)
            catFilter = course?.category
              ?.trim()
              ?.toLowerCase()
              ?.includes(filters?.category?.trim()?.toLowerCase());
          if (filters?.subCategory)
            subCatFilter =
              course?.sub_categories?.findIndex((subCat) =>
                subCat?.name
                  ?.trim()
                  ?.toLowerCase()
                  ?.includes(filters?.subCategory?.trim()?.toLowerCase())
              ) > 0 ||
              course?.sub_category
                ?.trim()
                ?.toLowerCase()
                ?.includes(filters?.subCategory?.trim()?.toLowerCase());
          if (filters?.type)
            typeFilter = course?.type
              ?.trim()
              ?.toLowerCase()
              ?.includes(filters?.type?.trim()?.toLowerCase());

          return nameFilter && langFilter && catFilter && subCatFilter && typeFilter;
        })}
        lastItemRef={lastItemRef}
      />
    </div>
  );
}
