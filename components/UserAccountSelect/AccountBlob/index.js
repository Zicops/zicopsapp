import styles from '../userAccountSelect.module.scss';

const AccountBlob = ({lspData = {} , handleClick=()=>{}}) => {
  return (
    <><div className={`${styles.blobContainer}`}>
        <div className={`${styles.blobContainer1}`}>
      <div className={`${styles.accountBlobContainer}`} onClick={()=>{handleClick(lspData)}}>
        
        {lspData?.lsp_id}
        
      </div>
      </div>
      </div>
    </>
  );
};

export default AccountBlob;
