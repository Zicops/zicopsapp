import { TOPIC_RESOURCE_TYPES } from '@/constants/course.constants';
import { useRecoilState } from 'recoil';
import { SelectedResourceDataAtom } from '../../atoms/learnerCourseComps.atom';
import { getImageBasedOnResourceType } from './Logic/resourceFile.helper';
import styles from './resourceFile.module.scss';

export default function ResourceFile({ type, name, resourceUrl = null }) {
  const [selectedResourceData, setSelectedResourceData] = useRecoilState(SelectedResourceDataAtom);

  const isLink = type === TOPIC_RESOURCE_TYPES.link;

  return (
    <div
      className={`${styles.resourceFileMain}`}
      onClick={() => {
        if (isLink) return;

        setSelectedResourceData({ name, url: resourceUrl, type });
      }}>
      <div className={`${styles.resourceFileImage}`}>
        <img src={getImageBasedOnResourceType(type)} alt="" fill />
      </div>

      <div className={`${styles.resourceFileData}`}>
        <div className={`${styles.resourceFileDataTitle}`}>{name}</div>

        <div className={`${styles.resourceFileButton}`}>
          {isLink ? (
            <a href={resourceUrl} target="_blank">
              {name}
            </a>
          ) : (
            <button>{type === 'LINK' ? 'Visit' : 'View'}</button>
          )}
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
