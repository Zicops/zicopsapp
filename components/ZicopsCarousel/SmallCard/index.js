import { useRouter } from 'next/router';
import { truncateToN } from '../../../helper/common.helper';

export default function SmallCard({
  image,
  courseData,
  styleClass,
  carouselRefData,
  isShowProgress = false,
  notext = false,
  showAssignSymbol = true
}) {
  const router = useRouter();
  if (!courseData?.name) return null;

  function handleMouseEnter(e, start = 0, end = 0) {
    if (e.currentTarget.parentNode.dataset.index === start.toString()) {
      e.currentTarget.parentNode.style.marginLeft = '60px';
      e.currentTarget.parentNode.style.marginRight = '-60px';
    }

    if (e.currentTarget.parentNode.dataset.index === end.toString()) {
      e.currentTarget.parentNode.style.marginLeft = '-60px';
      e.currentTarget.parentNode.style.marginRight = '60px';
    }
  }

  function handleMouseLeave(e) {
    e.currentTarget.parentNode.style.margin = '';
  }
  const gotoCourse = () => {
    router.push(courseData?.id ? `/course/${courseData.id}` : '/courses');
  };

  const gotoAssignCourses = () => {
    router.push(
      courseData?.id ? `/course/${courseData.id}?isAssign=true` : '/courses',
      `/course/${courseData.id}`
    );
  };

  let courseNameClass = 'coursename';
  if (courseData?.name?.length > 43) {
    // console.log(courseData?.name?.length);
    courseNameClass = 'coursenamesmall';
  }
  const progress =
    courseData?.topicsStartedPercentage != null ? courseData?.topicsStartedPercentage : 0;
  return (
    <>
      <div
        style={{ maxWidth: '350px' }}
        className={`card_item ${styleClass}`}
        onClick={!notext ? gotoCourse : () => {}}
        onMouseEnter={(e) =>
          handleMouseEnter(
            e,
            carouselRefData?.state?.currentSlide,
            carouselRefData?.state?.currentSlide + carouselRefData?.state?.slidesToShow - 1
          )
        }
        onMouseLeave={handleMouseLeave}>
        {/* remove image later */}
        <div className="smallCard">
          {/* <div className="smallCardWrapper">
            <div className="banner">
              {courseData?.type?.split('-').join(' ') || (!notext ? 'Self Paced' : 'Labs')}
            </div>
            {!notext ? (
              <div className={courseNameClass}>
                {courseData.name || 'Hands on Scripting with PYTHON'}
              </div>
            ) : (
              ''
            )}
            {!notext ? <div className="courseowner">{courseData.owner || 'Scripting'}</div> : ''}
          </div> */}
          <img src={courseData.tileImage || image || '/images/dnd1.jpg'} alt="" />
          {/* <LinearProgress
            sx={{
              height: '5px',
              borderRadius: '10px',
              background: '#000',
              '&.MuiLinearProgress-bar': {
                color: '#6BCFCF'
              }
            }}
            variant="determinate"
            value={55}
          /> */}
          {isShowProgress ? (
            <div className="progress">
              <span style={{ width: progress + '%' }}></span>
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="overlay">
          <div className="bottom-box">
            <div className="title-area">
              <div className="firstline">
                <div className={`title ${courseData?.name?.length > 20 ? 'smallFont' : ''}`}>
                  {courseData?.name || 'Hands on Scripting with PYTHON'}
                </div>
              </div>
              <div className="secondline">
                {courseData?.type?.split('-').join(' ') || 'Self Paced'}
              </div>
            </div>
            {showAssignSymbol && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  // alert('hi');
                  gotoAssignCourses();
                }}>
                <img className="addCoursePlus" src="/images/svg/add-line.svg" />
              </div>
            )}
            <div className="desc-area">
              <div className="main-desc">
                <div className="one">
                  <div className="one-text">
                    <span className="level noselect">Level:</span>
                    <span
                      className={`value noselect ${
                        courseData?.expertise_level?.split(',').join(' | ')?.length > 15
                          ? 'smallLevelFont'
                          : ''
                      }`}>
                      {courseData?.expertise_level
                        ? courseData?.expertise_level.split(',').join(' | ')
                        : ' Beginner'}
                    </span>
                  </div>
                  <div className="one-text">
                    <span className="level noselect">Duration: </span>
                    <span className="value noselect">
                      {Math.ceil(courseData?.duration / 60) || '275'} mins
                    </span>
                  </div>
                </div>

                <div className="description noselect">
                  {truncateToN(courseData?.description, 200) ||
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore consequatur smaxime, aliquid quo temporibus aperiam maiores aut fugit.'}
                </div>

                {/* <div className="description noselect">{truncateToN(courseData.summary)}</div> */}
                {/* images/svg */}
              </div>
              {/* <div className="icon-area">
                <ul>
                  <li>
                    <img src="/images/svg/add-line.svg" />
                  </li>
                  <li>
                    <img src="images/cart.png" />
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="category">
              <ul>
                {/* <li>{courseData.category || " Category 1"}</li> */}
                <li>{courseData?.category || ' Category that is longer'}</li>
                <li>{courseData?.sub_category || ' Category longer'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .card_item {
            cursor: pointer;
          }
          .progress {
            width: 90%;
            height: 3px;
            background-color: var(--secondary);
            margin-top: 5px;
            margin-inline: auto;
            position: relative;
          }
          .card_item:hover .progress {
            opacity: 0;
            transition-delay: 0.6s;
          }
          .progress span {
            height: 100%;
            background-color: var(--primary);
            position: absolute;
          }
          .smallCard {
            position: relative;
            height: 140px;
            background-color: var(--header-bg);
            border-radius: 8px;
            // background-image: url('/images/courses/workplace design.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
          .smallCardWrapper {
            height: 100%;
            width: 100%;
            background: #00000080;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%);
            position: absolute;
            // margin-bottom: -141px;
            z-index: 0;
            border-radius: 8px;
          }
          .smallCard img {
            height: 100%;
            object-fit: cover;
            // margin-bottom: -141px;
            opacity: 1;
          }
          .banner {
            position: absolute;
            top: 4%;
            right: 2%;
            background-color: #000000;
            color: #ffffff;
            font-size: 10px;
            padding: 3px 7px;
            border-radius: 0 4px 0 0;
            text-transform: capitalize;
          }
          .coursename {
            margin-top: 50px;
            color: #ffffff;
            font-family: 'Poppins';
            font-size: 18px;
            font-weight: 600;
            padding: 0px 7px;
            border-radius: 0 4px 0 0;
            text-shadow: -1px -1px 2px rgba(255, 255, 255, 0.1), 1px 1px 2px rgba(0, 0, 0, 0.5);
          }
          .coursenamesmall {
            margin-top: 50px;
            color: #ffffff;
            font-family: 'Poppins';
            font-size: 16px;
            font-weight: 600;
            padding: 0px 7px;
            border-radius: 0 4px 0 0;
            text-shadow: -1px -1px 2px rgba(255, 255, 255, 0.1), 1px 1px 2px rgba(0, 0, 0, 0.5);
          }
          .courseowner {
            color: #ffffff;
            font-size: 12px;
            padding: 0px 7px;
            border-radius: 0 4px 0 0;
            text-shadow: -1px -1px 2px rgba(255, 255, 255, 0.1), 1px 1px 2px rgba(0, 0, 0, 0.5);
          }
          .addCoursePlus {
            width: 20px;
            position: absolute;
            top: 4%;
            right: 2%;
            border-radius: 50%;
            // background-color: #000000;
            // color: #ffffff;
            // font-size: 10px;
            // padding: 3px 7px;
            // border-radius: 0 4px 0 0;
            cursor: pointer;
          }
          .addCoursePlus:hover {
            background-color: #121212;
            box-shadow: inset 0 0 10px 0 var(--primary);
            cursor: pointer;
          }
          // .preText {
          //   position: absolute;
          //   top: 45%;
          //   left: 0;
          //   background-color: #00000050;
          //   color: #ffffff;
          //   font-size: 16px;
          //   padding: 3px 7px;
          //   border-radius: 0 4px 0 0;
          //   text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
          // }
          // .mainTopic {
          //   position: absolute;
          //   bottom: 10%;
          //   left: 0;
          //   background-color: #00000050;
          //   color: #ffffff;
          //   font-size: 14px;
          //   padding: 3px 7px;
          //   border-radius: 0 4px 0 0;
          //   text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
          // }
          /* The overlay effect over the image */
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            color: #f1f1f1;
            width: 100%;
            height: 100%;
            opacity: 0;
            border-radius: 8px;
            // box-shadow: 0 0 70px 0 #000000;
          }

          .bottom-box {
            display: flex;
            flex-direction: column;
            height: 100%;
            background: linear-gradient(90deg, rgb(34, 37, 41) 0%, rgba(0, 0, 0, 1) 100%);
            font-size: 10px;
            padding: 5px 10px;
            border-radius: 5px;
            align-content: space-between;
          }

          .title-area {
            padding: 5px 0;
          }

          .firstline {
            display: flex;
            justify-content: space-between;
          }
          .secondline {
            padding: 3px 0;
            font-size: 1em;
            color: var(--primary);
          }
          .title {
            font-size: 1.1em;
            font-weight: 700;
            line-height: 1.2em;
            max-width: 80%;
          }
          .rating {
            font-size: 1em;
            font-weight: 600;
          }
          .desc-area {
            display: flex;
          }
          .main-desc {
            width: 100%;
            align-items: center;
          }
          .one {
            display: flex;
            justify-content: space-between;
            // padding-top: 2px;
          }
          .one-text {
            font-size: 0.8em;
            // margin-right: 20px;
          }
          .one-text .level {
            color: #8f9494;
          }
          .one-text .value {
            color: #d4c5c5;
            font-weight: 600;
          }
          .description {
            font-size: 0.8em;
            color: #858f8f;
            padding: 5px 0;
          }
          .category {
            position: absolute;
            bottom: 0;
            display: flex;
            padding-bottom: 5px;
          }
          .category ul {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin-left: 10px;
          }
          .category ul li {
            margin-right: 20px;
            font-size: 0.8em;
          }
          .icon-area {
            width: 15%;
            margin-top: -10px;
            margin-bottom: -10px;
            display: flex;
            align-items: center;
          }
          .icon-area ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            list-style-type: none;
          }
          .icon-area ul li img {
            width: 25px !important;
            height: auto;
            padding: 5px;
            margin: 3px 7px;
            border: 1px solid #6bcfcf;
          }
          .smallFont {
            font-size: 0.9em;
          }
          .smallLevelFont {
            font-size: 0.8em;
          }
        `}
      </style>
    </>
  );
}
