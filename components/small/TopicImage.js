
const TopicImage = ({topic_image}) =>{
    return(
        <>
            <div className="topic_img">
                <img src={topic_image}/>
            </div>
            <style jsx>{`
            .topic_img{
                width: 80px;
                height: 80px;
                margin: 5px;
                margin-right: 5%;
                border: 1px solid #858f8f;
            }
            .topic_img img{
                width: 80px;
                height: 80px;
                object-fit: cover;
            }`}

            </style>
        </>
    )
}
export default TopicImage