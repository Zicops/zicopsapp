import styles from './inviteUserEmails.module.scss';

function UserEmailPills({ userEmails = [], userType = '', title = '' }) {
  return (
    <>
      <div className={`${styles.titleContainer}`}>{title}</div>
      <div className={`${styles.emailContainer}`}>
        {userEmails?.map((email) => (
          <div className={`${styles.emailPills}`}>
            <p>
              {email}
              <span>{userType}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserEmailPills;
