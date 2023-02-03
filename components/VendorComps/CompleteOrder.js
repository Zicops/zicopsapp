import styles from './vendorComps.module.scss';
const CompleteOrder = () => {
  return (
    <div className={`${styles.CompleteItemContainer}`}>
      <div className={`${styles.circleImage}`}>
        <img src="/images/svg/check_circle.svg" alt="" />
      </div>
      <p className={`${styles.text1}`}>New Order Added</p>
      <p className={`${styles.text2}`}>
        A new order with Order ID “123abc” has been added.Do give your feedback of service post
        completion and delivery of the required services.
      </p>
      <div className={`${styles.newVendorAdd}`}>
        <span>New Vendor added to your Vendor list</span>
        <div className={`${styles.comapanyLogoName}`}>
          <div className={`${styles.logo}`}>
            <img src="/images/discord_logo.png" alt="" />
          </div>
          <div className={`${styles.comapanyName}`}>
            <p>ABC Learning Technology Pvt. LTd.</p>
            <span>Organisation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;