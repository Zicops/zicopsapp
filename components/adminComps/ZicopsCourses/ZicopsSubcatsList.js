import CourseHead from '../../CourseHead';
import ZicopsTable from '../../common/ZicopsTable';

import { queryClient, GET_SUB_CATS } from '../../../API/Queries';
import { ApolloProvider, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

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

const res = [
  {
    breakpoint: 1024,
    pageSize: 2
  },
  {
    breakpoint: 1530,
    pageSize: 3
  },
  {
    breakpoint: 1920,
    pageSize: 4
  }
];

function ZicopsSubCategoryList() {
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    window.addEventListener('resize', () => {
      const screenWidth = screen.width;

      let isSizeMatched = false;
      res.forEach((r, i) => {
        // console.log(r.breakpoint, screenWidth, r.breakpoint > screenWidth);
        // switch (true) {
        //   case r.breakpoint > screenWidth:
        //     console.log(r, screenWidth);
        //     setPageSize(r.pageSize);
        //     break;
        //   default:
        //     // setPageSize(1);
        //     break;
        // }
        if (r.breakpoint < screenWidth) {
          isSizeMatched = true;
          console.log(r, screenWidth, r.breakpoint < screenWidth);
          setPageSize(r.pageSize);
        }
        if (!isSizeMatched && i + 1 === res.length) {
          setPageSize(10);
        }
      });
    });
  }, []);

  useEffect(() => {
    console.log('pageSize: ', pageSize);
  }, [pageSize]);

  const { data } = useQuery(GET_SUB_CATS);
  // console.log(data);
  let latest = [];

  if (data)
    data.allSubCategories.map((val, index) => latest.push({ id: index + 1, SubCatName: val }));

  return (
    <ZicopsTable
      columns={columns}
      data={latest}
      pageSize={pageSize}
      rowsPerPageOptions={[3]}
      tableHeight="70vh"
    />
  );
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
