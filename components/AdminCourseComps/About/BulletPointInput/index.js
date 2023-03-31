import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../../adminCourseComps.module.scss';
// import styles from '../../courseTabs.module.scss';
export default function BulletPointInput({
  placeholder,
  name,
  isBullet = true,
  isError,
  isDisabled = false,
  customstyle = {

  }
}) {
  // const { fullCourse, updateCourseMaster } = useContext(courseContext);
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [input, setInput] = useState('');
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  function addTag(newTag) {
    const tagsAdded = [...courseMetaData[name]];
    if (tagsAdded?.some((t) => t?.toLowerCase() === newTag?.toLowerCase())) {
      return setToastMsg({ type: 'danger', message: 'Cannot Add Duplicate value' });
    }
    tagsAdded.push(newTag);

    setCourseMetaData({
      ...courseMetaData,
      [name]: tagsAdded
    });
    setInput('');
  }
  function onKeyDown(e) {
    const { key } = e;
    const trimmedInput = input.trim();
    const tagsAdded = [...courseMetaData[name]];

    if ((key === 'Enter' || key === 'Tab') && trimmedInput.length) {
      e.preventDefault();

      addTag(trimmedInput);
    }

    if (key === 'Backspace' && !input.length && tagsAdded.length && isKeyReleased) {
      const poppedTag = tagsAdded.pop();
      e.preventDefault();

      setCourseMetaData({
        ...courseMetaData,
        [name]: tagsAdded
      });
      setInput(poppedTag);
    }
    setIsKeyReleased(false);
  }

  function deleteTag(index) {
    const tagsAdded = [...courseMetaData[name]];
    const updatedTags = tagsAdded.filter((tag, i) => i !== index);

    setCourseMetaData({
      ...courseMetaData,
      [name]: updatedTags
    });
  }

  return (
    <>
      <div
        className={`w-100 ${styles.bulletPointInputContainer} ${isBullet ? '' : styles.tagsContainer
          } ${customstyle} ${styles.bulletPoint}`}>
        {/* <ul> */}
        {courseMetaData[name]?.map((tag, index) => (
          <span key={index} className={`w-100 ${isBullet ? styles.bullets : styles.tags}`}>
            {tag}
            {!isDisabled && <button onClick={() => deleteTag(index)}>x</button>}
          </span>
        ))}
        {/* </ul> */}
        <input
          name={name}
          value={input}
          disabled={isDisabled}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          onKeyUp={() => setIsKeyReleased(true)}
          onBlur={(e) => {
            const newTag = e?.target?.value;
            if (newTag?.length) addTag(newTag);
          }}
          maxLength={isBullet ? null : 60}
          className={isError ? 'error' : ''}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </>
  );
}
