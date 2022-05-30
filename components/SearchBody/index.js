import Card from '../common/Card';
import styles from './searchBody.module.scss'
const SearchBody = () => {
    const data = [
      { id: 0, img: '/images/courses/workplace design.png' },
      { id: 1, img: '/images/courses/website_developer.png' },
      { id: 2, img: '/images/courses/scripting with python.png' },
      { id: 3, img: '/images/courses/sre and devops.png' },
      { id: 4, img: '/images/courses/47.png' },
      { id: 5, img: '/images/courses/46.png' },
      { id: 6, img: '/images/courses/14.png' },
      { id: 7, img: '/images/courses/49.png' },
      { id: 8, img: '/images/courses/45.png' },
      { id: 9, img: '/images/courses/6.png' },
      { id: 10, img: '/images/courses/5.png' },
      { id: 11, img: '/images/courses/4.png' },
      { id: 12, img: '/images/courses/3.png' },
      { id: 13, img: '/images/courses/2.png' },
      { id: 14, img: '/images/courses/1.png' },
      { id: 15, img: '/images/courses/4.png' },
      { id: 16, img: '/images/courses/3.png' },
      { id: 17, img: '/images/courses/2.png' }
      // { id: 18, img: '/images/courses/1.png' }
    ];
    return (
        <>
        <div className={`${styles.searchBodyTitle}`}>
        Search Results
        </div>
        <div className={`${styles.searchBody}`}>
          {data.map((dt) => (
            <Card key={dt.id} data={ dt }/>
          ))}
        </div>
      </>
    );
}
 
export default SearchBody;