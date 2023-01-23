import styles from '../vendorComps.module.scss';

export default function VendorMaster() {
  return (
    <div className={`${styles.vendorMasterContainer}`}>
      <div className={`${styles.input1}`}>
        <label for="vendorName">Vendor Name: </label>
        <input type="text" id="vendorName" name="vendorname" placeholder="Enter vendor Name" />
      </div>
      <div className={`${styles.addressImageDiv}`}>
        <div className={`${styles.input2}`}>
          <label for="vendorName">Vendor Address: </label>
          <input type="text" id="vendorName" name="vendorname" placeholder="Enter vendor address" />
        </div>
        <div className={`${styles.input2}`}>
          <label for="vendorName">Update vendor profile image: </label>
          <input
            type="text"
            id="vendorName"
            name="vendorname"
            placeholder=""
            style={{ border: '1px dashed #747474' }}
          />
        </div>
      </div>
      <div className={`${styles.websiteSocialDiv}`}>
        <div className={`${styles.input3}`}>
          <label for="vendorWebsite">Add website URL: </label>
          <input
            type="text"
            id="vendorWebsite"
            name="vendorWebsite"
            placeholder="https://website_abc.com"
          />
        </div>
        <div className={`${styles.input3}`}>
          <label for="vendorName">Add URL of social media pages: </label>
          <div className={`${styles.icons}`}>
            <img src="/images/FB.png" />
            <img src="/images/insta.png" />
            <img src="/images/twitter.png" />
            <img src="/images/linkedin.png" />
          </div>
        </div>
      </div>

      <div className={`${styles.input4}`}>
        <label for="saysomething">Say something: </label>
        <textarea
          type="text"
          id="saysomething"
          name="saysomething"
          placeholder="Say Something..."
        />
      </div>
      <div className={`${styles.input1}`}>
        <label for="addUser">Add User: </label>
        <input type="text" id="addUser" name="addUser" placeholder="Enter email id" />
      </div>
    </div>
  );
}
