import { Skeleton } from '@mui/material';

export default function AboutCard({ isDataLoaded, fullCourse }) {
  return (
    <>
      <div className="tab_heading">About this course</div>
      <div className="tab_section_summary">
        <p>{fullCourse.description}</p>
      </div>

      <div className="row my_30 abstra">
        <div className="col_33">
          <div className="row">
            {isDataLoaded ? (
              <>
                <div className="col_50">
                  <div>Course Duration: </div>
                </div>
                <div className="col_50 abstract">
                  <div>{fullCourse.duration}</div>
                </div>
              </>
            ) : (
              <Skeleton sx={{ bgcolor: 'var(--skeleton-dark)' }} variant="text" width={350} />
            )}
          </div>
        </div>

        <div className="col_33">
          <div className="row">
            {isDataLoaded ? (
              <>
                <div className="col_25">
                  <div>Owned By: </div>
                </div>
                <div className="col_75 abstract">
                  <div>{fullCourse.owner}</div>
                </div>
              </>
            ) : (
              <Skeleton sx={{ bgcolor: 'var(--skeleton-dark)' }} variant="text" width={350} />
            )}
          </div>
        </div>
        <div className="col_33"></div>
      </div>

      <div className="row my_30 abstra">
        <div className="col_33">
          <div className="row">
            {isDataLoaded ? (
              <>
                <div className="col_50">
                  <div>Expected Completion Time: </div>
                </div>
                <div className="col_50 abstract">
                  <div>{fullCourse.competion_time}</div>
                </div>
              </>
            ) : (
              <Skeleton sx={{ bgcolor: 'var(--skeleton-dark)' }} variant="text" width={350} />
            )}
          </div>
        </div>

        <div className="col_33">
          <div className="row">
            {isDataLoaded ? (
              <>
                <div className="col_25">
                  <div>Instructor: </div>
                </div>
                <div className="col_75 abstract">
                  <h4>{fullCourse.instructor}</h4>
                </div>
              </>
            ) : (
              <Skeleton sx={{ bgcolor: 'var(--skeleton-dark)' }} variant="text" width={350} />
            )}
          </div>
        </div>
        <div className="col_33"></div>
      </div>

      {/* move to .scss */}

      <style jsx>{`
        .tab_heading {
          color: var(--primary);
          font-size: 1.5vw;
          padding-bottom: 15px;
          font-weight: 700;
        }
        .tab_section_summary {
          color: var(--primary);
          font-size: 0.9vw;
        }
        .abstra {
          font-size: 0.9vw;
          color: var(--primary);
        }
        .abstract {
          color: var(--white);
          font-weight: 600;
        }
        .abstract h4 {
          margin-bottom: 5px;
        }
        .abstract p {
          margin-bottom: 5px;
          font-weight: 400;
        }
      `}</style>
    </>
  );
}
