const TopicOpenDoc = () => {
    return(
        <>
        
        <div className="topic-open col_33">
            <div className="image-box">
                <img src="/images/doc.png"  alt="" />
            </div>
           <div className="data">
                <div className="data-title">
                    Human-centric computing and information science
                </div>
                 <div className="data-btn">
                    <button>view</button>
                 </div>
           </div>
        </div>
        <style jsx>{`
        .topic-open{
            background-color:#323232;
            padding:25px;
            border-radius:5px;
            margin:40px 80px;
            min-height:150px;
            display:flex;
            justify-content:space-around;
            align-items:center;
            min-height:100px;
        }
        .active{
            border:1px solid rgb(81, 190, 188);
        }
        .image-box img{
            border:2px solid rgb(81, 190, 188);
            padding:10px;
        }
        .data{
            display:flex;
            flex-direction:column;
            justify-content:space-around;
            padding-left:25px;
            
        }
        .data-title{
            color: rgb(81, 190, 188);
            font-weight:700;
            font-size:18px;
            padding-bottom:10px;
        }
        .data-btn button{
            padding:5px 15px;
            font-size:13px;
            color:rgb(81, 190, 188);
            background-color:#323232;
            border:1px solid rgb(81, 190, 188);
            text-transform: capitalize;text-transform: capitalize;
            margin-top:40px;
            word-wrap:wrap;
           
        }
        .data-btn button:hover{
            cursor:pointer;
        }

        `}
        </style>
        </>
    )
}
export default TopicOpenDoc