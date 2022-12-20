import styles from './orgHomepage.module.scss';

export default function OrgHomepage() {
  return (
    <div className={`${styles.main_cont}`}>
      <div className={`${styles.left_cont}`}>
        <img src="/images/orgHomepageZ.png" alt="" />
        <div className={`${styles.left_cont_text}`}>
          <div className={`${styles.left_cont_maintext}`}>
            <p>Welcome To</p>
            <p>Amdocs</p>
            <p>learning space</p>
          </div>
          <div className={`${styles.left_cont_supporttext}`}>
            <p>Comprehensive Learning for sustainable growth</p>
          </div>
        </div>
      </div>

      <div className={`${styles.right_cont}`}>
        <div className={`${styles.right_div}`}>
          <div className={`${styles.icon_logo}`}>
            <img src="/images/svg/amdocsicon.svg" alt="" />
            <p>Amdocs</p>
          </div>
          <div className={`${styles.login_deets}`}>
            <p>Sign into your Learning space</p>
            <input type="text" placeholder="Enter Username" />
            <input className={`${styles.password}`} type="text" placeholder="Enter Password" />
            <p className={`${styles.forgot_password}`}>Forgot Password?</p>
          </div>
          <div className={`${styles.login_button}`}>
            <button type="submit">Login</button>
          </div>
          <div className={`${styles.empowered}`}>
            <p>Empowered by Zicops</p>
          </div>
        </div>
      </div>
    </div>
  );
}
