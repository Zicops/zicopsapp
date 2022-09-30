import { useRouter } from "next/router";

export default function BigCard({data}) {
    const router = useRouter();
    return (
      <>
        <div
          className="card_item"
          onClick={() => router.push('/search-page/?cat=' + data?.Name, '/search-page')}>
          <img src={data?.ImageUrl} alt="" />
          <div>{data?.Name}</div>
        </div>
        <style jsx>
          {`
            .card_item {
              height: 600px;
              background-color: var(--dimgray);
              border-radius: 10px;
            }
            .card_item img {
              height: 100%;
              width: 100%;
              opacity: 1;
            }
            .card_item div {
              color: white;
              position: absolute;
              width: 100%;
              top: 5%;
              font-size: 40px;
              font-weight: normal;
              text-transform: uppercase;
              word-wrap: break-word;
              text-align: center;
              padding: 20px;
              text-shadow: 2px 3px 5px rgba(0, 0, 0, 1);
            }
          `}
        </style>
      </>
    );
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
