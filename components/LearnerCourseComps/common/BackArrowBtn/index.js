import { ArrowLeft } from '@/common/ZicopsIcons';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './backArrowBtn.module.scss';

export default function BackArrowBtn({ backRoute = '', handleClick = () => {} }) {
  const router = useRouter();

  function goBackOnClick() {
    if (!!backRoute) return router.push(backRoute);

    router.back();
  }

  return (
    <>
      <button
        type="button"
        className={`${styles.backBtn}`}
        onClick={!!handleClick ? handleClick : goBackOnClick}>
        <ArrowLeft color={styles.primary} />
      </button>
    </>
  );
}
BackArrowBtn.defaultProps = {
  backRoute: null,
};

BackArrowBtn.propTypes = {
  backRoute: PropTypes.string,
};
