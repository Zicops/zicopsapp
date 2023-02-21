import PropTypes from 'prop-types';
import { useRef } from 'react';
import styles from './zicopsTabs.module.scss';

export default function TabHeaderCenter({ activeTabData, tabData, handleClick }) {
  const tabHeaderRef = useRef();
  return (
    <>
      <ul className={`${styles.tabHeader}`} ref={tabHeaderRef}>
        {tabData.map((tab) => (
          <li
            onClick={() => {
              var headerOffset = 75;
              var elementPosition = tabHeaderRef.current.getBoundingClientRect().top;
              var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
              });
              handleClick(tab);
            }}
            className={`${activeTabData?.id === tab?.id ? styles.active : ''}`}
            key={tab?.id}>
            {tab?.title}
          </li>
        ))}
      </ul>
    </>
  );
}

TabHeaderCenter.defaultProps = {
  activeTabTitle: null,
  tabHeaderArr: [],
  handleClick: () => {},
};

const tabDataObj = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]),
  title: PropTypes.string,
  body: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]),
});

TabHeaderCenter.propTypes = {
  handleClick: PropTypes.func,
  activeTabData: tabDataObj,
  tabData: PropTypes.arrayOf(tabDataObj),
};
