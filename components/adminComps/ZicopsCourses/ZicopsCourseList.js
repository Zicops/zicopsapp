import CourseHead from "../../medium/CourseHead";
import { qClient, GET_LATEST_COURSES} from '../../../API/Queries'
import { ApolloProvider, useQuery } from '@apollo/client'
import MUIDataTable from "mui-datatables";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";


const columns = ["Id", "Name", "Created at", "Owner", "Category", "Expertise Level"];

const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
    filter: false,
    print: false,
    selectableRows: 'none',
    download: false,
    viewColumns: false,
    search: false,
    rowsPerPage: 7
  };

  const useStyles = makeStyles({
    root: {
      background: "linear-gradient(45deg, var(--dark_three) 30%, var(--primary) 90%)",
      color: "var(--white)",
      padding: "30px"
    }
  });

function LatestCourseList( {time} ) {
    const classes = useStyles();
    let latest = [];

        const { data } = useQuery(GET_LATEST_COURSES, {
            variables: {
                publish_time: time,
                pageSize: 37,
                pageCursor: ""
            }
        });
        (data) ? data.latestCourses.courses.map((val, index) => latest.push([val.id, val.name, new Date(val.created_at * 1000).toISOString().slice(0, 19).replace('T', ' '), val.owner, val.category, val.expertise_level])) : null;
    
    return (
        <div>
            <MUIDataTable className={classes.root}
                data={latest}
                columns={columns}
                options={options}
            />
        </div>
    )
}


const ZicopsCourseList = () => {
    var time = Date.now();
    return ( 
        <>
        <div className="content">
            <CourseHead title="Zicops Course Offerings"/>

            <ApolloProvider client={qClient}>
                {/* <CourseContextProvider> */}

                    <div className="content-panel">
                        <LatestCourseList time={time}/>
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
                // height: calc(60vh + 100px);
                box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
                border-radius: 10px;
            }
            `}
        </style>
        </>
     );
}
 
export default withStyles(useStyles)(ZicopsCourseList);