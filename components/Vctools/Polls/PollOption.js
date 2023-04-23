import styles from "../vctoolMain.module.scss"
const PollOption=({option,placeholder,optionValue,onChangeHandler})=>
{
    return(
        <div className={`${styles.pollOption}`}>
        <p>{option} :</p>
        <div>
          <input type="text" placeholder={placeholder} value={optionValue} onChange={onChangeHandler} maxLength={160}/>
          {/* <img src="/images/svg/vctool/image.svg" /> */}
        </div>
      </div>
    )
};
export default PollOption