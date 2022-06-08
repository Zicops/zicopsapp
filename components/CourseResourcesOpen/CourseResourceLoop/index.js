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
            <button onClick={() => setShowDoc(true)}>view</button>
          </div>
        </div>
      </div>

      <PopUp
        isPopUpOpen={showDoc}
        title={resource.name}
        size="large"
        positionLeft="50%"
        isFooterVisible={false}
        closeBtn={{ handleClick: () => setShowDoc(false) }}>
        <ViewDoc url={resource.url} />
      </PopUp>
    </>
  );
};

export default CourseResourceLoop;
