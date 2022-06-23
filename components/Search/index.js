import useHandleSearch from './Logic/useHandleSearch';
import SearchBody from './SearchBody';
import SearchBookmarks from './SearchBookmarks';
import SearchHeader from './SearchHeader';

export default function Search() {
  const { courses, lastItemRef, filters, setFilters, clearAllFilters } = useHandleSearch();

  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        paddingTop: '70px',
        minHeight: '90vh'
      }}>
      <SearchHeader filters={filters} setFilters={setFilters} clearAllFilters={clearAllFilters} />
      <SearchBookmarks />
      <SearchBody courses={courses} lastItemRef={lastItemRef} />
    </div>
  );
}
