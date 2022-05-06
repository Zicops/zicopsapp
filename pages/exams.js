import { useEffect, useState } from 'react';
import { bigImages, sliderImages } from '../API/DemoSliderData';
import CommonCalendar from '../components/common/CommonCalendar';
import SimpleTable from '../components/common/SimpleTable';
import ZicopsSimpleTable from '../components/common/ZicopsSimpleTable';
import Options from '../components/Exams/Options';
import BigCardSlider from '../components/medium/BigCardSlider';
import ZicopsCarousel from '../components/ZicopsCarousel';

export default function LearnerExams() {
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

  useEffect(() => {
    console.log(screen.width);
  }, []);

  const [showTable, setShowTable] = useState(false);

  const btnOptions = [
    { name: 'Schedule Exams', isActive: false },
    {
      name: 'Take Anytime Exams',
      handleClick: () => setShowTable(!showTable),
      isActive: showTable
    },
    { name: 'Open Available Exams', isActive: false },
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
      headerClassName: 'course-list-header',
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
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false
    },
    {
      id: 3,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false
    },
    {
      id: 4,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false
    },
    {
      id: 4,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false
    },
    {
      id: 5,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false
    },
    {
      id: 6,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false
    },
    {
      id: 7,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 8,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 9,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 10,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 11,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 12,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false,
      cellClassName: 'super-app'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}>
      <div style={{ display: 'flex', marginTop: '70px', padding: '60px 0 70px', backgroundColor: 'var(--black)', height: '75vh', overflow: 'hidden' }}>
        <div
          className={`${showTable ? 'w-20' : 'w-65'} border_right`}
          style={{ margin: 'auto', padding: '60px 0px' }}>
          <Options
            question={showTable ? '' : 'Q. Select the required Option.'}
            btnOptions={btnOptions}
          />
        </div>

        {showTable && (
          <div
            className="w-45 border_right"
            style={{ background: 'var(--black)', margin: 'auto'}}>
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
        <div className="w-100 border_right resultContainer">
          <ZicopsSimpleTable
            columns={columns}
            data={data}
            pageSize={6}
            rowsPerPageOptions={6}
            tableHeight="72vh"
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
          background: var(--background_content);
          border: 4px solid var(--white);
        }
      `}</style>
    </div>
  );
}
