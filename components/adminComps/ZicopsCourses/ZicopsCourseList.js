import CourseHead from '../../CourseHead';
import { queryClient, GET_LATEST_COURSES } from '../../../API/Queries';
import { ApolloProvider, useQuery } from '@apollo/client';
import MUIDataTable from 'mui-datatables';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { courseContext } from '../../../state/contexts/CourseContext';
import { useContext } from 'react';
import Router from 'next/router';
import { fontWeight } from '@mui/system';

// const columns = ["Id", "Name", "Created at", "Owner", "Category", "Expertise Level", "Edit"];
const columns = [
  // {
  //   field: 'id',
  //   headerName: 'Id',
  //   headerClassName: 'course-list-header',
  //   headerAlign: 'center',
  //   width: 200
  // },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'course-list-header',
    headerAlign: 'center',
    width: 250
  },
  {
    field: 'created_at',
    headerClassName: 'course-list-header',
    headerName: 'Created at',
    headerAlign: 'center',
    width: 130
  },
  {
    field: 'owner',
    headerClassName: 'course-list-header',
    headerName: 'Owner',
    headerAlign: 'center',
    width: 150
  },
  {
    field: 'category',
    headerClassName: 'course-list-header',
    headerName: 'Category',
    headerAlign: 'center',
    width: 200
  },
  {
    field: 'expertise_level',
    headerClassName: 'course-list-header',
    headerName: 'Expertise Level',
    headerAlign: 'center',
    width: 200
  },
  // {
  //     field: 'edit',
  //     headerName: 'Edit',
  //     headerAlign: 'center',
  //     sortable: false,
  // }
  {
    field: 'action',
    headerClassName: 'course-list-header',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      return (
        <button style={{ cursor: 'pointer' }} onClick={() => editCourse(params.row.id)}>
          Edit
        </button>
      );
    }
  }
];

function editCourse(course) {
  // alert(course)
  let courseId = course;
  Router.push({
    pathname: '/admin/courses',
    query: {
      courseId
    }
  });
}

const options = {
  filter: false,
  print: false,
  selectableRows: 'none',
  download: false,
  viewColumns: false,
  search: false,
  rowsPerPage: 7
};

//   const useStyles = makeStyles({
//     root: {
//       background: "linear-gradient(45deg, var(--dark_three) 30%, var(--primary) 90%)",
//       color: "var(--white)",
//       padding: "30px"
//     }
//   });
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: theme.palette.mode === 'light' ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    'Open Sans',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d'
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none'
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `0px solid ${theme.palette.mode === 'light' ? '#f0f0f02b' : '#3030302b'}`,
    fontWeight: '500'
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    border: 'none',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f02b' : '#3030302b'}`
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.mode === 'light' ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,0.65)'
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#7373732b'
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0
  },
  '& .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader:focus': {
    outline: 'none'
  },
  '& .MuiDataGrid-columnHeader': {
    border: '0px',
    borderBottom: '7px solid var(--white)',
    color: 'var(--primary)'
  },
  '& .Mui-resizeTriggers': {
    height: '80%'
  }
  // '&>.MuiDataGrid-main': {
  //   '&>.MuiDataGrid-columnHeaders': {
  //     borderBottom: 'none'
  //   },

  //   '& div div div div >.MuiDataGrid-cell': {
  //     borderBottom: 'none'
  //   }
  // }
  // ...customCheckbox(theme),
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  // https://mui.com/material-ui/react-pagination/#usepagination
  return (
    <Pagination
      // className="paginationStyle"
      classes={{ ul: 'paginationStyle' }}
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
function LatestCourseList({ time }) {
  // const classes = useStyles();
  let latest = [];

  const { data } = useQuery(GET_LATEST_COURSES, {
    variables: {
      publish_time: time,
      pageSize: 50,
      pageCursor: ''
    },
    client: queryClient
  });

  // function editCourse(course) {
  //     let courseId = course.id;
  //     Router.push({
  //         pathname: "/admin/courses",
  //         query: {
  //             courseId
  //         }
  //     })
  // }

  let data1 = data?.latestCourses.courses;
  // (data) ? data.latestCourses.courses.map((val, index) => latest.push([val.id, val.name, new Date(val.created_at * 1000).toISOString().slice(0, 19).replace('T', ' '), val.owner, val.category, val.expertise_level, <button onClick={()=>editCourse(val)}>Edit</button>])) : null;
  // console.log(data1);

  return (
    <div style={{ height: '475px' }}>
      {/* <MUIDataTable className={classes.root}
                data={latest}
                columns={columns}
                options={options}
            /> */}
      {data1 && (
        // https://mui.com/x/react-data-grid/export/
        <StyledDataGrid
          rows={data1}
          columns={columns}
          sx={{
            border: 0,
            pt: 2,
            pb: 0,
            px: 5,
            color: '#fff'
          }}
          autoHeight={false}
          disableSelectionOnClick
          pageSize={7}
          rowsPerPageOptions={[5]}
          pagination
          components={{
            Pagination: CustomPagination
          }}
        />
      )}
      {/* {data1 && (
        <div style={{ display: 'flex', height: '100%', color: '#fff' }}>
          <DataGrid
            rows={data1}
            sx={{
              border: 0,
              pt: 2,
              pb: 0,
              px: 5,
              color: '#fff'
            }}
            columns={columns}
            autoHeight={true}
            disableSelectionOnClick
            pageSize={7}
            rowsPerPageOptions={[5]}
            components={{
              Pagination: CustomPagination
            }}
          />
        </div> 
      )}
        */}
    </div>
  );
}

const ZicopsCourseList = () => {
  var time = Date.now();
  return (
    <>
      <div className="content-panel">
        <LatestCourseList time={time} />
      </div>

      <style jsx>
        {`
          .content-panel {
            margin: 30px 10px 10px 10px;
            color: var(--white);
            box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
            border-radius: 10px;
          }
          .paginationStyle button {
            color: var(--white);
          }
        `}
      </style>
    </>
  );
};

// export default withStyles(useStyles)(ZicopsCourseList);
export default ZicopsCourseList;
