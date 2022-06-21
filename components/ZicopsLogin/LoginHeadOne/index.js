import styles from '../zicopsLogin.module.scss';

const LoginHeadOne = ({ heading, sub_heading, info }) => {
  return (
    <>
      <div className={`${styles.zicops_logo}`}>
        <img src={'/images/Zicops-logo-icon.png'} width={'90px'} />
      </div>
      <div className={`${styles.heading}`}>{heading}</div>
      <div className={`${styles.sub_heading}`}>
          <p>
              {sub_heading}
          </p>
          {info}
      </div>
    </>
  );
};

export default LoginHeadOne;
