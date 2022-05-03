import { bool, func, shape, string } from 'prop-types';
import Popup from 'reactjs-popup';
import styles from './popUp.module.scss';

export default function PopUp({
  isPopUpOpen = true,
  title,
  closeBtn = {},
  submitBtn = {},
  children,
  isFooterVisible = true
}) {
  return (
    <>
      <Popup open={isPopUpOpen} closeOnDocumentClick={false}>
        <div className={`${styles.popUpContainer}`}>
          <div className={`row`}>
            <div className={`${styles.popUp}`}>
              <div className={`${styles.header}`}>
                <div className={`${styles.title}`}>{title} </div>
                <div className={`${styles.cross_img}`} onClick={closeBtn.handleClick}>
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
                          className={`${styles.btn_cancel_add}`}
                          onClick={closeBtn.handleClick}>
                          {closeBtn.name}
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
                          {submitBtn.name}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
  title: string,
  closeBtn: btnObj,
  submitBtn: btnObj
};
