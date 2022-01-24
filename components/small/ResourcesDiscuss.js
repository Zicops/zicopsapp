import Image from "next/image";
const ResourcesDiscuss = () =>{
    return(
        <div>
            <div className="topic">
                <div className="preclass">
                    <div><img src="/images/plus.png"/><p>Resources</p></div>
                    <div><img src="/images/search.png"/><p>Discuss</p></div>
                </div>
            </div>
            <style jsx>{`
        .topic{
            display: flex;
            flex-direction: column;
            padding: 0 5%;
            margin-top: 20px;
            margin-bottom: 50px;
           
           
        }
        .preclass{
                font-size: 12px;
                color: #858f8f;
                display: flex;
                justify-content: right;
                
                }
        .preclass div{
                margin: 10px;
                display: flex;
                align-items: center;
                cursor: pointer;
                
                }
        .preclass div:hover{
                color: #ffffff;
                }
        .preclass img{
                width: 20px;
                margin-right: 10px;
                }
    
                
        `}

        </style>
        </div>
       
       
    )
}
export default ResourcesDiscuss