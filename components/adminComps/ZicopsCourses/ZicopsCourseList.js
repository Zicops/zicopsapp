import CourseHead from "../../medium/CourseHead";
import { qClient, GET_LATEST_COURSES} from '../../../API/Queries'
import { ApolloProvider, useQuery } from '@apollo/client'
import MUIDataTable from "mui-datatables";
import { withStyles, makeStyles } from "@material-ui/core/styles";


const columns = ["Name", "Owner", "Category", "Expertise Level"];

const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
    filter: false,
    print: false,
    selectableRows: false,
    download: false,
    viewColumns: false,
    search: false
  };

  const useStyles = makeStyles({
    root: {
      background: "linear-gradient(45deg, var(--dark) 30%, var(--primary) 90%)",
      color: "var(--white)",
      padding: "30px"
    }
  });

function LatestCourseList() {
    const { data } = useQuery(GET_LATEST_COURSES);
    const classes = useStyles();
    let latest = [];
    (data) ? data.latestCourses.courses.map( (val, index) => latest.push( [val.name, val.owner, val.category, val.expertise_level] )) : null;
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
    return ( 
        <>
        <div className="content">
            <CourseHead title="Zicops Course Offerings"/>

            <ApolloProvider client={qClient}>
                {/* <CourseContextProvider> */}

                    <div className="content-panel">
                        <LatestCourseList />
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