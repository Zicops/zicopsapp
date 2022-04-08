import React from 'react';
import Select from 'react-select';
import styles from './courseHead.module.scss';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function CourseHead({ title }) {
  const options = [
    { value: 'self-paced', label: 'Self Paced' },
    { value: 'classroom', label: 'Classroom' },
    { value: 'labs', label: 'Labs' },
    { value: 'test', label: 'Test' }
  ];

  const router = useRouter();

  useEffect(() => {
    const { query: courseId } = router;
    console.log(router, router.query);
  }, []);

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
        />
      </div>

      <div className={styles.icons}>
        <img src="/images/setting_icon.png" className="rightside_icon" alt="" />
        <img src="/images/sitemap_icon.png" className="rightside_icon" alt="" />
      </div>
    </div>
  );
}
