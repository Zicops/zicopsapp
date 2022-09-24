import Image from 'next/image';
import useSaveCourse from '../../Logic/useSaveCourse';
import { nextBtn } from '../../courseTabs.module.scss';
import { useContext } from 'react';
import { courseContext } from '../../../../state/contexts/CourseContext';
import ToolTip from '@/components/common/ToolTip';

const NextButton = ({ tabIndex, tooltipTitle }) => {
  const courseContextData = useContext(courseContext);
  const { saveCourseData } = useSaveCourse(courseContextData);
  return (
    <div className="row">
      <div className="col_75"></div>
      <div className="col_25"></div>
      <ToolTip title={tooltipTitle}>
        <button type="button" className={nextBtn} onClick={() => saveCourseData(true, tabIndex)}>
          <span>Next</span>
          <Image src="/images/bigarrowright.png" alt="" height={20} width={20} />
        </button>
      </ToolTip>
    </div>
  );
};

export default NextButton;
