import SearchBody from '../components/SearchBody';
import SearchBookmarks from '../components/SearchBookmarks';
import SearchHeader from '../components/SearchHeader';

const Search = () => {

  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        paddingTop: '70px',
        minHeight: '90vh'
      }}>
      <SearchHeader />
      <SearchBody />
      <SearchBookmarks />
      <SearchBody />
    </div>
  );
};

export default Search;
