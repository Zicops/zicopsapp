import { useState } from 'react';
import PopUp from '../../common/PopUp';
import ViewDoc from '../../common/ViewDoc';
import styles from '../courseResourcesOpen.module.scss';

const CourseResourceLoop = ({ resource }) => {
  const [showDoc, setShowDoc] = useState(false);
  let resourceImage;
  switch (resource.type) {
    case 'LINK':
      resourceImage = '/images/URL-icon.png';
      break;
    case 'PDF':
      resourceImage = '/images/PDF-icon.png';
      break;
    case 'DOC':
      resourceImage = '/images/DOC-icon.png';
      break;
    case 'DOCX':
      resourceImage = '/images/DOCX-icon.png';
      break;
    case 'PPT':
      resourceImage = '/images/PPT-icon.png';
      break;
    case 'EXCEL':
      resourceImage = '/images/media-container.png';
      break;
  }

  return (
    <>
      <div className={`${styles.resource_loop}`}>
        <div className={`${styles.image_box}`}>
          <img src={`${resourceImage}`} alt="" />
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
