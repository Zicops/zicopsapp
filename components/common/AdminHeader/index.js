import React from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';
import styles from './adminHeader.module.scss';

export default function AdminHeader({
  title,
  pageRoute,
  handleClickForPlus,
  isAddShown = false,
  isShowOption = false
}) {
  const router = useRouter();
  const options = [
    { value: 'self-paced', label: 'Self Paced' },
    { value: 'classroom', label: 'Classroom' },
    { value: 'labs', label: 'Labs' },
    { value: 'test', label: 'Test' }
  ];
  const route = router.route;
  function gotoPageRoute() {
    if (!pageRoute) return;
    router.push(pageRoute);
  }
  return (
    <div className={`${styles.courseHead}`}>
      <div className={`${styles.header}`}>
        <h2>{title}</h2>
        {isShowOption && (
          <Select
            instanceId="coursehead_coursetype"
            options={options}
            defaultValue={{ value: 'self-paced', label: 'Self Paced' }}
            className="zicops_select_container"
            classNamePrefix="zicops_select"
            isSearchable={false}
          />
        )}
      </div>

      <div className={styles.icons}>
        {/* TODO: remove first condition */}
        {!route.includes('admin/courses') && isAddShown && (
          <img
            src="/images/plus_big.png"
            className="rightside_icon"
            alt=""
            onClick={pageRoute ? gotoPageRoute : handleClickForPlus}
          />
        )}
        <img src="/images/setting_icon.png" className="rightside_icon" alt="" />
        <img src="/images/sitemap_icon.png" className="rightside_icon" alt="" />
      </div>
    </div>
  );
}
