import CourseHead from '../../CourseHead';
import ZicopsTable from '../../common/ZicopsTable';

import { queryClient, GET_SUB_CATS } from '../../../API/Queries';
import { ApolloProvider, useQuery } from '@apollo/client';

const columns = [
  {
    field: 'id',
    headerName: 'Index',
    headerClassName: 'course-list-header',
    width: 300
  },
  {
    field: 'SubCatName',
    headerClassName: 'course-list-header',
    headerName: 'SubCategory',
    width: 300
  }
];


function ZicopsSubCategoryList() {


  const { data } = useQuery(GET_SUB_CATS);
  let latest = [];
  if(data)
    data.allSubCategories.map((val, index) => latest.push({ id: index + 1, SubCatName: val }));

  return (
      
        <ZicopsTable
          columns={columns}
          data={latest}
          pageSize={7}
          rowsPerPageOptions={[3]}
          tableHeight='70vh'
        />

  )
}

const ZicopsSubcatsList = () => {
  return (
    <>
      <div className="content">
        <CourseHead title="Zicops Subcategories" />

        <ApolloProvider client={queryClient}>
          <div className="content-panel">
            <ZicopsSubCategoryList />
          </div>
        </ApolloProvider>
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
