export default function BigCard({image}) {

    return (
        <>  
            <div className="card_item">
                <img src={image} alt=""/>
            </div>
        </>
  )
}

export function OneCard({image}) {

    return (
        <>  
            <div className="single_card_item">
                <img src={image} alt=""/>
            </div>

            <style jsx>
            {`
                .single_card_item{
                    width: 90vw;
                    height: 200px;
                }
                .single_card_item img{
                    height: 100%;
                    object-fit: cover;
                    border-radius: 5px;
                }
                .react-multi-carousel-track .carousel_track{
                    height: 100px!important;
                }
            `}
            </style>
        </>
  )
}
