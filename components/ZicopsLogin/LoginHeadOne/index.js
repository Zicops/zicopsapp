import styles from '../zicopsLogin.module.scss';

const LoginHeadOne = ({ heading, sub_heading, info , showImage = true }) => {
  return (
    <>
      {showImage &&
        <div className={`${styles.zicops_logo}`}>
          <img src={'/images/brand/zicops-icon.png'} />
        </div>
      }
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
