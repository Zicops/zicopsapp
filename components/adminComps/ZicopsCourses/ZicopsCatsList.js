import { DELETE_CAT_MAIN } from '@/api/Mutations';
import DeleteBtn from '@/components/common/DeleteBtn';
import PopUp from '@/components/common/PopUp';
import { LEARNING_SPACE_ID } from '@/helper/constants.helper';
import { PopUpStatesAtomFamily } from '@/state/atoms/popUp.atom';
import { ApolloProvider, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { useRecoilState } from 'recoil';
import { GET_CATS_MAIN, queryClient } from '../../../API/Queries';
import { TableResponsiveRows } from '../../../helper/utils.helper';
import ZicopsTable from '../../common/ZicopsTable';
import CourseHead from '../../CourseHead';
import AddCatSubCat from './AddCatSubCat';

function ZicopsCategoryList() {
  const [pageSize, setPageSize] = useState(6);
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

  const { data, loading, refetch } = useQuery(GET_CATS_MAIN, { variables: [LEARNING_SPACE_ID] });

  useEffect(() => {
    if (popUpState) return;
    refetch();
  }, [popUpState]);

  const columns = [
    {
      field: 'index',
      headerName: 'Index',
      headerClassName: 'course-list-header',
      flex: 1
    },
    {
      field: 'catName',
      headerClassName: 'course-list-header',
      headerName: 'Category',
      flex: 3
    },
    {
      field: '',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <DeleteBtn
              id={params?.id}
              resKey="deleteCatMain"
              mutation={DELETE_CAT_MAIN}
              onDelete={() => refetch()}
            />
          </>
        );
      }
    }
  ];
  let categories = [];

  if (data)
    structuredClone(data?.allCatMain)
      ?.sort((c1, c2) => c1?.CreatedAt - c2?.CreatedAt)
      ?.map((val, index) => categories.push({ index: index + 1, catName: val?.Name, ...val }));

  return (
    <ZicopsTable
      columns={columns}
      data={categories}
      pageSize={pageSize}
      rowsPerPageOptions={[3]}
      tableHeight="70vh"
      loading={loading}
    />
  );
}

const ZicopsCatsList = () => {
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addCatSubCat'));

  function closePopUp() {
    udpatePopUpState(false);
  }
  return (
    <>
      <div className="content">
        <CourseHead
          title="Zicops Categories"
          hideCourseTypeDropdown={true}
          handlePlusClick={() => udpatePopUpState(true)}
          tooltipTitle={ADMIN_COURSES.categories.addBtn}
        />

        <ApolloProvider client={queryClient}>
          {/* <CourseContextProvider> */}

          <div className="content-panel">
            <ZicopsCategoryList />
          </div>

          {/* </CourseContextProvider> */}
        </ApolloProvider>

        {/* add cat pop up */}
        <PopUp
          title="Add New Category"
          popUpState={[popUpState, udpatePopUpState]}
          closeBtn={closePopUp}
          isFooterVisible={false}>
          <AddCatSubCat closePopUp={closePopUp} />
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

export default ZicopsCatsList;
