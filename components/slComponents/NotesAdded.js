const NotesAdded = () => {
    return(
        <>
        
        <div className="notes_added col_20">
        <div className="notes_head">
            <div className="notes_title">
                Note 1
            </div>
            <div className="notes_icon">
                <img src="/images/delete-icon.png"  alt="" />
                <img src="/images/delete-icon.png"  alt="" />
                <img src="/images/delete-icon.png"  alt="" />
            </div>
            
        </div>
        <div className="notes_body">
            Hello
        </div>
        </div>
    
      
        <style jsx>{`
        
        .col_20{
            width:20%;
        }
        .notes_added{
            background-color: rgb(81, 190, 188);
            min-height:150px;
            margin:40px 80px;
            padding:25px;
         
        }
        .notes_title{
            font-size:20px;
        }
        .notes_icon{
            display:flex;     
        }
        .notes_icon img{
            width:12px;
            margin:2px;

        }
        .notes_head{
            padding-bottom:10px;
            display:flex;
            justify-content:space-between;
            align-items:center;
        }
        `}

        </style>
        </>
    )
}
export default NotesAdded