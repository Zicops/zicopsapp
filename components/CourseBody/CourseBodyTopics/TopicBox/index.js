import { Skeleton } from '@mui/material';

export default function TopicBox({ index, name, description, duration }) {
  return (
    <>
      <div className="topic">
        <div className="preclassName">
          <div>
            <img src="images/resourcesicon.png" />
            <p>Resources</p>
          </div>
          <div>
            <img src="images/discussicon.png" />
            <p>Discuss</p>
          </div>
        </div>

        <div className="topic-loop">
          <div className="topic_img">
            <img src="images/topicImage.png" alt="" />
          </div>

          <div className="topic_text">
            <div className="topic_heading">
              <h4>
                <span>
                  {index + ". " || (
                    <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={50} />
                  )}
                </span>
                {name || (
                  <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={30} width={150} />
                )}
              </h4>
            </div>
            <div className="topic_description">
              <p>
                {description || (
                  <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={70} width={500} />
                )}
              </p>
            </div>
          </div>
          <div className="topic_player">
            <div className="progress_bar">
              <img src="images/progressTriangle.png" alt="" />
            </div>
            <div className="details">
              <div>Video + Quiz</div>
              <div>
                Duration :{' '}
                <span>
                  {duration || (
                    <Skeleton
                      sx={{ bgcolor: 'dimgray' }}
                      variant="rectangular"
                      height={20}
                      width={100}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* move to .scss */}
      <style>
        {`
                .topic{
                    display: flex;
                    flex-direction: column;
                    padding: 0 5%;
                    padding-bottom: 50px;
                }
                
                .topic .preclassName{
                    font-size: 12px;
                    color: #858f8f;
                    display: flex;
                    justify-content: right;
                }
                .topic .preclassName div{
                    margin: 10px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
                .topic .preclassName div:hover{
                    color: #ffffff;
                }
                .topic .preclassName img{
                    width: 20px;
                    margin-right: 10px;
                }
                .topic-loop{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px;
                    border: 1px solid #ffffff;
                    transition: all 0.3s;
                    cursor: pointer;
                }
                .topic-loop:hover{
                    box-shadow: 0 0 10px 0 #6bcfcf;
                    transform: scale(1.02);
                    background-color: #000000;
                }
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
                }
                .topic_text{
                    width: 50%;
                    margin-right: 5%;
                }
                .topic_text .topic_heading h4{
                    font-size: 14px;
                    color: #ffffff;
                }
                .topic_text .topic_description {
                    font-size: 12px;
                    color: #858f8f;
                    padding: 5px 0 0 0;
                }
                .topic_player{
                    width: 40%;
                    margin-right: 5%;
                    font-size: 12px;
                    color: #858f8f;
                }
                .topic_player .details{
                    display: flex;
                    justify-content: space-between;
                    padding-top: 20px;
                }
                .progress_bar{
                    width: 100%;
                    height: 10px;
                    margin: auto;
                    background: #343535;
                    border: 1px solid #ffffff;
                    position: relative;
                }
                .progress_bar:after{
                    content: '';
                    width: 50%;
                    height: 8px;
                    background: #858f8f;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                .progress_bar img{
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translate(-50%, -33%);
                    width: 30px;
                    z-index: 2;
                }
                `}
      </style>
    </>
  );
}
