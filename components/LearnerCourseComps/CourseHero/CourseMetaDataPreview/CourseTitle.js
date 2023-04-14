import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { FolderIcon, PlusIcon } from '@/components/common/ZicopsIcons';
import { parseJson } from '@/helper/utils.helper';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { PopUpStatesAtomFamily } from '@/state/atoms/popUp.atom';
import { isWordMatched } from '@/utils/string.utils';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  UserCourseMapDataAtom,
  getUserCourseMapDataObj,
} from '../../atoms/learnerCourseComps.atom';
import AssignCourse from '../../common/AssignCourse';
import { unassignSelfAssignedCourse } from '../../common/AssignCourse/Logic/assignCourse.helper';
import ZicopsSkeleton from '../../common/ZicopsSkeleton';
import styles from '../../learnerCourseComps.module.scss';

export default function CourseTitle({ isLoading = false, isAssigned = false }) {
  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const [userCourseMapData, setUserCourseMapData] = useRecoilState(UserCourseMapDataAtom);
  const [isAssignPopUpOpen, setIsAssignPopUpOpen] = useRecoilState(
    PopUpStatesAtomFamily('CourseAssignPopUp'),
  );

  const [isConfirmBoxShown, setIsConfirmBoxShown] = useState(false);

  const isSelfAssigned =
    isAssigned && isWordMatched(parseJson(userCourseMapData?.addedBy).role, 'self');

  return (
    <section className={`${styles.courseTitle}`}>
      <h1>
        {isLoading ? (
          <ZicopsSkeleton variant="rounded" height={40} width={500} />
        ) : (
          courseMeta?.name || 'N/A'
        )}
      </h1>

      <span className={`${styles.assignBtn}`}>
        {isAssigned ? (
          <FolderIcon color={styles.primary} />
        ) : (
          <span onClick={() => setIsAssignPopUpOpen(true)}>
            <PlusIcon color={styles.primary} />
          </span>
        )}
      </span>

      {isSelfAssigned && (
        <span className={`${styles.assignBtn}`} onClick={() => setIsConfirmBoxShown(true)}>
          X
        </span>
      )}

      <AssignCourse
        isAssignPopUpOpen={isAssignPopUpOpen}
        setIsAssignPopUpOpen={setIsAssignPopUpOpen}
        courseId={courseMeta?.id}
        courseType={courseMeta?.type}
        lspId={courseMeta?.lspId}
        suggestedCompletionDays={courseMeta?.expectedCompletion}
        courseName={courseMeta?.name}
      />

      {isConfirmBoxShown && (
        <ConfirmPopUp
          title={'Are you sure you want to remove this course?'}
          btnObj={{
            handleClickLeft: async (e) => {
              e.target.disabled = true;

              const res = await unassignSelfAssignedCourse(userCourseMapData);
              setUserCourseMapData(
                getUserCourseMapDataObj({
                  ...res,
                  userCourseId: res?.user_course_id,
                  userId: res?.user_id,
                  userLspId: res?.user_lsp_id,
                  courseId: res?.course_id,
                  courseType: res?.course_type,
                  addedBy: res?.added_by,
                  isMandatory: res?.is_mandatory,
                  endDate: res?.end_date,
                  courseStatus: res?.course_status,

                  createdAt: res?.created_at,
                  updatedAt: res?.updated_at,
                  createdBy: res?.created_by,
                  updatedBy: res?.updated_by,
                }),
              );
              setIsConfirmBoxShown(false);
            },
            handleClickRight: () => setIsConfirmBoxShown(false),
          }}
        />
      )}
    </section>
  );
}
