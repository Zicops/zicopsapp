const Bookmark = () => {
    return(
        <>
        <div className="bookmark">
            <div className="image-box">
                <img src="/images/square_demo_img.png"  alt="" />
            </div>
           <div className="data">
                <div className="data-time">
                    05:44
                </div>
                <div className="data-title">
                    My bookmark is saved at this point.
                </div>
                 <div className="data-btn">
                    <button>Play</button>
                 </div>
           </div>
        </div>
        <style jsx>{`
        .bookmark{
            display:flex;
            flex: 1;
            background-color:#323232;
            color: var(--primary);
            border:1px solid transparent;
            border-radius:5px;
            padding: 10px;
            margin: 5px;
        }
        // .bookmark:hover{
        //     border:1px solid rgb(81, 190, 188);
        // }
        .image-box img{
            border:2px solid rgb(81, 190, 188);
            width:100px;
            height:100px;
            object-fit: cover;
        }
        .data{
            position:relative;
            padding: 5px 25px;
        }
        .data-time, .data-title{
            color: rgb(81, 190, 188);
            font-weight: 700;
            font-size: 1.2vw;
        }
        .data-btn button{
            padding: 8px 35px;
            font-size: 0.9vw;
            color:rgb(81, 190, 188);
            background-color:#323232;
            border:1px solid rgb(81, 190, 188);   
            position: absolute;
            bottom: 5px;
            cursor: pointer;
        }
        .data-btn button:hover{
            color: var(--dark_two);
            background-color: var(--primary);
        }
        `}
        </style>
        </>
    )
}
export default Bookmark