import styles from '../vctoolMain.module.scss'
const VctoolButton = ({ onClickfun, trueSrc, falseSrc, toggle, custamStyle, btnValue,custamId }) => {
    return (
        <button onClick={onClickfun} id={custamId}
            className={custamStyle}>
            {
                toggle ?
                    <img src={trueSrc} />
                    :
                    <img src={falseSrc} />
            }
            {btnValue} </button>
    )
};
export default VctoolButton;