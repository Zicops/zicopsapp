// components\Tabs\CourseConfiguration\FreezeConfirmation.js

import { UPDATE_COURSE } from '@/api/Mutations';
import {
  GET_COURSE_CHAPTERS,
  GET_COURSE_MODULES,
  GET_COURSE_TOPICS,
  GET_COURSE_TOPICS_CONTENT_META_BY_COURSE_ID,
  GET_TOPIC_EXAMS,
  GET_TOPIC_EXAMS_BY_COURSE_ID
} from '@/api/Queries';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_TOPIC_TYPES } from '@/helper/constants.helper';
import { FullCourseDataAtom, getFullCourseDataObj } from '@/state/atoms/course.atoms';
import { courseContext } from '@/state/contexts/CourseContext';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../courseTabs.module.scss';
import { IsCourseSavedAtom } from '../Logic/tabs.helper';

let timer = null;
export default function FreezeConfirmation({ closePopUp = () => {} }) {
  const [updateCourse] = useMutation(UPDATE_COURSE);

  const { fullCourse, updateCourseMaster } = useContext(courseContext);

  const [fullCourseData, setFullCourseData] = useRecoilState(FullCourseDataAtom);
  const [isCourseSaved, setIsCourseSaved] = useRecoilState(IsCourseSavedAtom);

  const [isLevelDataAdded, setIsLevelDataAdded] = useState(null);
  const [isLangDataAdded, setIsLangDataAdded] = useState(null);
  const [isModuleDataValid, setIsModuleDataValid] = useState(null);
  const [fakeLoaderForUx, setFakeLoaderForUx] = useState(null);

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => setFakeLoaderForUx(false), 500);

    return () => clearTimeout(timer);
  }, []);

  const courseMasterValidation =
    !!fullCourseData?.name &&
    !!fullCourseData?.category?.length &&
    !!fullCourseData?.sub_category?.length &&
    !!fullCourseData?.owner?.length &&
    !!fullCourseData?.publisher?.length &&
    !!+fullCourseData?.language?.length;

  const courseDetailsValidation =
    !!fullCourseData?.sub_categories?.length &&
    !!fullCourseData?.expertise_level?.length &&
    +fullCourse?.expected_completion > 0 &&
    !!fullCourseData.previewVideo &&
    !!fullCourseData.tileImage &&
    !!fullCourseData.image &&
    !!fullCourseData?.summary?.length;

  const courseAboutValidation =
    !!fullCourseData?.outcomes?.length &&
    !!fullCourseData?.benefits?.length &&
    !!fullCourseData?.description?.length &&
    !!fullCourseData?.prequisites?.length &&
    !!+fullCourseData?.goodFor?.length &&
    !!+fullCourseData?.mustFor?.length &&
    !!+fullCourseData?.related_skills?.length;

  useMemo(() => {
    loadAndValidateTopicData();
  }, []);

  async function loadAndValidateTopicData() {
    const moduleRes = loadQueryDataAsync(GET_COURSE_MODULES, { course_id: fullCourse?.id });
    // const chapterRes = loadQueryDataAsync(GET_COURSE_CHAPTERS, { course_id: fullCourse?.id });
    const topicRes = loadQueryDataAsync(GET_COURSE_TOPICS, { course_id: fullCourse?.id });
    const topicContentRes = loadQueryDataAsync(GET_COURSE_TOPICS_CONTENT_META_BY_COURSE_ID, {
      course_id: fullCourse?.id
    });
    const topicExamRes = loadQueryDataAsync(GET_TOPIC_EXAMS_BY_COURSE_ID, {
      course_id: fullCourse?.id
    });

    const allLanguages = structuredClone([...(fullCourseData?.language || [])]);
    const expertiseLevel = structuredClone(fullCourseData?.expertise_level?.split(',') || []);

    const allModules = structuredClone((await moduleRes)?.getCourseModules || []);
    if (!allModules?.length) {
      setIsLangDataAdded(false);
      setIsLevelDataAdded(false);
      setIsModuleDataValid(false);
      return;
    }

    // check for all module added for selected levels
    allModules?.some((mod) => {
      const index = expertiseLevel?.findIndex((level) => level === mod?.level);
      if (index !== -1) expertiseLevel?.splice(index, 1);

      return expertiseLevel?.length === 0;
    });
    setIsLevelDataAdded(!expertiseLevel?.length);

    // const allChapters = structuredClone((await chapterRes)?.getCourseChapters || []);
    const allTopics = structuredClone((await topicRes)?.getTopics || []);
    if (!allTopics?.length) {
      setIsLangDataAdded(false);
      setIsModuleDataValid(false);
      return;
    }

    const allTopicContent = structuredClone(
      (await topicContentRes)?.getTopicContentByCourseId || []
    );
    const allTopicExams = structuredClone((await topicExamRes)?.getTopicExamsByCourseId || []);

    let isModuleDataComplete = true;
    let isLangDataComplete = true;
    // loop through all topic
    const topicData = allTopics?.map((topic) => {
      const _topic = topic;

      // checks for topic content
      if (topic?.type === COURSE_TOPIC_TYPES.content && isLangDataComplete) {
        // get all topic content of the current topic
        const _topicContent =
          allTopicContent?.filter((tc) => tc?.topicId === topic?.id && !!tc.contentUrl) || [];
        _topic.contentData = _topicContent;

        // data is not complete if there is no topic content
        if (_topicContent?.length === 0) isModuleDataComplete = false;

        if (_topicContent?.length) {
          // check if all selected lang have been used
          const selectedLangs = structuredClone(allLanguages || []);
          _topicContent?.forEach((tc) => {
            const index = selectedLangs?.findIndex((lang) => lang === tc?.language);
            if (index !== -1) selectedLangs?.splice(index, 1);
          });

          isLangDataComplete = selectedLangs?.length === 0;
        } else {
          isLangDataComplete = false;
        }
      }

      if (topic?.type === COURSE_TOPIC_TYPES.assessment) {
        const topicExam = allTopicExams?.filter((topicExam) => topicExam?.topicId === topic?.id);

        _topic.contentData = topicExam;
        if (!topicExam?.length) isModuleDataComplete = false;
      }

      return _topic;
    });
    setIsLangDataAdded(isLangDataComplete);

    console.log('isModuleDataComplete', isModuleDataComplete);
    const isDataValid = [];
    allModules?.some((mod) => {
      if (!isModuleDataComplete) {
        isDataValid.push(false);
        return false;
      }

      let _isDataValid = true;
      // no need to check chapter data as a module which has topic and content will have chapter by default
      // const isChapterWise = mod?.isChapter;
      // mod.chapterData = [];

      // if (isChapterWise) {
      //   mod.chapterData = allChapters?.filter((chapter) => chapter?.moduleId === mod?.id);
      //   if (_isDataValid && mod.chapterData?.length === 0) _isDataValid = false;
      // }

      const topics = topicData?.filter((topic) => topic?.moduleId === mod?.id);
      mod.topicData = topics;
      if (topics?.length === 0) _isDataValid = false;
      console.log(_isDataValid, topics, topicData);

      if (_isDataValid) _isDataValid = topics?.every((t) => t?.contentData?.length);

      isDataValid.push(_isDataValid);
      return !_isDataValid;
    });

    setIsModuleDataValid(isDataValid?.every((item) => item));
    // console.log(allModules, allChapters, allTopics, allTopicContent, allLanguages, expertiseLevel);
  }

  return (
    <>
      <ConfirmPopUp
        title={'Are you sure about freezing this course?'}
        message={
          <div className={`${styles.freezeConditions}`}>
            <LabeledRadioCheckbox
              type="checkbox"
              label="Course Master All fields entered"
              isChecked={courseMasterValidation}
              isDisabled={true}
              isLoading={fakeLoaderForUx === null}
            />

            <LabeledRadioCheckbox
              type="checkbox"
              label="Course Details All fields entered"
              isChecked={courseDetailsValidation}
              isDisabled={true}
              isLoading={fakeLoaderForUx === null}
            />

            <LabeledRadioCheckbox
              type="checkbox"
              label="Course About All fields entered"
              isChecked={courseAboutValidation}
              isDisabled={true}
              isLoading={fakeLoaderForUx === null}
            />

            <LabeledRadioCheckbox
              type="checkbox"
              label="Modules for each selected Expertise Level"
              isChecked={isLevelDataAdded}
              isDisabled={true}
              isLoading={isLevelDataAdded === null}
            />

            <LabeledRadioCheckbox
              type="checkbox"
              label="Topic Content added for each selected Language"
              isChecked={isLangDataAdded}
              isDisabled={true}
              isLoading={isLangDataAdded === null}
            />

            <LabeledRadioCheckbox
              type="checkbox"
              label="All Module should have complete topic data"
              isChecked={isModuleDataValid}
              isDisabled={true}
              isLoading={isModuleDataValid === null}
            />
          </div>
        }
        btnObj={{
          textLeft: 'Freeze',
          leftIsDisable:
            !courseMasterValidation ||
            !courseDetailsValidation ||
            !courseAboutValidation ||
            !isLangDataAdded ||
            !isLevelDataAdded ||
            !isModuleDataValid,
          handleClickLeft: () => {
            // updateCourseMaster({
            //   ...fullCourse,
            //   status: e.target.checked ? COURSE_STATUS.reject : COURSE_STATUS.publish
            // });
            const { duration, ..._fullCourse } = fullCourse;
            const sendData = { ..._fullCourse, qa_required: true };
            console.log('var', sendData);

            updateCourse({ variables: sendData })
              .then(() => {
                updateCourseMaster({ ...fullCourse, qa_required: true });
                setFullCourseData(getFullCourseDataObj({ ...fullCourseData, qa_required: true }));
                setIsCourseSaved(true);
                closePopUp();
              })
              .catch((err) => console.log(err));
          },
          textRight: 'Cancel',
          handleClickRight: closePopUp
        }}
      />
    </>
  );
}
