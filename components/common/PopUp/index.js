import { array, bool, func, oneOf, shape, string } from 'prop-types';
import Popup from 'reactjs-popup';
import ConfirmPopUp from '../ConfirmPopUp';
import ToolTip from '../ToolTip';
import useHandlePopUp from './Logic/useHandlePopUp';
import styles from './popUp.module.scss';

export default function PopUp({
  title,
  popUpState = [],
  closeBtn = {},
  submitBtn = {},
  isFooterVisible = true,
  positionLeft = '',
  size = 'medium',
  customStyles = {},
  children,
  tooltipCloseBtnTitle
}) {
  const { isOpen, closePopUp, confirmMsg, setConfirmMsg } = useHandlePopUp(popUpState);

  // modify popup styles based on props
  const propStyles = { width: '800px', ...customStyles };
  if (positionLeft) propStyles.left = positionLeft;

  if (size === 'large') {
    propStyles.width = '70vw';
    propStyles.height = '75vh';
  }

  if (size === 'small') {
    propStyles.width = '700px';
  }

  if (size === 'smaller') {
    customStyles.width = '400px';
  }

  return (
    <>
      <Popup open={isOpen} closeOnDocumentClick={false} closeOnEscape={false}>
        <div className={`${styles.popUpContainer}`} style={propStyles}>
          <div className={`${styles.popUp}`}>
            <div className={`${styles.header}`}>
              <div className={`${styles.title}`}>{title} </div>
              <div
                className={`${styles.cross_img} ${closeBtn.disabled ? styles.disabled : ''}`}
                onClick={() => {
                  if (closeBtn.disabled) return;
                  closePopUp();
                }}>
                <ToolTip title={tooltipCloseBtnTitle}>
                  <img src="/images/circular-cross.png" alt="" />
                </ToolTip>
              </div>
            </div>

            <div className={`${styles.body}`}>{children}</div>

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
                      closeBtn.disabled ? styles.btn_cancel_add_disabled : styles.btn_cancel_add
                    }`}
                    disabled={closeBtn.disabled}
                    onClick={closePopUp}>
                    {closeBtn.name || 'Close'}
                  </button>
                  <button
                    type="button"
                    value="add"
                    className={`${submitBtn.disabled ? '' : styles.add_btn} ${
                      submitBtn.disabled ? styles.btn_cancel_add_disabled : styles.btn_cancel_add
                    }`}
                    disabled={submitBtn.disabled}
                    onClick={submitBtn.handleClick}>
                    {submitBtn.name || 'Submit'}
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

const btnObj = shape({
  name: string,
  handleClick: func,
  disabled: bool
});

PopUp.propTypes = {
  popUpState: array,
  title: string,
  closeBtn: btnObj,
  submitBtn: btnObj,
  isFooterVisible: bool,
  positionLeft: string,
  size: oneOf(['large', 'medium', 'small', 'smaller'])
};
