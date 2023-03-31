import { GET_COURSE } from '@/api/Queries';
import AdminCourseTabs from '@/components/AdminCourseComps/AdminCourseTabs';
import CoursePageTitle from '@/components/AdminCourseComps/CoursePageTitle';
import useHandleCourseData from '@/components/AdminCourseComps/Logic/useHandleCourseData';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { courseSidebarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { USER_LSP_ROLE } from '@/helper/constants.helper';
import {
  ClassroomMasterAtom,
  CourseCurrentStateAtom,
  CourseMetaDataAtom, getCourseCurrentStateObj,
  getCourseMetaDataObj
} from '@/state/atoms/courses.atom';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function EditCoursePage() {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  const [courseCurrentState, setCourseCurrentState] = useRecoilState(CourseCurrentStateAtom);
  const [classroomMaster, setClassroomMaster] = useRecoilState(ClassroomMasterAtom);
  const courseType = useRecoilValue(CourseTypeAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  const {getViltData} = useHandleCourseData();

  const router = useRouter();
  const courseId = router?.query?.courseId;

  const isVendor = userOrgData?.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);


  // load course data.
  useEffect(() => {
    if (!courseId) return;

    //load vilt data
    getViltData(courseId);
    if (courseMetaData?.id !== courseId) {
      loadAndCacheDataAsync(GET_COURSE, { course_id: [courseId] })
        .then((res) => {
          const _courseDataRes = res?.getCourse?.[0];
          setCourseMetaData(
            getCourseMetaDataObj({
              ..._courseDataRes,
              isActive: _courseDataRes?.is_active,
              isDisplay: _courseDataRes?.is_display,
              subCategory: _courseDataRes?.sub_category,
              subCategories: _courseDataRes?.sub_categories,
              expertiseLevel: _courseDataRes?.expertise_level,
              expectedCompletion: _courseDataRes?.expected_completion,
              relatedSkills: _courseDataRes?.related_skills,
              publishDate: _courseDataRes?.publish_date,
              expiryDate: _courseDataRes?.expiry_date,
              qaRequired: _courseDataRes?.qa_required,

              createdAt: _courseDataRes?.created_at,
              updatedAt: _courseDataRes?.updated_at,
              createdBy: _courseDataRes?.created_by,
              updatedBy: _courseDataRes?.updated_by
            })
          );
          const isCourseDisabled = !!_courseDataRes?.qa_required;
          setCourseCurrentState(
            getCourseCurrentStateObj({ isSaved: true, isDisabled: isCourseDisabled })
          );
        })
        .catch((err) => {
          console.log(`Course Data Load Error: `, err);
          setToastMsg({ type: 'danger', message: 'Course Data Load Error' });
        });

      // if (courseType !== COURSE_TYPES.classroom) return;
      
    }
  }, [courseId]);

  return (
    <>
      <Sidebar sidebarItemsArr={courseSidebarData} />

      <MainBody>
        <AdminHeader title={<CoursePageTitle />} />

        <MainBodyBox>
          <AdminCourseTabs />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
