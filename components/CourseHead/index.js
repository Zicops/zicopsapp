import { snakeCaseToTitleCase } from '@/helper/common.helper';
import { COURSE_TYPES, USER_LSP_ROLE } from '@/helper/constants.helper';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRecoilState, useRecoilValue } from 'recoil';
import Sitemap from '../common/AdminHeader/Sitemap';
import PopUp from '../common/PopUp';
import styles from './courseHead.module.scss';

export default function CourseHead({
  title,
  hideCourseTypeDropdown = false,
  hidePlus = false,
  handlePlusClick = null,
  tooltipTitle = ''
}) {
  const [showSitemap, setShowSitemap] = useState(false);
  const [courseType, setCourseType] = useRecoilState(CourseTypeAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);

  const router = useRouter();
  const disabledList = [2];
  if (!isDev) disabledList.push(1);

  const options = Array(COURSE_TYPES?.length)
    .fill(null)
    .map((v, i) => {
      return {
        value: COURSE_TYPES[i],
        label: snakeCaseToTitleCase(COURSE_TYPES[i]),
        isDisabled: disabledList.includes(i)
      };
    });
  // const options = [
  //   { value:  'self-paced', label: 'Self Paced' },
  //   { value: 'classroom', label: 'Classroom' },
  //   { value: 'labs', label: 'Labs' },
  //   { value: 'test-series', label: 'Test' }
  // ];
  const route = router.route;
  function gotoAddcourse() {
    router.push(isDev ? '/admin/course/my-courses/add' : '/admin/courses');
  }

  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

  useEffect(() => {
    localStorage.setItem('courseType', options[0].value);
    setCourseType(options[0].value);
  }, []);

  // console.log(showSitemap);
  return (
    <div className={`${styles.courseHead}`}>
      <div className={`${styles.header}`}>
        <h2>{title}</h2>
        {!hideCourseTypeDropdown && (
          <Select
            instanceId="coursehead_coursetype"
            options={options}
            defaultValue={{ value: 'self-paced', label: 'Self Paced' }}
            onChange={(e) => {
              localStorage.setItem('courseType', e.value);
              setCourseType(e.value);
            }}
            className="zicops_select_container"
            classNamePrefix="zicops_select"
            isSearchable={false}
          />
        )}
      </div>

      <div className={styles.icons}>
        {!hidePlus && !route.includes('admin/courses') && (
          <img
            src="/images/plus_big.png"
            className="rightside_icon"
            alt=""
            onClick={handlePlusClick ? handlePlusClick : gotoAddcourse}
          />
        )}
        <img src="/images/setting_icon.png" className="rightside_icon" alt="" />
        <img
          src="/images/sitemap_icon.png"
          className="rightside_icon"
          alt=""
          style={isVendor ? { cursor: 'not-allowed' } : {}}
          onClick={() => (isVendor ? '' : setShowSitemap(true))}
        />
      </div>

      {/* sitemap pop up */}
      <PopUp
        isFooterVisible={false}
        title="Sitemap"
        popUpState={[showSitemap, setShowSitemap]}
        size="large">
        <Sitemap />
      </PopUp>
    </div>
  );
}
