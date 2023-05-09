import { COURSE_TYPES } from '@/helper/constants.helper';
import { Skeleton } from '@mui/material';

export default function AboutCard({ isDataLoaded, fullCourse }) {
  return (
    <>
      <div className="tab_heading">About this course</div>
      <div className="tab_section_summary">
        <p>{fullCourse.description}</p>
      </div>
      {fullCourse.type === COURSE_TYPES[1] ? (
        <>
          <div className="row my_30 abstra">
            <div className="col_33">
              <div className="row">
                {isDataLoaded ? (
                  <>
                    <div className="col_50">
                      <div>Course start date: </div>
                    </div>
                    <div className="col_50 abstract">
                      <div>To be disclosed</div>
                    </div>
                  </>
                ) : (
                  <Skeleton sx={{ bgcolor: 'var(--skeleton-dark)' }} variant="text" width={350} />
                )}
              </div>
            </div>

            <div className="col_50">
              <div className="row">
                {isDataLoaded ? (
                  <>
                    <div className="col_25">
                      <div>Course end date: </div>
                    </div>
                    <div className="col_75 abstract">
                      <div>To be disclosed</div>
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
                      <div>Total duration: </div>
                    </div>
                    <div className="col_50 abstract">
                      <div>To be disclosed</div>
                    </div>
                  </>
                ) : (
                  <Skeleton sx={{ bgcolor: 'var(--skeleton-dark)' }} variant="text" width={350} />
                )}
              </div>
            </div>

            <div className="col_50">
              <div className="row">
                {isDataLoaded ? (
                  <>
                    <div className="col_25">
                      <div>Learning duration: </div>
                    </div>
                    <div className="col_75 abstract">
                      <div>To be disclosed</div>
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
                      <div>Instructors: </div>
                    </div>
                    <div className="col_50 abstract">
                      <div>{fullCourse.instructor || 'NA'}</div>
                    </div>
                  </>
                ) : (
                  <Skeleton sx={{ bgcolor: 'var(--skeleton-dark)' }} variant="text" width={350} />
                )}
              </div>
            </div>

            <div className="col_50">
              <div className="row">
                {isDataLoaded ? (
                  <>
                    <div className="col_25">
                      <div>Moderators: </div>
                    </div>
                    <div className="col_75 abstract">
                      <div>To be disclosed</div>
                    </div>
                  </>
                ) : (
                  <Skeleton sx={{ bgcolor: 'var(--skeleton-dark)' }} variant="text" width={350} />
                )}
              </div>
            </div>
            <div className="col_33"></div>
          </div>
        </>
      ) : (
        <>
          <div className="row my_30 abstra">
            <div className="col_33">
              <div className="row">
                {isDataLoaded ? (
                  <>
                    <div className="col_50">
                      <div>Course Duration: </div>
                    </div>
                    <div className="col_50 abstract">
                      <div>{fullCourse.duration} mins</div>
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
                      <div>
                        {fullCourse?.expected_completion || 1} day
                        {fullCourse?.expected_completion > 1 ? 's' : ''}
                      </div>
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
                      <div>Publisher: </div>
                    </div>
                    <div className="col_75 abstract">
                      <h4>{fullCourse.publisher}</h4>
                    </div>
                  </>
                ) : (
                  <Skeleton sx={{ bgcolor: 'var(--skeleton-dark)' }} variant="text" width={350} />
                )}
              </div>
            </div>
            <div className="col_33"></div>
          </div>
        </>
      )}

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
