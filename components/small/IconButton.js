import styles from '../../styles/CourseMaster.module.css';

const IconButton = ({text, styleClass, onClick, data}) => {
    let sclass;
    if(styleClass=='black'){
        sclass = styles.btn_add;
    }else if (styleClass=='grey'){
        sclass = styles.btn_grey;
    } else {
        sclass = styles.btn_lightblack;
    }
    
    return (
        <button className={sclass} onClick={onClick} data-custom={data}>
            <span>
                <img src="/images/plus.png" alt="" />
            </span>
            {text}
        </button>
    )
}
export default IconButton