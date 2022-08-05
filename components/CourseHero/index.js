import { Skeleton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GET_COURSE } from '../../API/Queries';
import { getQueryData } from '../../helper/api.helper';
import { truncateToN } from '../../helper/common.helper';
import { isLoadingAtom } from '../../state/atoms/module.atoms';
import { getVideoObject, VideoAtom } from '../../state/atoms/video.atom';
import { courseContext } from '../../state/contexts/CourseContext';
import LabeledRadioCheckbox from '../common/FormComponents/LabeledRadioCheckbox';
import InputDatePicker from '../common/InputDatePicker';
import PopUp from '../common/PopUp';
import CourseHeader from './CourseHeader';
import style from './courseHero.module.scss';
import Info from './Info';

export default function CourseHero({ isPreview = false }) {
  const [courseAssignData, setCourseAssignData] = useState({
    endDate: null,
    isMandatory: false,
    isCourseAssigned: false
  });
  const [isAssignPopUpOpen, setIsAssignPopUpOpen] = useState(false);
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const { fullCourse } = useContext(courseContext);

  // reset video data
  useEffect(() => {
    setVideoData(getVideoObject());
  }, []);

  const ShowPlayer = () => {
    if (courseAssignData) return alert('Start the course');

    setVideoData({
      ...videoData,
      videoSrc: fullCourse?.previewVideo,
      type: 'mp4',
      startPlayer: true,
      isPreview: true
    });
  };
  const isLoading = useRecoilValue(isLoadingAtom);

  const router = useRouter();
  const courseContextData = useContext(courseContext);
  const { updateCourseMaster, isDataLoaded, setIsDataLoaded } = courseContextData;
  const {
    data: courseData,
    loading,
    error
  } = getQueryData(GET_COURSE, { course_id: router?.query?.courseId }, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (courseData?.getCourse && !isDataLoaded) {
      updateCourseMaster(courseData.getCourse);

      setIsDataLoaded(true);
    }
  }, [courseData]);

  const {
    name: courseTitle,
    benefits,
    summary,
    image,
    expertise_level: expertiseLevel,
    prequisites,
    goodFor,
    mustFor,
    category,
    sub_category: subCategory,
    duration,
    owner: provisionedBy
  } = courseContextData?.fullCourse;

  return (
    <div
      className={`${style.course_header}`}
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
      <div className={`${style.gradient}`}>
        <span onClick={() => (isPreview ? '' : router?.back())}>
          <Link href={isPreview ? `/admin/courses/${courseContextData?.fullCourse.id}` : ''}>
            <a className={`${style.back_btn}`}>
              <img src="/images/bigarrowleft.png" alt="" />
            </a>
          </Link>
        </span>

        <div className={`${style.course_header_text}`}>
          <CourseHeader
            courseTitle={courseTitle}
            provisionedBy={provisionedBy}
            category={category}
            subCategory={subCategory}
            duration={duration?.toString()}
            isLoading={isLoading}
            isPreview={isPreview}
            isCourseAssigned={courseAssignData?.isCourseAssigned}
            handleAssign={() => setIsAssignPopUpOpen(true)}
          />

          <div className={`${style.summary}`}>
            {isLoading ? (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={70} width={500} />
            ) : summary ? (
              truncateToN(summary, 400)
            ) : (
              'N/A'
            )}
          </div>
          <div className={`${style.more_info}`}>
            <Info name="Course Benefits" data={benefits?.join(', ')} />
            <Info name="Expertise Level" data={expertiseLevel?.split(',').join(' | ')} />
          </div>

          <div className={`${style.course_big_button}`}>
            <button onClick={ShowPlayer}>
              {courseAssignData?.isCourseAssigned ? 'Start' : 'Preview'} the course
            </button>
          </div>
          <div className={`${style.suggested_completion}`}>
            <p>
              {isLoading ? (
                <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={400} />
              ) : (
                `** Suggested duration for completion of this course is ${duration?.toString()}`
              )}
            </p>
          </div>

          <div className={`${style.more_info}`}>
            <Info name="Prerequisites" data={prequisites?.join(', ')} />
            <Info name="Good for" data={goodFor?.join(', ')} />
            <Info name="Must for" data={mustFor?.join(', ')} />
          </div>
        </div>

        <div className={`${style.actionIcons}`}>
          {/* <div>
            <img src="/images/plus.png" />
            Share
          </div> */}
          {/* <div>
            <img src="/images/plus.png" />
            Feedback
          </div> */}
          {/* <div>
            <img src="/images/plus.png" />
            Enquire
          </div> */}
          {courseAssignData?.isCourseAssigned && <div>Preview</div>}
        </div>
      </div>

      <PopUp
        popUpState={[isAssignPopUpOpen, setIsAssignPopUpOpen]}
        size="small"
        positionLeft="50%"
        submitBtn={{
          handleClick: () => {
            setCourseAssignData({ ...courseAssignData, isCourseAssigned: true });
            setIsAssignPopUpOpen(false);
          }
        }}>
        <div className={`${style.assignCoursePopUp}`}>
          <section>
            <label htmlFor="endDate">Exam End Date:</label>
            <InputDatePicker
              selectedDate={courseAssignData?.endDate}
              changeHandler={(date) => setCourseAssignData({ ...courseAssignData, endDate: date })}
            />
          </section>

          <LabeledRadioCheckbox
            type="checkbox"
            label="Is Mandatory"
            name="isMandatory"
            isChecked={courseAssignData?.isMandatory}
            changeHandler={(e) =>
              setCourseAssignData({ ...courseAssignData, isMandatory: e.target.checked })
            }
          />
        </div>
      </PopUp>
    </div>
  );
}
