import PropTypes from 'prop-types';
import ZicopsSkeleton from '../ZicopsSkeleton';
import styles from './keyValueWithColon.module.scss';

export default function KeyValueWithColon({ keyData, valueData, isLoading = false }) {
  const { text: key, textColor: keyColor } = keyData;
  const { text: value, textColor: valueColor, limit } = valueData;

  return (
    <>
      <p className={`${styles.keyValue}`}>
        <span style={{ color: keyColor }}>
          <span>{key}</span>
          <span className={`${styles.colon}`}>:</span>
        </span>

        <span className={`${styles.value}`} style={{ color: valueColor }}>
          {isLoading ? (
            <ZicopsSkeleton variant="rounded" height={20} width={200} />
          ) : (
            <>{Array.isArray(value) ? value?.join(', ') || 'N/A' : value || 'N/A'}</>
          )}
        </span>
      </p>
    </>
  );
}

const dataObj = {
  text: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  textColor: PropTypes.string,
  isBold: PropTypes.bool,
  limit: PropTypes.number,
};

KeyValueWithColon.defaultProps = {
  keyData: {},
  valueData: {},
};

KeyValueWithColon.propTypes = {
  keyData: PropTypes.shape(dataObj),
  valueData: PropTypes.shape(dataObj),
};
