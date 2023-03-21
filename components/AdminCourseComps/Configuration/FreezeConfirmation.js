// components\Tabs\CourseConfiguration\FreezeConfirmation.js

import { UPDATE_COURSE_DATA } from '@/api/Mutations';
import {
  GET_COURSE_MODULES,
  GET_COURSE_TOPICS,
  GET_COURSE_TOPICS_CONTENT_META_BY_COURSE_ID,
  GET_TOPIC_EXAMS_BY_COURSE_ID
} from '@/api/Queries';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { COURSE_TOPIC_TYPES } from '@/helper/constants.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { CourseCurrentStateAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import styles from '../adminCourseComps.module.scss';

let timer = null;
export default function FreezeConfirmation({ closePopUp = () => {} }) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [courseCurrentState, setCourseCurrentState] = useRecoilState(CourseCurrentStateAtom);
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);

  const [isLevelDataAdded, setIsLevelDataAdded] = useState(null);
  const [isLangDataAdded, setIsLangDataAdded] = useState(null);
  const [isModuleDataValid, setIsModuleDataValid] = useState(null);
  const [fakeLoaderForUx, setFakeLoaderForUx] = useState(null);
  const [msgObj, setMsgObj] = useState({ levelMsg: null, langMsg: null, moduleDataMsg: null });

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => setFakeLoaderForUx(false), 500);

    return () => clearTimeout(timer);
  }, []);
  const courseMasterValidation =
    !!courseMetaData?.name?.length &&
    !!courseMetaData?.category?.length &&
    !!courseMetaData?.subCategory?.length &&
    !!courseMetaData?.expertiseLevel?.length &&
    !!courseMetaData?.owner?.length &&
    !!courseMetaData?.publisher?.length &&
    !!courseMetaData?.lspId?.length &&
    !!courseMetaData?.language?.length;

  const courseDetailsValidation =
    !!courseMetaData?.subCategories?.length &&
    +courseMetaData?.expectedCompletion > 0 &&
    !!courseMetaData.previewVideo &&
    !!courseMetaData.tileImage &&
    !!courseMetaData.image &&
    !!courseMetaData?.summary?.length;

  const courseAboutValidation =
    !!courseMetaData?.outcomes?.length &&
    !!courseMetaData?.benefits?.length &&
    !!courseMetaData?.description?.length &&
    !!courseMetaData?.prequisites?.length &&
    !!courseMetaData?.goodFor?.length &&
    !!courseMetaData?.mustFor?.length &&
    !!courseMetaData?.relatedSkills?.length;

  useMemo(() => {
    loadAndValidateTopicData();
  }, []);

  async function loadAndValidateTopicData() {
    const moduleRes = loadQueryDataAsync(GET_COURSE_MODULES, { course_id: courseMetaData?.id });
    // const chapterRes = loadQueryDataAsync(GET_COURSE_CHAPTERS, { course_id: fullCourse?.id });
    const topicRes = loadQueryDataAsync(GET_COURSE_TOPICS, { course_id: courseMetaData?.id });
    const topicContentRes = loadQueryDataAsync(GET_COURSE_TOPICS_CONTENT_META_BY_COURSE_ID, {
      course_id: courseMetaData?.id
    });
    const topicExamRes = loadQueryDataAsync(GET_TOPIC_EXAMS_BY_COURSE_ID, {
      course_id: courseMetaData?.id
    });

    const allLanguages = structuredClone([...(courseMetaData?.language || [])]);
    const expertiseLevel = structuredClone(courseMetaData?.expertiseLevel?.split(',') || []);

    const allModules = sortArrByKeyInOrder((await moduleRes)?.getCourseModules || []);
    if (!allModules?.length) {
      setIsLangDataAdded(false);
      setIsLevelDataAdded(false);
      setIsModuleDataValid(false);
      setMsgObj({ ...msgObj, moduleDataMsg: 'No Modules Added!' });
      return;
    }

    const _msgObj = structuredClone(msgObj);
    // check for all module added for selected levels
    allModules?.some((mod) => {
      const index = expertiseLevel?.findIndex((level) => level === mod?.level);
      if (index !== -1) expertiseLevel?.splice(index, 1);

      return expertiseLevel?.length === 0;
    });
    if (expertiseLevel?.length)
      _msgObj.levelMsg = `Module with Expertise ${expertiseLevel} missing`;
    setIsLevelDataAdded(!expertiseLevel?.length);

    // const allChapters = structuredClone((await chapterRes)?.getCourseChapters || []);
    const allTopics = structuredClone((await topicRes)?.getTopics || []);
    if (!allTopics?.length) {
      setIsLangDataAdded(false);
      setIsModuleDataValid(false);
      setMsgObj({ ...msgObj, moduleDataMsg: 'No Topics Added!' });
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
      const currentTopicLocation = getTopicLocation(allModules, allTopics, topic);

      // checks for topic content
      if (topic?.type === COURSE_TOPIC_TYPES.content && isLangDataComplete) {
        // get all topic content of the current topic
        const _topicContent =
          allTopicContent?.filter((tc) => tc?.topicId === topic?.id && !!tc.contentUrl) || [];
        _topic.contentData = _topicContent;

        // data is not complete if there is no topic content
        if (_topicContent?.length === 0) {
          _msgObj.moduleDataMsg = `No Content Added for ${currentTopicLocation}`;
          isModuleDataComplete = false;
        }

        if (_topicContent?.length) {
          // check if all selected lang have been used
          const selectedLangs = structuredClone(allLanguages || []);
          _topicContent?.forEach((tc) => {
            const index = selectedLangs?.findIndex((lang) => lang === tc?.language);
            if (index !== -1) return selectedLangs?.splice(index, 1);
          });

          isLangDataComplete = selectedLangs?.length === 0;
        } else {
          isLangDataComplete = false;
        }

        if (!isLangDataComplete) _msgObj.langMsg = `Language missing for ${currentTopicLocation}`;
      }

      if (topic?.type === COURSE_TOPIC_TYPES.assessment) {
        const topicExam = allTopicExams?.filter((topicExam) => topicExam?.topicId === topic?.id);

        _topic.contentData = topicExam;
        if (!topicExam?.length) {
          _msgObj.moduleDataMsg = `No Exam Added for ${currentTopicLocation}`;
          isModuleDataComplete = false;
        }
      }

      return _topic;
    });
    setIsLangDataAdded(isLangDataComplete);

    const isDataValid = [];
    allModules?.some((mod) => {
      if (!isModuleDataComplete) {
        isDataValid.push(false);
        return false;
      }

      let _isDataValid = true;

      const topics = topicData?.filter((topic) => topic?.moduleId === mod?.id);
      mod.topicData = topics;
      if (topics?.length === 0) _isDataValid = false;
      console.log(_isDataValid, topics, topicData);

      if (_isDataValid) _isDataValid = topics?.every((t) => t?.contentData?.length);

      isDataValid.push(_isDataValid);
      return !_isDataValid;
    });

    setMsgObj(_msgObj);
    setIsModuleDataValid(isDataValid?.every((item) => item));
  }

  function getTopicLocation(allSequenceSortedModules = [], allTopics = [], topic = {}) {
    const modIndex = allSequenceSortedModules?.findIndex((mod) => mod?.id === topic?.moduleId);
    if (modIndex < 0) return null;

    const allSequenceSortedTopicOfMod = sortArrByKeyInOrder(
      allTopics?.filter((top) => top?.moduleId === allSequenceSortedModules?.[modIndex]?.id)
    );
    const topIndex = allSequenceSortedTopicOfMod?.findIndex((top) => top?.id === topic?.id);
    if (topIndex < 0) return null;

    return `M${modIndex + 1}T${topIndex + 1}`;
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
              label={
                <>
                  Modules for each selected Expertise Level
                  <span className={`${styles.failureReason}`}>
                    {!!msgObj?.levelMsg && ` (${msgObj?.levelMsg})`}
                  </span>
                </>
              }
              isChecked={isLevelDataAdded}
              isDisabled={true}
              isLoading={isLevelDataAdded === null}
            />

            <LabeledRadioCheckbox
              type="checkbox"
              label={
                <>
                  Topic Content added for each selected Language
                  <span className={`${styles.failureReason}`}>
                    {!!msgObj?.langMsg && ` (${msgObj?.langMsg})`}
                  </span>
                </>
              }
              isChecked={isLangDataAdded}
              isDisabled={true}
              isLoading={isLangDataAdded === null}
            />

            <LabeledRadioCheckbox
              type="checkbox"
              label={
                <>
                  All Module should have complete topic data
                  <span className={`${styles.failureReason}`}>
                    {!!msgObj?.moduleDataMsg && ` (${msgObj?.moduleDataMsg})`}
                  </span>
                </>
              }
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
          handleClickLeft: (e) => {
            const { duration, ..._courseData } = courseMetaData;
            const sendData = sanitizeFormData({ ..._courseData, qaRequired: true });

            e.currentTarget.disabled = true;
            mutateData(UPDATE_COURSE_DATA, sendData)
              .then(() => setCourseMetaData({ ...courseMetaData, qaRequired: true }))
              .catch((err) => setToastMessage('Course Freeze Error!'))
              .finally(() => closePopUp());
          },
          textRight: 'Cancel',
          handleClickRight: closePopUp
        }}
      />
    </>
  );
}
