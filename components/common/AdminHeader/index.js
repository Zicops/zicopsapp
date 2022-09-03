import React, { useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';
import styles from './adminHeader.module.scss';
import PopUp from '../PopUp';
import Sitemap from './Sitemap';
import AdminSubHeader from './AdminSubHeader';
import ToolTip from '../ToolTip';

export default function AdminHeader({
  title,
  pageRoute,
  handleClickForPlus,
  isAddShown = false,
  isShowOption = false,
  subHeaderData = null
}) {
  const [showSitemap, setShowSitemap] = useState(false);
  const router = useRouter();
  const route = router.route;

  const options = [
    { value: 'self-paced', label: 'Self Paced' },
    { value: 'classroom', label: 'Classroom' },
    { value: 'labs', label: 'Labs' },
    { value: 'test', label: 'Test' }
  ];

  function gotoPageRoute() {
    if (!pageRoute) return;
    router.push(pageRoute);
  }
  return (
    <div>
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
            <ToolTip title="Create New Question Bank" placement="left">
              <img
                src="/images/plus_big.png"
                className="rightside_icon"
                alt=""
                onClick={pageRoute ? gotoPageRoute : handleClickForPlus}
              />
            </ToolTip>
          )}
          <ToolTip title="Settings" placement="bottom">
            <img src="/images/setting_icon.png" className="rightside_icon" alt="" />
          </ToolTip>
          <ToolTip title="Sitemap" placement="right">
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

      {subHeaderData && <AdminSubHeader {...subHeaderData} />}
    </div>
  );
}
