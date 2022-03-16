const TopicFiles = () => {
    return(
        <>
        
        <div className="topic col_25 active">
            <div>
            <div className="topic_head">
                topic 1
             </div>
            <div className="topic_body">
                <div className="topic_data">
                    <p >12 Files</p>
                </div>
                <div className="arrow_img">
                    <img src="images/right-arrow.png" alt="" />
                </div>
            </div>
            </div>
        </div>
        

        
       
        
        <style jsx>{`
        .topic{
            background-color:#323232;
            padding:25px;
            border-radius:5px;
            margin:40px 80px;
            min-height:150px;
        }
        .active{
            border:1px solid rgb(81, 190, 188);
        }
       .topic_head{
            color: rgb(81, 190, 188);
            font-weight:700;
            font-size:20px;
            padding-bottom:10px;
            text-transform:capitalize;
            border-bottom:1px solid  rgb(189, 182, 182);
         }
         .topic_body{
             padding:10px 15px;
             font-size:1em;
             color: rgb(189, 182, 182);
             display:flex;
             justify-content:space-between;
             align-items:center;
          
         }
         .arrow_img img{
            width:8px;
        }
         .topic_body p{
             padding-bottom:5px;
         }

        `}
        </style>
        </>
    )
}
export default TopicFiles