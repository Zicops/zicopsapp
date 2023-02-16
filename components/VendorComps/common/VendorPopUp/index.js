import Popup from 'reactjs-popup';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import ToolTip from '@/components/common/ToolTip';
import styles from './popup.module.scss';
import useHandlePopUp from './useHandlePopUp';

export default function VendorPopUp({
  title,
  popUpState = [],
  closeBtn = {},
  submitBtn = {},
  onCloseWithCross = () => {},
  isFooterVisible = true,
  positionLeft = '',
  size = 'medium',
  customStyles = {},
  children,
  tooltipCloseBtnTitle,
  onClose = () => {},
  isAttempted = false,
  isMarketYard = false
}) {
  const { isOpen, closePopUp, confirmMsg, setConfirmMsg } = useHandlePopUp(popUpState, onClose);

  // modify popup styles based on props
  const propStyles = { width: '800px', ...customStyles };
  if (positionLeft) propStyles.left = positionLeft;

  if (size === 'large') {
    propStyles.width = '70vw';
    // propStyles.height = '75vh';
  }

  if (size === 'small') {
    propStyles.width = '600px';
  }

  if (size === 'smaller') {
    customStyles.width = '400px';
  }

  return (
    <>
      <Popup
        open={isOpen}
        overlayStyle={{ backdropFilter: `blur(2px)`, backgroundColor: ' #00000080' }}
        closeOnDocumentClick={false}
        closeOnEscape={false}>
        <div className={`${styles.popUpContainer}`} style={propStyles}>
          <div className={`${styles.popUp}  ${isMarketYard ? styles.popMarket : styles.popManage}`}>
            <div className={`${styles.header}`}>
              <div className={`${styles.title}`}>{title} </div>
              <div
                className={`${styles.cross_img} ${closeBtn.disabled ? styles.disabled : ''}`}
                onClick={() => {
                  if (closeBtn.disabled) return;
                  closePopUp();
                  onCloseWithCross();
                }}>
                <ToolTip title={tooltipCloseBtnTitle}>
                  {!isMarketYard ? (
                    <img src="/images/svg/cross.svg" alt="" />
                  ) : (
                    <img src="/images/svg/close-icon.svg" alt="" />
                  )}
                </ToolTip>
              </div>
            </div>
            {!isMarketYard && <div className={`${styles.hr}`}></div>}

            <div className={`${styles.body} ${isAttempted ? styles.attempted : ''}`}>
              {children}
            </div>

            {isFooterVisible && (
              <div className={`${styles.footer}`}>
                {/* <div className={`form_row`}>
                  <div className={`col_25`}></div>
                  <div className={`col_75`}>
                  </div>
                </div> */}
                <div className={`${styles.button_container}`}>
                  <button
                    type="button"
                    value="cancel"
                    className={`${
                      closeBtn.disabled
                        ? styles.btn_cancel_add_disabled
                        : !isMarketYard
                        ? styles.btn_cancel_add
                        : styles.btn_cancel_add2
                    }`}
                    disabled={closeBtn.disabled}
                    onClick={closeBtn.handleClick || closePopUp}>
                    {closeBtn.name || 'Cancel'}
                  </button>
                  <button
                    type="button"
                    value="add"
                    className={`${
                      submitBtn.disabled ? '' : !isMarketYard ? styles.add_btn : styles.add_btn2
                    } ${
                      submitBtn.disabled
                        ? styles.btn_cancel_add_disabled
                        : !isMarketYard
                        ? styles.btn_cancel_add
                        : styles.btn_cancel_add2
                    }`}
                    disabled={submitBtn.disabled}
                    onClick={submitBtn.handleClick}>
                    {submitBtn.name || 'Next'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {typeof confirmMsg === 'string' && (
          <ConfirmPopUp
            title={confirmMsg}
            btnObj={{
              handleClickLeft: () => setConfirmMsg(true),
              handleClickRight: () => setConfirmMsg(false)
            }}
          />
        )}
      </Popup>
    </>
  );
}
