import { ApolloProvider, useQuery } from '@apollo/client';
import { GET_CATS, queryClient } from '../../../API/Queries';
import CourseHead from '../../CourseHead';
import ZicopsTable from '../../common/ZicopsTable';
import { TableResponsiveRows } from '../../../helper/utils.helper';
import { useEffect, useState } from 'react';

const columns = [
  {
    field: 'id',
    headerName: 'Index',
    headerClassName: 'course-list-header',
    flex: 1
  },
  {
    field: 'catName',
    headerClassName: 'course-list-header',
    headerName: 'Category',
    flex: 3
  }
];

function ZicopsCategoryList() {
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    const screenWidth = window.screen.width;
    console.log(screenWidth);
    TableResponsiveRows.forEach((r, i) => {
      if (r.breakpoint <= screenWidth) {
        setPageSize(r.pageSize);
      }
    });
  }, []);
  
  const { data } = useQuery(GET_CATS);

  let categories = [];

  if (data)
    data.allCategories.map((val, index) => categories.push({ id: index + 1, catName: val }));
  
  return (
    <ZicopsTable
      columns={columns}
      data={categories}
      pageSize={pageSize}
      rowsPerPageOptions={[3]}
      tableHeight="70vh"
    />
  );
}

const ZicopsCatsList = () => {
  return (
    <>
      <div className="content">
        <CourseHead title="Zicops Categories" />

        <ApolloProvider client={queryClient}>
          {/* <CourseContextProvider> */}

          <div className="content-panel">
            <ZicopsCategoryList />
          </div>

          {/* </CourseContextProvider> */}
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

export default ZicopsCatsList;
