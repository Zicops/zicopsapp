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
  console.log(tab)
  let saveButtonTitle="Save Master details and proceed with question addition"
  let cancelButtonTitle="Cancel and go back to question paper list"
  if(tab==="Question Master"){
    saveButtonTitle="Save Uploaded Questions";
    cancelButtonTitle="Cancel and go back to Questions list"
  }

  let tooltipStatus = "Question paper details saved"
  if(status==="DRAFT"){
   tooltipStatus="Question Paper not saved"
  } else if(status==="FAILED"){
    tooltipStatus="Failed to save Question paper"
  }else if(status==="UPDATING"){
    tooltipStatus="Updating Question paper"
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

      <section className={`${styles.tabSection} ${customClass}`} style={customStyles}>
        {showActiveTab(tab)}
      </section>

      {/* footer */}
      {showFooter && (
        <div className={`${styles.contentPanel}`}>
          <div className={`${styles.leftText}`}>
            <ToolTip title={tooltipStatus} placement="top"><h3>Status: {status}</h3></ToolTip>
          </div>

          {children}

          <div className={`${styles.rightText}`}>
            <ToolTip title={cancelButtonTitle} placement="left">
              <span>
                <Button clickHandler={handleCancel} text={cancelDisplay} />
              </span>
            </ToolTip>
            <ToolTip
              title={saveButtonTitle}
              placement="bottom">
              <span>
                <Button
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
