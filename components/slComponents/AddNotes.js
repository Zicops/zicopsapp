const AddNotes = () => {
    return(
        <>
        <div className="add_notes col_25">
            <div className="add_notes_btn">
                +
            </div>
            <div className="add_notes_text">
                Add Note
            </div>
        </div>
        <style jsx>{`
        .add_notes{
            background-color:#323232;
            padding:25px;
            border-radius:5px;
            margin:20px 80px;
            border:1px solid rgb(189, 182, 182);
            display:block;
            text-align:center;
            
        }
        .add_notes_btn{
            font-size:50px;
            font-weight:600;
            color:rgb(189, 182, 182);
        }
        .add_notes_btn:hover{
            cursor:pointer;
        }
        .add_notes_text{
            font-size:1em;
            color:rgb(189, 182, 182);
        }
      

        `}
        </style>
        </>
    )
}
export default AddNotes