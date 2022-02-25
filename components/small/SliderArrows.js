export const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
        onMove,
        carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (
        <div>
            <div className="right" onClick={() => onClick()}>
            </div>   
            <style jsx>
                {`
                .right{
                    background: rgb(31,31,31,0.9);
                    background: linear-gradient(90deg, rgba(31,31,31,0) 0%, rgba(31,31,31,0.5) 50%, rgba(31,31,31,0.7) 70%, rgba(31,31,31,1) 100%);
                    width: 6%;
                    height: 100%;
                    position: absolute;
                    top:50%;
                    right: -5%;
                    transform: translateY(-50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 0;
                }
                .right::before{
                    content: url(/images/Squareone.png);
                    margin-left: 10px;
                }
                .right:hover::before{
                    content: url(/images/glowedone.png);
                    // margin-left: -50px;
                }
                `}
            </style>
        </div>
    );
};
export const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
        onMove,
        carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (
        <div>
            <div className="left" onClick={() => onClick()} >
            </div>
            
            <style jsx>
                {`
                .left{
                    background: rgb(31,31,31,0.9);
                    background: linear-gradient(90deg, rgba(31,31,31,1) 0%, rgba(31,31,31,0.7) 50%, rgba(31,31,31,0.5) 70%, rgba(31,31,31,0) 100%);
                    width: 6%;
                    height: 100%;
                    position: absolute;
                    top:50%;
                    left: -5%;
                    transform: translateY(-50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
                
                .left::before{
                    content: url(/images/bigarrowrightblack.png);
                    margin-left: 10px;
                    transform: rotate(180deg);
                }
                .left:hover::before{
                    content: url(/images/bigarrowright.png);
                }
                `}
            </style>
        </div>
    );
};