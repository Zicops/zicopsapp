const VctoolButton = ({ onClickfun, trueSrc, falseSrc, toggle, customStyle, btnValue, customId }) => {
    return (
        <button onClick={onClickfun} id={customId}
            className={customStyle}>
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