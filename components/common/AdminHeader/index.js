import React, { useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';
import styles from './adminHeader.module.scss';
import PopUp from '../PopUp';
import Sitemap from './Sitemap';
import AdminSubHeader from './AdminSubHeader';
import ToolTip from '../ToolTip';
import CustomTooltip from '../CustomTooltip';
import ProductTooltip from '../ProductTour/ProductTooltip';
import { ActiveTourAtom } from '@/state/atoms/productTour.atom';
import { useRecoilValue } from 'recoil';

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
  const activeTour = useRecoilValue(ActiveTourAtom);
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

  // let tooltipTitle = ""
  // if(pageRoute==="/admin/exams/my-question-papers/add"){
  //   tooltipTitle="Create new Question Paper"
  // }else if(router?.query?.questionBankId){
  //   tooltipTitle="Add Questions"
  // }else if(pageRoute==="/admin/exams/zicops-question-papers"){
  //   tooltipTitle="Create new Question Paper"
  // }

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
