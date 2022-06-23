import { useState } from 'react';
import PopUp from '../../common/PopUp';
import ViewDoc from '../../common/ViewDoc';
import styles from '../courseResourcesOpen.module.scss';

const CourseResourceLoop = ({ resource }) => {
  const [showDoc, setShowDoc] = useState(false);

  return (
    <>
      <div className={`${styles.resource_loop}`}>
        <div className={`${styles.image_box}`}>
          <img src="/images/pdfIcon.png" alt="" />
        </div>
        <div className={`${styles.data}`}>
          <div className={`${styles.data_title}`}>{resource.name}</div>
          <div className={`${styles.data_btn}`}>
            {resource.type === 'LINK' ? (
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                Visit Link
              </a>
            ) : (
              <button onClick={() => setShowDoc(true)}>view</button>
            )}
          </div>
        </div>
      </div>

      <PopUp
        title={resource.name}
        popUpState={[showDoc, setShowDoc]}
        size="large"
        positionLeft="50%"
        isFooterVisible={false}>
        <ViewDoc url={resource.url} />
      </PopUp>
    </>
  );
};

export default CourseResourceLoop;
