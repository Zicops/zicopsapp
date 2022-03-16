const BookmarkOpen = () => {
    return(
        <>
        
        <div className="topic-open col_50">
            <div className="image-box">
                <img src="/images/play-background.png"  alt="" />
            </div>
           <div className="data">
                <div className="data-time">
                    05:44
                </div>
                <div className="data-title">
                    Lorem ipsum is simply dummy text of the printing and type setting industry.
                </div>
                
           </div>
        </div>
        <style jsx>{`
        .topic-open{
            background-color:#323232;
            padding:25px;
            border-radius:5px;
            margin:40px 80px;
            min-height:160px;
            display:flex;
            // justify-content:space-around;
            align-items:center;
            min-height:100px;
        }
        .active{
            border:1px solid rgb(81, 190, 188);
        }
        .image-box img{
            border:2px solid rgb(81, 190, 188);
            width:100px;
        }
        .data{
            display:flex;
            flex-direction:column;
            justify-content:space-around;
            padding-left:25px;
            
        }
        
        .data-time{
            color: rgb(81, 190, 188);
            font-weight:700;
            font-size:18px;
            padding-bottom:8px;
        }
        .data-title{
            font-size:18px;
            padding-bottom:8px;
            color: rgba(255, 255, 255, 0.4);
        }
     
          

        `}
        </style>
        </>
    )
}
export default BookmarkOpen