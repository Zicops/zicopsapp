import PopUp from '@/components/common/PopUp';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { loadAndCacheDataAsync, loadQueryDataAsync } from '@/helper/api.helper';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { PopUpStatesAtomFamily } from '@/state/atoms/popUp.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GET_CATS_MAIN, queryClient } from '../../../API/Queries';
import { getPageSizeBasedOnScreen, isWordIncluded } from '../../../helper/utils.helper';
import ZicopsTable from '../../common/ZicopsTable';
import CourseHead from '../../CourseHead';
import AddCatSubCat from './AddCatSubCat';

function ZicopsCategoryList() {
  const [catData, setCatData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const userOrg = useRecoilValue(UsersOrganizationAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addCatSubCat'));

  // if (_lspId !== zicopsLsp) {
  //   const { data, loading } = loadQueryDataAsync(GET_CATS_MAIN, { lsp_ids: [zicopsLsp] });
  //   zicopsLspData = data;
  //   zicopsLspDataLoading = loading;
  // }
  // const {
  //   data: currentLspData,
  //   loading: currentLspDataLoading,
  //   refetch
  // } = useQuery(GET_CATS_MAIN, { variables: { lsp_ids: [_lspId] } });

  const _lspId = userOrg?.lsp_id;

  useEffect(() => {
    loadCategories();
  }, [_lspId]);

  async function loadCategories() {
    if (!_lspId) return;
    setIsLoading(true);
    const zicopsLsp = COMMON_LSPS.zicops;

    const loadDataFunction = isDev ? loadAndCacheDataAsync : loadQueryDataAsync;
    const zicopsLspData =
      zicopsLsp !== _lspId ? await loadDataFunction(GET_CATS_MAIN, { lsp_ids: [zicopsLsp] }) : {};
    const currentLspData = await loadDataFunction(GET_CATS_MAIN, { lsp_ids: [_lspId] });

    const data = { allCatMain: [] };

    const updatedCatList =
      currentLspData?.allCatMain?.map((cat) => ({ ...cat, LspId: _lspId })) || [];

    data.allCatMain.push(...updatedCatList);
    data.allCatMain.push(...(zicopsLspData?.allCatMain || []));

    setCatData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (popUpState) return;
    loadCategories();
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
            {params?.row?.LspId === _lspId && (
              <button
                onClick={() => udpatePopUpState(params?.row)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  outline: '0',
                  border: '0'
                }}>
                <img src="/images/svg/edit-box-line.svg" width={20}></img>
              </button>
            )}
            {/* <DeleteBtn
              id={params?.id}
              resKey="deleteCatMain"
              mutation={DELETE_CAT_MAIN}
              onDelete={() => refetch()}
            /> */}
          </>
        );
      }
    }
  ];
  let categories = [];

  if (catData?.allCatMain?.length)
    structuredClone(catData?.allCatMain || {})
      ?.sort((c1, c2) => c2?.CreatedAt - c1?.CreatedAt)
      ?.map((val, index) => categories.push({ index: index + 1, catName: val?.Name, ...val }));

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={categories?.filter((cat) => isWordIncluded(cat?.catName, searchQuery))}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="70vh"
        loading={isLoading}
        showCustomSearch={true}
        searchProps={{ handleSearch: (val) => setSearchQuery(val), delayMS: 0 }}
      />
    </>
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
          title={popUpState?.id ? `Update Category` : `Add New Category`}
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
            // height: calc(60vh + 100px);
            min-height: 70vh;
            max-height: 80vh;
            box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
};

export default ZicopsCatsList;
