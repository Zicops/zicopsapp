import { arrayOf, element, shape, string } from 'prop-types';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { StatusAtom } from '../../../state/atoms/utils.atoms';
import Button from '../Button';
import ToolTip from '../ToolTip';
import styles from './tabContainer.module.scss';
// Add proptype for extra added props
export default function TabContainer({
  tabData,
  tab,
  setTab,
  footerObj = {},
  children,
  customStyles,
  customClass = null,
  isDisabled = false
}) {
  const {
    status,
    submitDisplay = 'Submit',
    disableSubmit = false,
    handleSubmit = function () {},
    cancelDisplay = 'Cancel',
    handleCancel = function () {},
    showFooter = true,
    hideStatus = false,
    isActive = false,
    customActiveBtnStyles = { boxShadow: '0 0 10px 0 var(--primary)' }
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

  let saveButtonTitle = '';
  let cancelButtonTitle = '';
  let updateButtonTitle = '';
  if (tab === 'Question Master') {
    saveButtonTitle = 'Save all the questions to bank';
    cancelButtonTitle = 'Close and go back to Questions list';
  } else if (tab === 'Configuration') {
    updateButtonTitle = 'Save updated details';
    cancelButtonTitle = 'Cancel and go back to Exam list';
  } else if (tab === 'Questions') {
    updateButtonTitle = 'Save Changes to question paper';
    cancelButtonTitle = 'Close and go back to question paper list';
  }

  let tooltipStatus = '';
  if (status === 'SAVED') {
    tooltipStatus = 'Question paper details saved';
  } else if (status === 'DRAFT') {
    tooltipStatus = 'Question Paper not saved';
  } else if (status === 'FAILED') {
    tooltipStatus = 'Failed to save Question paper';
  } else if (status === 'UPDATING') {
    tooltipStatus = 'Updating Question paper';
  }

  return (
    <>
      <nav className={`${styles.tabHeader}`}>
        <ul>
          {tabData.map((t) => {
            if (t?.isHidden) return null;

            return (
              <li
                key={t.name}
                className={tab === t.name ? `${styles.tabli} ${styles.active}` : `${styles.tabli}`}
                onClick={() => {
                  if (isDisabled) return;
                  setTab(t.name);
                }}>
                {t.name}
              </li>
            );
          })}
        </ul>
      </nav>

      <section className={`${styles.tabSection} ${customClass}`} style={customStyles}>
        {showActiveTab(tab)}
      </section>

      {/* footer */}
      {showFooter && (
        <div className={`${styles.contentPanel}`}>
          <div className={`${styles.leftText}`}>
            {!hideStatus && (
              <ToolTip title={tooltipStatus} placement="top">
                <h3>Status: {status}</h3>
              </ToolTip>
            )}
          </div>

          {children}

          <div className={`${styles.rightText}`}>
            <ToolTip title={cancelButtonTitle} placement="left">
              <span>
                <Button clickHandler={handleCancel} text={cancelDisplay} />
              </span>
            </ToolTip>
            <ToolTip
              title={submitDisplay === 'Update' ? updateButtonTitle : saveButtonTitle}
              placement="bottom">
              <span>
                <Button
                  customStyles={isActive ? customActiveBtnStyles : {}}
                  clickHandler={handleSubmit}
                  isDisabled={disableSubmit}
                  text={submitDisplay}
                />
              </span>
            </ToolTip>
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
