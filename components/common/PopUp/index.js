import { array, bool, func, oneOf, shape, string } from 'prop-types';
import Popup from 'reactjs-popup';
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
  children
}) {
  const { isOpen, closePopUp } = useHandlePopUp(popUpState);

  // modify popup styles based on props
  const customStyles = { width: '800px' };
  if (positionLeft) customStyles.left = positionLeft;

  if (size === 'large') {
    customStyles.width = '70vw';
    customStyles.height = '75vh';
  }

  if (size === 'small') {
    customStyles.width = '700px';
  }

  return (
    <>
      <Popup open={isOpen} closeOnDocumentClick={false} closeOnEscape={false}>
        <div className={`${styles.popUpContainer}`} style={customStyles}>
          <div className={`${styles.popUp}`}>
            <div className={`${styles.header}`}>
              <div className={`${styles.title}`}>{title} </div>
              <div className={`${styles.cross_img}`} onClick={closePopUp}>
                <img src="/images/circular-cross.png" alt="" />
              </div>
            </div>

            <div className={`${styles.body}`}>{children}</div>

            {isFooterVisible && (
              <div className={`${styles.footer}`}>
                <div className={`form_row`}>
                  <div className={`col_25`}></div>
                  <div className={`col_75`}>
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
                        className={`${
                          submitBtn.disabled
                            ? styles.btn_cancel_add_disabled
                            : styles.btn_cancel_add
                        }`}
                        disabled={submitBtn.disabled}
                        onClick={submitBtn.handleClick}>
                        {submitBtn.name || 'Submit'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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
  isPopUpOpen: bool,
  popUpState: array,
  title: string,
  closeBtn: btnObj,
  submitBtn: btnObj,
  isFooterVisible: bool,
  positionLeft: string,
  size: oneOf(['large', 'medium', 'small'])
};
