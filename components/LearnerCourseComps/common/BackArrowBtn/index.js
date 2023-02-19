import { ArrowLeft } from '@/common/ZicopsIcons';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './backArrowBtn.module.scss';

export default function BackArrowBtn({ backRoute = '' }) {
  const router = useRouter();

  function handleClick() {
    if (!!backRoute) return router.push(backRoute);

    router.back();
  }

  return (
    <>
      <button type="button" className={`${styles.backBtn}`} onClick={handleClick}>
        <ArrowLeft color={styles.primary} />
      </button>
    </>
  );
}
BackArrowBtn.defaultProps = {
  backRoute: null
};

BackArrowBtn.propTypes = {
  backRoute: PropTypes.string
};
