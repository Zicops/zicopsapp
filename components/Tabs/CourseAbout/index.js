import { useContext } from 'react';
import { courseContext } from '../../../state/contexts/CourseContext';
import BulletPointInput from './BulletPointInput';
import TagInput from '../../small/TagInput';
import NextButton from '../common/NextButton';
import useHandleTabs from '../Logic/useHandleTabs';
import styles from '../courseTabs.module.scss';
import LabeledTextarea from '../../common/FormComponents/LabeledTextarea';
import { useRecoilState } from 'recoil';
import { courseErrorAtom } from '@/state/atoms/module.atoms';

export default function CourseAbout() {
  const courseContextData = useContext(courseContext);
  const { fullCourse, handleChange, updateCourseMaster } = useHandleTabs(courseContextData);
  const [courseError, setCourseError] = useRecoilState(courseErrorAtom);

  return (
    <div>
      {/* outcomes */}
      <div className={`center-element-with-flex ${styles.marginBottom} ${styles.alignBaseline}`}>
        <label htmlFor="outcomes" className="w-25">
          Learning Objectives/Outcomes:
        </label>
        <div className="w-75">
          <BulletPointInput
            placeholder="Add Learning Objectives/Outcomes and press enter"
            name="outcomes"
            isError={!fullCourse?.outcomes?.length && courseError?.about}
          />
        </div>
      </div>

      {/* benefits */}
      <div className={`center-element-with-flex ${styles.marginBottom} ${styles.alignBaseline}`}>
        <label htmlFor="benefits" className="w-25">
          Program Highlights/Benefits:
        </label>
        <div className="w-75">
          <BulletPointInput
            placeholder="Add Program Highlights/Benefits and press enter"
            name="benefits"
            isError={!fullCourse?.benefits?.length && courseError?.about}
          />
        </div>
      </div>

      {/* description */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label htmlFor="description" className="w-25">
          Course Description:
        </label>
        <LabeledTextarea
          styleClass="w-75"
          isError={!fullCourse?.description?.length && courseError?.about}
          inputOptions={{
            inputName: 'description',
            placeholder: 'Provide description of the course',
            rows: 4,
            value: fullCourse?.description,
            maxLength: 2000
          }}
          changeHandler={handleChange}
        />
      </div>

      {/* prerequisites */}
      <div className={`center-element-with-flex ${styles.marginBottom} ${styles.alignBaseline}`}>
        <label htmlFor="prequisites" className="w-25">
          Pre-requisites:
        </label>
        <div className="w-75">
          <BulletPointInput
            placeholder="Add Pre-requisites and press enter"
            name="prequisites"
            isError={!fullCourse?.prequisites?.length && courseError?.about}
          />
        </div>
      </div>

      {/* good for */}
      <div className={`center-element-with-flex ${styles.marginBottom} ${styles.alignBaseline}`}>
        <label htmlFor="goodFor" className="w-25">
          Good For:
        </label>
        <div className="w-25">
          <BulletPointInput
            placeholder="Add Good For and press enter"
            name="goodFor"
            isError={!fullCourse?.goodFor?.length && courseError?.about}
          />
        </div>

        <label htmlFor="mustFor" className="w-25" style={{ textAlign: 'center' }}>
          Must For:
        </label>
        <div className="w-25">
          <BulletPointInput
            placeholder="Add Must For and press enter"
            name="mustFor"
            isError={!fullCourse?.mustFor?.length && courseError?.about}
          />
        </div>
      </div>

      {/* related skills */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label htmlFor="related_skills" className="w-25">
          Related Skills
        </label>
        <div className="w-75">
          <BulletPointInput
            placeholder="Add Related Skills"
            name="related_skills"
            isBullet={false}
            isError={!fullCourse?.related_skills?.length && courseError?.about}
          />
          {/* <TagInput
            placeholder="Add Related Skills"
            name=""
            course={fullCourse}
            updateCourse={updateCourseMaster}
          /> */}
        </div>
      </div>

      <NextButton tabIndex={3} />
    </div>
  );
}
