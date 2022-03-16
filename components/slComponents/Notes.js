const Notes = () => {
    return(
        <>
        <div className="row">
        <div className="notes col_25">
            <div className="notes_head">
                Topic 1
             </div>
            <div className="notes_body">
                <div className="notes_data">
                    <p >12 Notes</p>
                    <p>03 Bookmark</p>
                </div>
                <div className="arrow_img">
                <img src="images/right-arrow.png" alt="" />
                </div>
            </div>
        </div>
        </div>
        <style jsx>{`
        .notes{
            background-color:#323232;
            padding:25px;
            border-radius:5px;
            margin:40px 80px;
            min-height:150px;
        }
       .notes_head{
            color: rgb(81, 190, 188);
            font-weight:700;
            font-size:20px;
            padding-bottom:10px;
            text-transform:capitalize;
            border-bottom:1px solid  rgb(189, 182, 182);
         }
         .notes_body{
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
         .notes_body p{
             padding-bottom:5px;
         }

        `}
        </style>
        </>
    )
}
export default Notes