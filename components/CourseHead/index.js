import React from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';
import styles from './courseHead.module.scss';

export default function CourseHead({ title }) {
  const router = useRouter();
  const options = [
    { value: 'self-paced', label: 'Self Paced' },
    { value: 'classroom', label: 'Classroom' },
    { value: 'labs', label: 'Labs' },
    { value: 'test', label: 'Test' }
  ];
  const route = router.route;
  function gotoAddcourse() {
    router.push('/admin/courses');
  }
  return (
    <div className={`${styles.courseHead}`}>
      <div className={`${styles.header}`}>
        <h2>{title}</h2>
        <Select
          instanceId="coursehead_coursetype"
          options={options}
          defaultValue={{ value: 'self-paced', label: 'Self Paced' }}
          className="zicops_select_container"
          classNamePrefix="zicops_select"
          isSearchable={false}
        />
      </div>

      <div className={styles.icons}>
        {!route.includes('admin/courses') && (
          <img
            src="/images/plus_big.png"
            className="rightside_icon"
            alt=""
            onClick={gotoAddcourse}
          />
        )}
        <img src="/images/setting_icon.png" className="rightside_icon" alt="" />
        <img src="/images/sitemap_icon.png" className="rightside_icon" alt="" />
      </div>
    </div>
  );
}
