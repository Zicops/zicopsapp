import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import {
  getSelectedResourcesDataObj,
  SelectedResourceDataAtom,
} from '../../atoms/learnerCourseComps.atom';
import { getImageBasedOnResourceType } from './Logic/resourceFile.helper';
import styles from './resourceFile.module.scss';

export default function ResourceFile({ type, title, resourceUrl = null }) {
  const [selectedResourceData, setSelectedResourceData] = useRecoilState(SelectedResourceDataAtom);

  return (
    <div
      className={`${styles.resourceFileMain}`}
      onClick={() =>
        setSelectedResourceData(getSelectedResourcesDataObj({ title, url: resourceUrl }))
      }>
      <div className={`${styles.resourceFileImage}`}>
        <img src={getImageBasedOnResourceType(type)} alt="" fill />
      </div>

      <div className={`${styles.resourceFileData}`}>
        <div className={`${styles.resourceFileDataTitle}`}>{title}</div>

        <div className={`${styles.resourceFileButton}`}>
          <button>{type === 'LINK' ? 'Visit' : 'View'}</button>
        </div>
      </div>
    </div>
  );
}

ResourceFile.PropTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  resourceUrl: PropTypes.string,
};

ResourceFile.defaultProps = {
  image: '',
  title: '',
  resourceUrl: '',
};
