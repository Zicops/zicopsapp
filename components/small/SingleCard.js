export default function Card({image}) {

    const gotoCourse = () => {
        window.location.href = '/courses'
    }
    return (
        <>  
            <div className="card_item" onClick={gotoCourse}>
                <img src={image} alt=""/>
                <div className="banner">Self Paced</div>
                <div className="overlay">
                    <div className="bottom-box">
                        <div className="title-area">
                            <div className="firstline">
                                <div className="title">
                                    Introduction to Data Science with Python
                                </div>
                                {/* <div className="rating noselect"> */}
                                <div className="secondline">Self Paced</div>
                                {/* </div> */}
                            </div>
                        </div>
                        <div className="desc-area">
                            <div className="main-desc">
                                <div className="one">
                                    <div className="one-text">
                                        <span className="level noselect">Level:</span>
                                        <span className="value noselect">Beginner</span>
                                    </div>
                                    <div className="one-text">
                                        <span className="level noselect">Duration:</span>
                                        <span className="value noselect">240 mins</span>
                                    </div>
                                </div>
                                <div className="description noselect">
                                    Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>
                            </div>
                            <div className="icon-area">
                                <ul>
                                    <li><img src="images/heart.png" /></li>
                                    <li><img src="images/cart.png" /></li>
                                </ul>
                            </div>
                        </div>
                        <div className="category">
                            <ul>
                                <li>Data Science</li>
                                <li>Business Intelligence</li>
                                <li>ETL</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .card_item{
                    cursor:pointer;
                }
                
                /* The overlay effect over the image */
                .overlay {
                    position: absolute;
                    top:0;
                    left: 0;
                    color: #f1f1f1;
                    width: 100%;
                    height: 100%;
                    opacity:0;
                    border-radius: 7px;
                    // box-shadow: 0 0 70px 0 #000000;
                }
                
                .banner {
                    position: absolute;
                    top: 0;
                    right: 0;
                    background-color: #000000;
                    color: #ffffff;
                    font-size: 10px;
                    padding: 3px 7px;
                    border-radius: 0 4px 0 0;
                }

                .bottom-box{
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background: linear-gradient(90deg, rgb(34, 37, 41) 0%, rgba(0,0,0,1) 100%);
                    font-size: 10px;
                    padding: 5px 10px;
                    border-radius: 5px;
                    align-content: space-between;
                }

                .title-area{
                    padding: 5px 0;
                }

                .firstline{
                    display: flex;
                    justify-content: space-between;
                }
                .secondline{
                    padding: 2px 0;
                    font-size: 1em;
                    color: var(--primary);
                }
                .title{
                    font-size: 1em;
                    font-weight: 700;
                    line-height: 1.2em;
                    max-width: 60%;
                }
                .rating{
                    font-size: 1em;
                    font-weight: 600;
                }
                .desc-area{
                    display: flex;
                }
                .main-desc{
                    width: 85%;
                    align-items: center;
                }
                .one{
                    display: flex;
                    padding-top: 2px;
                }
                .one-text{
                    font-size: 0.8em;
                    margin-right: 20px;
                }
                .one-text .level{
                    color: #8f9494;
                }
                .one-text .value{
                    color: #d4c5c5;
                    font-weight: 600;
                }
                .description{
                    font-size: 0.8em;
                    color: #858f8f;
                    padding: 5px 0;
                }
                .category{
                    position: absolute;
                    bottom: 0;
                    display: flex;
                    padding-bottom: 5px;
                }
                .category ul{
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    margin-left: 10px;
                }
                .category ul li{
                    margin-right: 20px;
                    font-size: 0.8em;
                }
                .icon-area {
                    width: 15%;
                    margin-top: -10px;
                    margin-bottom: -10px;
                    display: flex;
                    align-items: center;
                }
                .icon-area ul {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    list-style-type: none;
                }
                .icon-area ul li img{
                    width: 25px!important;
                    height: auto;
                    padding: 5px;
                    margin: 3px 7px;
                    border: 1px solid #6bcfcf;
                }
            `}
            </style>
        </>
  )
}
