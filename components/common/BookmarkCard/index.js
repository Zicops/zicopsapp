import styles from './bookmarkCard.module.scss';

export default function BookmarkCard({ data = {}, styleClass }) {
  const gotoPage = () => {
    alert('go go go!');
  };

  console.log(data);
  return (
    <>
      <div className={`${styles.bookmarksCard} ${styleClass}`} onClick={gotoPage}>
        <div className={`${styles.bookmarkOverlay}`}>
          <div className={`${styles.banner}`}>Bookmarks</div>
          <div className={`${styles.imageTimeText}`}>
            <div className={`${styles.bookmarkImage}`}>
              <img src={data?.img || '/images/dnd1.jpg'} alt="" />
            </div>
            <div className={`${styles.bookmarkText}`}>
              <div className={`${styles.bookmarkTime}`}>
                {data?.timestamp || '00:00'} <span>{data?.courseName || 'Course Name'} </span>
              </div>
              <p>{data?.title || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}</p>
            </div>
          </div>
        </div>
        {/* <img src="/images/dnd1.jpg" alt="" /> */}
      </div>
    </>
  );
}
