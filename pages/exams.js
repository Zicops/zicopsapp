import { GET_COURSE_TOPICS, GET_EXAM_META, GET_TOPIC_EXAMS, queryClient } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { bigImages, sliderImages } from '../API/DemoSliderData';
import CommonCalendar from '../components/common/CommonCalendar';
import SimpleTable from '../components/common/SimpleTable';
import ZicopsSimpleTable from '../components/common/ZicopsSimpleTable';
import Options from '../components/Exams/Options';
import BigCardSlider from '../components/medium/BigCardSlider';
import ZicopsCarousel from '../components/ZicopsCarousel';

export default function LearnerExams() {
  const router = useRouter(); 
  const [takeAnyTimeExams , setTakeAnyTimeExams] = useState([]);
  const [scheduleExams , setScheduleExams] = useState([]);



  const realSquare = {
    desktop: {
      breakpoint: { max: 3000, min: 1530 },
      items: 4,
      slidesToSlide: 1
    },
    laptop: {
      breakpoint: { max: 1530, min: 1024 },
      items: 4,
      slidesToSlide: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  const tableData = {
    columnHeader: ['Exam Name', 'Source', 'Schedule'],
    rowData: [
      ['Design Thinking', 'Course', 'Schedule'],
      ['Design Thinking', 'Course', 'Schedule'],
      ['Design Thinking', 'Course', 'Schedule'],
      ['Design Thinking', 'Course', 'Schedule'],
      ['Design Thinking', 'Course', 'Schedule'],
      ['Design Thinking', 'Course', 'Schedule'],
      ['Design Thinking', 'Course', 'Schedule'],
      ['Design Thinking', 'Course', 'Schedule'],
      ['Design Thinking', 'Course', 'Schedule'],
      ['Design Thinking', 'Course', 'Schedule']
    ]
  };
  const buttonObj = {
    style: { margin: '0px 10px', padding: '2px 10px', border: '1px solid var(--primary)' }
  };
  const { getUserCourseData } = useUserCourseData();

  useEffect(() => {
    console.log(screen.width);
    loadExamData()
  }, []);

  async function getTopics(courseId = null){
    //return an empty array in case of error
    
    if(!courseId) return [];
    const topicRes = await loadQueryDataAsync(GET_COURSE_TOPICS,{ course_id: courseId } , {} , queryClient);
    if(topicRes?.error) return [];
    if(!topicRes?.getTopics?.length) return [];
    return [...topicRes?.getTopics];
  }

  async function getTopicExams(topicId = null){
    if(!topicId) return [];
    const examRes = await loadQueryDataAsync(GET_TOPIC_EXAMS,{ topic_id: topicId},{}, queryClient);
    if(examRes?.error) return [];
    if(!examRes?.getTopicExams?.length)  return [];
    return [...examRes?.getTopicExams] ;
  }

  async function getExamsMeta(examIds = []){
    if(!examIds?.length) return ;
    const examMetaRes = await loadQueryDataAsync(GET_EXAM_META,{exam_ids:examIds},{},queryClient);
    if(examMetaRes?.error) return [];
    if(!examMetaRes?.getExamsMeta?.length) return [] ;
    return [...examMetaRes?.getExamsMeta]
  }

  async function loadExamData(){
    // userCourseMap -> topics => examsmetas => userExamAttempts => 
    // for schedule exams => exam schedule
    // for anytime exam -> userExamReuslts
    const courseData = await getUserCourseData(30);
    if(!courseData?.length) return ;
    //filtering course data if id doesnt exist
    const _courseData = courseData?.filter((course) => !!course?.id) ;
    // let courseId = [] 
    // const courseIds = _courseData?.map((course) => course?.id);

    let assessmentTopics = [];
    // need later for courses down exam
    let assessmentCourses = [];
    for(let i = 0 ; i < _courseData?.length ; i++){
      const courseTopics = await getTopics(_courseData[i]?.id);
      if(!courseTopics?.length) continue ;
      const filteredTopics =  courseTopics?.filter((topic) => topic?.type?.toLowerCase() === 'assessment') ;
      if(!filteredTopics?.length) continue ;
      assessmentTopics = assessmentTopics.concat(filteredTopics);
      assessmentCourses = assessmentCourses.concat(_courseData[i]);
    }

    // console.log(assessmentTopics,'assasas',assessmentCourses)
    if(!assessmentTopics?.length) return ;

    // load topic exams 
    let exams = [];
    for(let i = 0 ; i < assessmentTopics?.length ; i++){
      const topicExams = await getTopicExams(assessmentTopics[i]?.id);
      if(!topicExams?.length) continue;
      exams = exams.concat(topicExams);
    }
    // console.log(exams,'exams');
    if(!exams?.length) return ;
    const examsIds = exams?.map((exam) => exam?.examId)
    const examMetas = await getExamsMeta(examsIds) ;
    console.log(examMetas,'metas')
  }

  const [showTable, setShowTable] = useState(false);

  const btnOptions = [
    { name: 'Schedule Exams', isActive: false },
    {
      name: 'Take Anytime Exams',
      handleClick: () => setShowTable(!showTable),
      isActive: showTable
    },
    {
      name: 'Open Available Exams',
      handleClick: () => router.push('/exam'),
      isActive: false
    },
    { name: 'Completed Exams', isActive: false }
  ];

  const columns = [
    {
      field: 'courseName',
      headerName: 'Course Name',
      headerClassName: 'course-list-header',
      flex: 1.5
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      headerClassName: 'course-list-header',
      flex: 1
    },
    {
      field: 'subCategory',
      headerName: 'Sub Category',
      headerClassName: 'course-list-header',
      flex: 1
    },
    {
      field: 'completion',
      headerName: 'Completion',
      headerClassName: 'course-list-header',
      flex: 1
    }
  ];
  const data = [
    {
      id: 1,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false
    },
    {
      id: 2,
      courseName: 'Leom Ipsum Dolor1',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '22%',
      sortable: false
    },
    {
      id: 3,
      courseName: 'Leom Ipsum r3',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '43%',
      sortable: false
    },
    {
      id: 4,
      courseName: 'Leom 32r Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '34%',
      sortable: false
    },

    {
      id: 5,
      courseName: 'Leom Ipsum fd3w4',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '34%',
      sortable: false
    },
    {
      id: 6,
      courseName: 'Leom Ipsum 12e13fw',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '3%',
      sortable: false
    },
    {
      id: 7,
      courseName: 'Lecaeom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '2%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 8,
      courseName: 'dwefae Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '121%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 9,
      courseName: 'xaweca Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '221%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 10,
      courseName: ' bdgf Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '98%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 11,
      courseName: 'myum Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '217%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 12,
      courseName: 'LAst Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '100%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 13,
      courseName: 'Leom hbed Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '2761%',
      sortable: false
    }
  ];

  const simpleTableRef = useRef(null);
  useEffect(() => {
    // let isSnapped = false;
    // const observer = new IntersectionObserver((entries) => {
    //   if (entries[0].isIntersecting && !isSnapped) {
    //     simpleTableRef.current?.scrollIntoView(false);
    //     isSnapped = true;
    //   } else {
    //     isSnapped = false;
    //   }
    // });
    // observer.observe(simpleTableRef.current);
    // document.addEventListener('scroll', function (e) {
    //   // lastKnownScrollPosition = window.scrollY;
    //   simpleTableRef.current?.scrollIntoView({
    //     behavior: 'auto',
    //     block: 'end',
    //     inline: 'center'
    //   });
    //   console.log('ref', simpleTableRef);
    // });
  }, []);

  return (
    <div
      className="scrollsnap"
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}>
      <div
        style={{
          display: 'flex',
          marginTop: '70px',
          padding: '5vh 4vw',
          backgroundColor: 'var(--black)',
          height: '75vh',
          overflow: 'hidden'
        }}>
        <div
          className={`${showTable ? 'w-20' : 'w-65'} border_right`}
          style={{ margin: 'auto', padding: '60px 0px' }}>
          <Options
            question={showTable ? '' : 'Q. Select the required Option.'}
            btnOptions={btnOptions}
          />
        </div>

        {showTable && (
          <div className="w-45 border_right" style={{ background: 'var(--black)', margin: 'auto' }}>
            <SimpleTable
              tableData={tableData}
              lastCellObj={buttonObj}
              tableHeading="Take Anytime Exams"
              headingStyle={{
                color: 'var(--white)',
                fontSize: '16px',
                fontWeight: '400',
                textAlign: 'left',
                margin: '0',
                marginLeft: '60px',
                textShadow: 'none',
                textTransform: 'none',
                letterSpacing: '1px'
              }}
            />
          </div>
        )}

        <div className="w-35 calender_box">
          <CommonCalendar />
        </div>
      </div>

      <ZicopsCarousel title="Test Packages" data={sliderImages} />
      <ZicopsCarousel title="Your assessments" data={sliderImages} />
      <ZicopsCarousel title="Quesiton Banks" data={sliderImages} />
      <ZicopsCarousel data={sliderImages} />
      <BigCardSlider title="X-Athons" data={bigImages} slide={realSquare} />

      <div>
        <div className="resultContainer" ref={simpleTableRef}>
          <ZicopsSimpleTable
            columns={columns}
            data={data}
            pageSize={5}
            rowsPerPageOptions={4}
            tableHeight="58vh"
            tableHeading="Your Results"
            headingStyle={{
              color: 'var(--white)',
              width: 'fit-content',
              margin: '0px auto 40px',
              padding: '5px 20px',
              background: 'var(--black)',
              border: '3px solid var(--primary)'
            }}
          />
        </div>
      </div>

      {/* <QuestionSection /> */}
      <style jsx>{`
        .resultContainer {
          background: var(--black);
          border: 4px solid var(--primary);
          height: calc(100vh - 70px);
          box-shadow: inset 0 0 30px 0 #6bcfcf80;
          padding: 50px;
          scroll-snap-align: start;
        }
        .scrollsnap {
          scroll-snap-type: y mandatory;
          scroll-snap-type: mandatory;
          scroll-snap-points-y: repeat(300px);
        }
      `}</style>
    </div>
  );
}
