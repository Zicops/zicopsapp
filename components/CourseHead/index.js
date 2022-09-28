import { snakeCaseToTitleCase } from '@/helper/common.helper';
import { COURSE_TYPES } from '@/helper/constants.helper';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import Sitemap from '../common/AdminHeader/Sitemap';
import PopUp from '../common/PopUp';
import styles from './courseHead.module.scss';

export default function CourseHead({ title, hideCourseTypeDropdown = false, hidePlus = false }) {
  const [showSitemap, setShowSitemap] = useState(false);
  const [courseType, setCourseType] = useRecoilState(CourseTypeAtom);

  const router = useRouter();
  const options = Array(COURSE_TYPES?.length)
    .fill(null)
    .map((v, i) => {
      return {
        value: COURSE_TYPES[i],
        label: snakeCaseToTitleCase(COURSE_TYPES[i]),
        isDisabled: [1, 2].includes(i)
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
    router.push('/admin/courses');
  }

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
            onClick={gotoAddcourse}
          />
        )}
        <img src="/images/setting_icon.png" className="rightside_icon" alt="" />
        <img
          src="/images/sitemap_icon.png"
          className="rightside_icon"
          alt=""
          onClick={() => setShowSitemap(true)}
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
