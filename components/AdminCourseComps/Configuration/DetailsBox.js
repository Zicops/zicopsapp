import styles from "../adminCourse.module.scss"
const DetailsBox = ({ imgSrc, head, detail }) => {
    return (
        <div className={`${styles.detailsBoxContainer}`}>
            <div className={`${styles.detailsImgBox}`}>
                <img src={imgSrc} />
            </div>
            <div className={`${styles.detailsInfo}`}>
                 <label>{head}</label>
                 <div>{detail}</div>
            </div>
        </div>
    )
}
export default DetailsBox;