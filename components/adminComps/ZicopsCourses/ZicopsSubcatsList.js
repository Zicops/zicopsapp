import PopUp from '@/components/common/PopUp';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { PopUpStatesAtomFamily } from '@/state/atoms/popUp.atom';
import { ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { queryClient } from '../../../API/Queries';
import { TableResponsiveRows } from '../../../helper/utils.helper';
import ZicopsTable from '../../common/ZicopsTable';
import CourseHead from '../../CourseHead';
import AddCatSubCat from './AddCatSubCat';

const columns = [
  {
    field: 'id',
    headerName: 'Index',
    headerClassName: 'course-list-header',
    flex: 1
  },
  {
    field: 'SubCatName',
    headerClassName: 'course-list-header',
    headerName: 'SubCategory',
    flex: 3
  },
  {
    field: 'CatName',
    headerClassName: 'course-list-header',
    headerName: 'Category',
    flex: 3
  }
];

function ZicopsSubCategoryList() {
  const [pageSize, setPageSize] = useState(6);
  const [data, setData] = useState(null);
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addCatSubCat'));

  useEffect(() => {
    const screenWidth = window.screen.width;
    console.log(screenWidth);
    TableResponsiveRows.forEach((r, i) => {
      if (r.breakpoint <= screenWidth) {
        setPageSize(r.pageSize);
      }
    });
  }, []);

  const { catSubCat, setRefetch } = useHandleCatSubCat();

  useEffect(() => {
    if (popUpState) return;
    setRefetch(true);
  }, [popUpState]);

  useEffect(() => {
    if (!catSubCat?.allSubCat?.length) return;
    const _data = [];
    catSubCat?.allSubCat.map((val, index) =>
      _data.push({
        id: index + 1,
        SubCatName: val?.Name,
        CatName: catSubCat?.subCatGrp[val?.CatId]?.cat?.Name
      })
    );

    setData(_data);
  }, [catSubCat]);

  let latest = [];

  return (
    <ZicopsTable
      columns={columns}
      data={data}
      pageSize={pageSize}
      rowsPerPageOptions={[3]}
      tableHeight="70vh"
      loading={data === null}
    />
  );
}

const ZicopsSubcatsList = () => {
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addCatSubCat'));

  function closePopUp() {
    udpatePopUpState(false);
  }
  return (
    <>
      <div className="content">
        <CourseHead
          title="Zicops Subcategories"
          hideCourseTypeDropdown={true}
          handlePlusClick={() => udpatePopUpState(true)}
        />

        <ApolloProvider client={queryClient}>
          <div className="content-panel">
            <ZicopsSubCategoryList />
          </div>
        </ApolloProvider>

        {/* add cat pop up */}
        <PopUp
          title="Add New Sub Category"
          popUpState={[popUpState, udpatePopUpState]}
          closeBtn={closePopUp}
          isFooterVisible={false}>
          <AddCatSubCat isSubCat={true} closePopUp={closePopUp} />
        </PopUp>
      </div>
      <style jsx>
        {`
          .content {
            background-color: #1a1a1a;
            float: right;
            width: calc(100% - 250px);
            z-index: 1;
            margin-top: 70px;
            height: calc(110vh - 70px);
            padding: 30px 70px;
          }
          .content-panel {
            margin: 30px 10px 10px 10px;
            color: var(--white);
            height: calc(60vh + 100px);
            box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
};

export default ZicopsSubcatsList;
