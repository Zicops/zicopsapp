const AddNotes = ({text}) => {
    return(
        <>
        <div className="add">
            <div className="add_plus">
                + 
                <div className="add_text">
                    {text}
                </div>
            </div>
        </div>
        <style jsx>{`
        .add{
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            align-self: stretch;
            text-align: center;
            margin: 5px;
            padding:20px;
            border:1px solid var(--dark_three);
            border-radius: 5px;
            color: var(--dark_three);
            cursor: pointer;
        }
        .add:hover{
            border:1px solid rgb(81, 190, 188);
            color: rgb(81, 190, 188);
        }
        .add_plus{
            color: var(--primary);
            font-size:3vw;
            line-height: 2vw;
        }
        .add_text{
             font-size: 1.1vw;
             color: var(--dark_three);
        }
        `}
        </style>
        </>
    )
}
export default AddNotes