import { snakeCaseToTitleCase } from '@/helper/common.helper';
import { COURSE_TYPES } from '@/helper/constants.helper';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { ActiveTourAtom } from '@/state/atoms/productTour.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRecoilState, useRecoilValue } from 'recoil';
import PopUp from '../PopUp';
import ProductTooltip from '../ProductTour/ProductTooltip';
import ToolTip from '../ToolTip';
import styles from './adminHeader.module.scss';
import AdminSubHeader from './AdminSubHeader';
import Sitemap from './Sitemap';

export default function AdminHeader({
  title,
  pageRoute,
  handleClickForPlus,
  isAddShown = false,
  isShowOption = false,
  subHeaderData = null,
  tooltipTitle = '',
  isProductTooltip,
  productTooltipData,
  tourId
}) {
  const [courseType, setCourseType] = useRecoilState(CourseTypeAtom);
  const activeTour = useRecoilValue(ActiveTourAtom);
  const [showSitemap, setShowSitemap] = useState(false);
  const router = useRouter();
  const route = router.route;

  const options = COURSE_TYPES.map((v, i) => {
    return { value: v, label: snakeCaseToTitleCase(v), isDisabled: [1, 2].includes(i) };
  });

  function gotoPageRoute() {
    if (!pageRoute) return;
    router.push(pageRoute);
  }
  useEffect(() => {
    setCourseType(options[0].value);
  }, []);

  return (
    <div>
      <div className={`${styles.courseHead}`}>
        <div className={`${styles.header}`}>
          <h2>{title}</h2>
          {isShowOption && (
            <Select
              instanceId="coursehead_coursetype"
              options={options}
              defaultValue={{ value: courseType, label: courseType }}
              onChange={(e) => setCourseType(e.value)}
              className="zicops_select_container"
              classNamePrefix="zicops_select"
              isSearchable={false}
            />
          )}
        </div>

        <div className={styles.icons}>
          {/* TODO: remove first condition */}
          {!route.includes('admin/courses') && isAddShown && (
            <span>
              {isProductTooltip ? (
                <ProductTooltip
                  title={productTooltipData.title}
                  buttonName={productTooltipData?.btnName}
                  tooltipIsOpen={activeTour?.id === tourId}
                  placement="left-start">
                  <img
                    src="/images/plus_big.png"
                    className="rightside_icon"
                    alt=""
                    onClick={pageRoute ? gotoPageRoute : handleClickForPlus}
                  />
                </ProductTooltip>
              ) : (
                <ToolTip title={tooltipTitle} placement="left">
                  <img
                    src="/images/plus_big.png"
                    className="rightside_icon"
                    alt=""
                    onClick={pageRoute ? gotoPageRoute : handleClickForPlus}
                  />
                </ToolTip>
              )}
              {/* <CustomTooltip info="create new question bank" /> */}
            </span>
          )}
          <ToolTip title="Manage Configurations" placement="bottom">
            <img src="/images/setting_icon.png" className="rightside_icon" alt="" />
          </ToolTip>
          <ToolTip title="View Sitemap" placement="right">
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
