import { arrayOf, element, shape, string } from 'prop-types';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { StatusAtom } from '../../../state/atoms/utils.atoms';
import Button from '../Button';
import styles from './tabContainer.module.scss';
// Add proptype for extra added props
export default function TabContainer({
  tabData,
  tab,
  setTab,
  footerObj = {},
  children,
  customStyles,
  customClass = null
}) {
  const {
    status,
    submitDisplay = 'Submit',
    disableSubmit = false,
    handleSubmit = function () {},
    cancelDisplay = 'Cancel',
    handleCancel = function () {},
    showFooter = true
  } = footerObj;

  const [tabStatus, setTabStatus] = useRecoilState(StatusAtom);

  // reset for new tab view
  useEffect(() => {
    setTabStatus(null);
  }, []);

  function showActiveTab(tab) {
    const index = tabData.findIndex((t) => {
      return t.name === tab;
    });

    if (index >= 0) return tabData[index].component;
    return tabData[0].component;
  }

  return (
    <>
      <nav className={`${styles.tabHeader}`}>
        <ul>
          {tabData.map((t) => (
            <li
              key={t.name}
              className={tab === t.name ? `${styles.tabli} ${styles.active}` : `${styles.tabli}`}
              onClick={() => setTab(t.name)}>
              {t.name}
            </li>
          ))}
        </ul>
      </nav>

      <section className={`${styles.tabSection} ${customClass}`} style={customStyles}>{showActiveTab(tab)}</section>

      {/* footer */}
      {showFooter && (
        <div className={`${styles.contentPanel}`}>
          <div className={`${styles.leftText}`}>
            <h3>Status: {status}</h3>
          </div>

          {children}

          <div className={`${styles.rightText}`}>
            <Button clickHandler={handleCancel} text={cancelDisplay} />
            <Button clickHandler={handleSubmit} isDisabled={disableSubmit} text={submitDisplay} />
          </div>
        </div>
      )}
    </>
  );
}

const tabObj = shape({
  name: string.isRequired,
  component: element.isRequired
});

TabContainer.propTypes = { tabData: arrayOf(tabObj), switchTab: string };
