export default function Card({image}) {

    return (
        <>
            <div className="card_item">
                <img src={image} alt=""/>
                <div className="card_overlay">

                </div>
            </div>
            <style jsx>{`
                .card_item{
                    // transition: all 0.3s;
                }
                .card_item img{
                    width: 100%;
                    display: block;
                    margin: auto;
                    cursor: pointer;
                    z-index: 0;
                    // transition: all 0.5s;
                }
                // .card_item:hover{
                //     transform: scale(1.2);
                //     z-index:99;
                // }
            `}
            </style>
        </>
  )
}
