const ModuleAdded = ({text, type}) => {
    // alert(type);
    var added_head 
    if (type == 'module') {
        added_head = 'module_added_head';
    }
    else if (type == 'chapter') {
        added_head = 'chapter_added_head';
    } else added_head = 'topic_added_head';
    return (
        <>
        
        <style jsx>{`
        .module_added_head{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-left:auto;
            margin-right:20px;
            margin-top: 10px;
            margin-bottom: 10px;
            border: 1px solid #808080;
            border-radius: 8px;
            padding: 10px 20px;
            color: #868b8b;
        }
        .chapter_added_head{
            width: 95%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-left:auto;
            margin-top: 10px;
            margin-bottom: 10px;
            border: 1px solid #808080;
            border-radius: 8px;
            padding: 10px 20px;
        }
        .topic_added_head{
            width: 90%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-left:auto;
            margin-top: 10px;
            margin-bottom: 10px;
            border: 1px solid #808080;
            border-radius: 8px;
            padding: 10px 20px;
        }
        .module_title{
            text-transform:uppercase;
        }
        .edit_img img{
            width: 25px;
            cursor: pointer;
        }
        `}</style>
            <div className={added_head}>
                <div className="module_title">
                    {text}
                </div>
                <div className="edit_img">
                    <img src="/images/edit-icon.png" alt="" />
                </div>
            </div>
        </>
    )
  }
  
  export default ModuleAdded;