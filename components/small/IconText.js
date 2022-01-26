const IconText = ({image,text}) =>{
    return(
        <>
        
            <div className="IconText">
                <img src={image}/>
                <p>{text}</p>
            </div>
        
            <style jsx>{`
        
        .IconText{
                margin: 10px;
                display: flex;
                align-items: center;
                cursor: pointer;

            }
            .IconText:hover{
                color: #ffffff;
            }
            .IconText img{
                width: 15px;
                margin-right: 10px;
            }
        `}

        </style>
        </>
    )
}
export default IconText