 import styles from "../vctoolMain.module.scss"
const VctoolButton = ({toolTipClass, onClickfun, trueSrc, falseSrc, toggle, customStyle, btnValue, customId,toolTipName }) => {
    return (
        <button onClick={onClickfun} id={customId}
        className={`${styles.tooltip} ${customStyle}`}>
            {
                toggle ?
                    <img src={trueSrc} />
                    :
                    <img src={falseSrc} />
            }
            {btnValue}
            <span className={`${styles.tooltiptext} ${toolTipClass}`}>{toolTipName}</span>
             </button>
    )
};
export default VctoolButton;