import { snakeCaseToTitleCase } from '@/helper/common.helper';
import { COURSE_TYPES } from '@/helper/constants.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import Sitemap from '../common/AdminHeader/Sitemap';
import PopUp from '../common/PopUp';
import ToolTip from '../common/ToolTip';
import styles from './courseHead.module.scss';

export default function CourseHead({ title, tooltipTitle = '' }) {
  const [showSitemap, setShowSitemap] = useState(false);

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
  }, []);

  // console.log(showSitemap);
  return (
    <div className={`${styles.courseHead}`}>
      <div className={`${styles.header}`}>
        <h2>{title}</h2>
        <Select
          instanceId="coursehead_coursetype"
          options={options}
          defaultValue={{ value: 'self-paced', label: 'Self Paced' }}
          onChange={(e) => localStorage.setItem('courseType', e.value)}
          className="zicops_select_container"
          classNamePrefix="zicops_select"
          isSearchable={false}
        />
      </div>

      <div className={styles.icons}>
        {!route.includes('admin/courses') && (
          <ToolTip title={tooltipTitle}>
            <img
              src="/images/plus_big.png"
              className="rightside_icon"
              alt=""
              onClick={gotoAddcourse}
            />
          </ToolTip>
        )}
        <ToolTip title="View Settings" placement="bottom">
          <img src="/images/setting_icon.png" className="rightside_icon" alt="" />
        </ToolTip>
        <ToolTip title="View Sitemap" placement="bottom">
          <img
            src="/images/sitemap_icon.png"
            className="rightside_icon"
            alt=""
            onClick={() => setShowSitemap(true)}
          />
        </ToolTip>
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
